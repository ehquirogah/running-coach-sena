"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import {
  feedbackRutinaSchema,
  FeedbackRutinaInput,
  resultadoRutinaSchema,
  ResultadoRutinaInput,
  rutinaSchema,
  RutinaInput,
} from "@/lib/validations/rutina.schema";
import { ActionResult, RutinaConRelaciones } from "@/types";

const rutinaInclude = {
  plan: {
    include: {
      atleta: { select: { id: true, nombre: true, email: true, rol: true, documento: true, edad: true, activo: true, createdAt: true } },
      entrenador: { select: { id: true, nombre: true, email: true, rol: true, documento: true, edad: true, activo: true, createdAt: true } },
    },
  },
  sesion: true,
};

function toDate(value: string) {
  return new Date(value.includes("T") ? value : `${value}T00:00:00`);
}

export async function crearRutina(data: RutinaInput): Promise<ActionResult<RutinaConRelaciones>> {
  const session = await auth();
  const user = session?.user as any;

  if (!session || user?.rol !== "ENTRENADOR") {
    return { success: false, error: "Acceso denegado. Se requiere rol ENTRENADOR." };
  }

  const validation = rutinaSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: "Datos de la rutina invalidos" };
  }

  try {
    const plan = await prisma.planEntrenamiento.findFirst({
      where: {
        id: validation.data.planId,
        entrenadorId: user.id,
        activo: true,
      },
    });

    if (!plan) {
      return { success: false, error: "No existe un plan activo propio para asignar esta rutina" };
    }

    const rutina = await prisma.rutinaEntrenamiento.create({
      data: {
        ...validation.data,
        fechaProgramada: toDate(validation.data.fechaProgramada),
        observacionesEntrenador: validation.data.observacionesEntrenador || null,
      },
      include: rutinaInclude,
    });

    revalidatePath(`/atletas/${plan.atletaId}`);
    revalidatePath("/atletas");
    revalidatePath("/mi-plan");
    revalidatePath(`/reportes/${plan.atletaId}`);

    return { success: true, data: rutina as any, message: "Rutina creada y asignada al atleta" };
  } catch (error) {
    console.error("Error al crear rutina:", error);
    return { success: false, error: "Error al crear la rutina" };
  }
}

export async function obtenerRutinasPlanActivoAtleta(): Promise<RutinaConRelaciones[]> {
  const session = await auth();
  const user = session?.user as any;

  if (!session || user?.rol !== "ATLETA") return [];

  try {
    const rutinas = await prisma.rutinaEntrenamiento.findMany({
      where: {
        plan: {
          atletaId: user.id,
          activo: true,
        },
      },
      include: rutinaInclude,
      orderBy: { fechaProgramada: "asc" },
    });

    return rutinas as any;
  } catch (error) {
    console.error("Error al obtener rutinas del atleta:", error);
    return [];
  }
}

export async function obtenerRutinasPorAtleta(atletaId: string): Promise<RutinaConRelaciones[]> {
  const session = await auth();
  const user = session?.user as any;

  if (!session || user?.rol !== "ENTRENADOR") return [];

  try {
    const rutinas = await prisma.rutinaEntrenamiento.findMany({
      where: {
        plan: {
          atletaId,
          entrenadorId: user.id,
          activo: true,
        },
      },
      include: rutinaInclude,
      orderBy: { fechaProgramada: "asc" },
    });

    return rutinas as any;
  } catch (error) {
    console.error("Error al obtener rutinas del atleta para entrenador:", error);
    return [];
  }
}

export async function obtenerRutinaAsignada(rutinaId: string): Promise<RutinaConRelaciones | null> {
  const session = await auth();
  const user = session?.user as any;

  if (!session) return null;

  try {
    const rutina = await prisma.rutinaEntrenamiento.findFirst({
      where: {
        id: rutinaId,
        plan: user.rol === "ATLETA"
          ? { atletaId: user.id, activo: true }
          : { entrenadorId: user.id },
      },
      include: rutinaInclude,
    });

    return rutina as any;
  } catch (error) {
    console.error("Error al obtener rutina asignada:", error);
    return null;
  }
}

export async function registrarResultadoRutina(data: ResultadoRutinaInput): Promise<ActionResult<RutinaConRelaciones>> {
  const session = await auth();
  const user = session?.user as any;

  if (!session || user?.rol !== "ATLETA") {
    return { success: false, error: "Acceso denegado. Se requiere rol ATLETA." };
  }

  const validation = resultadoRutinaSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: "Datos del resultado invalidos" };
  }

  try {
    const rutina = await prisma.rutinaEntrenamiento.findFirst({
      where: {
        id: validation.data.rutinaId,
        estado: { in: ["PENDIENTE", "COMPLETADA"] as any },
        plan: {
          atletaId: user.id,
          activo: true,
        },
      },
      include: { plan: true, sesion: true },
    });

    if (!rutina) {
      return { success: false, error: "Rutina no encontrada o no disponible para registrar resultado" };
    }

    const fecha = toDate(validation.data.fecha);
    const sesionData = {
      atletaId: user.id,
      planId: rutina.planId,
      rutinaId: rutina.id,
      distancia: validation.data.distancia,
      tiempo: validation.data.tiempo,
      nivelEsfuerzo: validation.data.nivelEsfuerzo,
      fecha,
    };

    if (rutina.sesion) {
      await prisma.sesionEntrenamiento.update({
        where: { id: rutina.sesion.id },
        data: sesionData,
      });
    } else {
      await prisma.sesionEntrenamiento.create({ data: sesionData });
    }

    const updated = await prisma.rutinaEntrenamiento.update({
      where: { id: rutina.id },
      data: {
        estado: "COMPLETADA" as any,
        resultadoPercibido: validation.data.resultadoPercibido,
        cumplimiento: validation.data.cumplimiento,
        comentariosAtleta: validation.data.comentariosAtleta,
        molestiasFisicas: validation.data.molestiasFisicas || null,
        dificultadReal: validation.data.dificultadReal,
        evidencia: validation.data.evidencia || null,
        completadaAt: new Date(),
      },
      include: rutinaInclude,
    });

    revalidatePath("/mi-plan");
    revalidatePath("/sesiones/historial");
    revalidatePath(`/reportes/${user.id}`);

    return { success: true, data: updated as any, message: "Resultado de rutina registrado" };
  } catch (error) {
    console.error("Error al registrar resultado de rutina:", error);
    return { success: false, error: "Error al registrar el resultado de la rutina" };
  }
}

export async function retroalimentarRutina(data: FeedbackRutinaInput): Promise<ActionResult<RutinaConRelaciones>> {
  const session = await auth();
  const user = session?.user as any;

  if (!session || user?.rol !== "ENTRENADOR") {
    return { success: false, error: "Acceso denegado. Se requiere rol ENTRENADOR." };
  }

  const validation = feedbackRutinaSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: "Datos de retroalimentacion invalidos" };
  }

  try {
    const rutina = await prisma.rutinaEntrenamiento.findFirst({
      where: {
        id: validation.data.rutinaId,
        estado: "COMPLETADA" as any,
        plan: {
          entrenadorId: user.id,
        },
      },
      include: { plan: true },
    });

    if (!rutina) {
      return { success: false, error: "Solo puedes retroalimentar rutinas completadas de tus atletas" };
    }

    const updated = await prisma.rutinaEntrenamiento.update({
      where: { id: rutina.id },
      data: {
        estado: "REVISADA" as any,
        feedbackEntrenador: validation.data.feedbackEntrenador,
        recomendacionEntrenador: validation.data.recomendacionEntrenador,
        decisionAjuste: validation.data.decisionAjuste,
        revisadaAt: new Date(),
      },
      include: rutinaInclude,
    });

    revalidatePath(`/atletas/${rutina.plan.atletaId}`);
    revalidatePath("/atletas");
    revalidatePath("/mi-plan");
    revalidatePath(`/reportes/${rutina.plan.atletaId}`);

    return { success: true, data: updated as any, message: "Retroalimentacion enviada al atleta" };
  } catch (error) {
    console.error("Error al retroalimentar rutina:", error);
    return { success: false, error: "Error al guardar la retroalimentacion" };
  }
}

export async function obtenerHistorialEntrenamientosEntrenador() {
  const session = await auth();
  const user = session?.user as any;

  if (!session || user?.rol !== "ENTRENADOR") return [];

  try {
    const sesiones = await prisma.sesionEntrenamiento.findMany({
      where: {
        plan: {
          entrenadorId: user.id,
        },
      },
      include: {
        atleta: {
          select: { id: true, nombre: true, email: true },
        },
        plan: true,
        rutina: true,
      },
      orderBy: { fecha: "desc" },
      take: 80,
    });

    return sesiones;
  } catch (error) {
    console.error("Error al obtener historial de entrenamientos del entrenador:", error);
    return [];
  }
}

export async function obtenerProyeccionEntrenador() {
  const session = await auth();
  const user = session?.user as any;

  if (!session || user?.rol !== "ENTRENADOR") return [];

  try {
    const planes = await prisma.planEntrenamiento.findMany({
      where: {
        entrenadorId: user.id,
        activo: true,
      },
      include: {
        atleta: {
          select: { id: true, nombre: true, email: true },
        },
        sesiones: {
          orderBy: { fecha: "desc" },
          take: 6,
          include: { rutina: true },
        },
        rutinas: {
          orderBy: { fechaProgramada: "asc" },
          include: { sesion: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return planes.map((plan) => {
      const hoy = new Date();
      const inicio = new Date(plan.createdAt);
      const diasTranscurridos = Math.max(0, Math.floor((hoy.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)));
      const semanaActual = Math.min(plan.duracionSemanas, Math.floor(diasTranscurridos / 7) + 1);
      const sesionesSemana = plan.sesiones.filter((sesion) => {
        const diffDias = Math.floor((hoy.getTime() - new Date(sesion.fecha).getTime()) / (1000 * 60 * 60 * 24));
        return diffDias >= 0 && diffDias <= 7;
      });
      const kmSemana = sesionesSemana.reduce((total, sesion) => total + sesion.distancia, 0);
      const cumplimientoVolumen = plan.volumenSemanal > 0 ? Math.min(100, Math.round((kmSemana / plan.volumenSemanal) * 100)) : 0;
      const esfuerzoPromedio = plan.sesiones.length
        ? Number((plan.sesiones.reduce((total, sesion) => total + sesion.nivelEsfuerzo, 0) / plan.sesiones.length).toFixed(1))
        : 0;
      const pendientes = plan.rutinas.filter((rutina) => rutina.estado === "PENDIENTE");
      const completadasSinRevision = plan.rutinas.filter((rutina) => rutina.estado === "COMPLETADA");
      const siguienteRutina = pendientes[0] ?? null;

      let recomendacion = "Mantener el plan y programar la siguiente rutina.";
      if (completadasSinRevision.length > 0) {
        recomendacion = "Revisar resultados completados antes de subir la carga.";
      } else if (cumplimientoVolumen < 60 && sesionesSemana.length > 0) {
        recomendacion = "Proyectar una semana de ajuste con menor carga.";
      } else if (esfuerzoPromedio >= 8) {
        recomendacion = "Priorizar recuperacion y controlar intensidad.";
      } else if (!siguienteRutina) {
        recomendacion = "Crear nuevas rutinas para sostener la continuidad del plan.";
      }

      return {
        plan,
        atleta: plan.atleta,
        semanaActual,
        semanasRestantes: Math.max(0, plan.duracionSemanas - semanaActual),
        kmSemana: Number(kmSemana.toFixed(1)),
        cumplimientoVolumen,
        esfuerzoPromedio,
        rutinasPendientes: pendientes.length,
        rutinasPorRevisar: completadasSinRevision.length,
        siguienteRutina,
        recomendacion,
      };
    });
  } catch (error) {
    console.error("Error al obtener proyeccion del entrenador:", error);
    return [];
  }
}
