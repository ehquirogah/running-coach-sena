"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { planSchema, PlanInput } from "@/lib/validations/plan.schema";
import { ActionResult, PlanConRelaciones, UsuarioPublico } from "@/types";
import { auth } from "@/lib/auth";
import { MOCK_PLAN, MOCK_ATLETAS_ASIGNADOS, MOCK_USERS } from "@/lib/mock-data";

/**
 * Server Action: Crear un plan de entrenamiento (Solo Entrenadores).
 */
export async function crearPlan(data: PlanInput): Promise<ActionResult<PlanConRelaciones>> {
  const session = await auth();

  // 1. Autorización
  if (!session || (session.user as any).rol !== "ENTRENADOR") {
    return { success: false, error: "Acceso denegado. Se requiere rol ENTRENADOR." };
  }

  // 2. Validación de datos
  const validation = planSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: "Datos del plan inválidos" };
  }

  try {
    const { objetivo, duracionSemanas, volumenSemanal, atletaId } = validation.data;

    // 3. RN-003: Verificar plan activo directamente en Prisma
    const activePlan = await prisma.planEntrenamiento.findFirst({
      where: {
        atletaId,
        activo: true,
      },
    });

    if (activePlan) {
      return { success: false, error: "El atleta ya tiene un plan activo" };
    }

    // 4. Crear el plan
    const newPlan = await prisma.planEntrenamiento.create({
      data: {
        objetivo,
        duracionSemanas,
        volumenSemanal,
        activo: true,
        atletaId,
        entrenadorId: (session.user as any).id,
      },
      include: {
        atleta: { select: { id: true, nombre: true, email: true, rol: true } },
        entrenador: { select: { id: true, nombre: true, email: true, rol: true } },
      },
    }) as any;

    // 5. Revalidar caché
    revalidatePath("/planes");
    revalidatePath(`/atletas/${atletaId}`);

    return {
      success: true,
      data: newPlan as PlanConRelaciones,
      message: "Plan creado exitosamente",
    };

  } catch (error) {
    console.error("Error en crearPlan action:", error);
    return { success: false, error: "Error al crear el plan en la base de datos" };
  }
}

/**
 * Server Action: Obtener planes creados por el entrenador autenticado.
 */
export async function obtenerPlanesDeEntrenador(): Promise<PlanConRelaciones[]> {
  const session = await auth();
  if (!session || (session.user as any).rol !== "ENTRENADOR") return [];

  try {
    const planes = await prisma.planEntrenamiento.findMany({
      where: {
        entrenadorId: (session.user as any).id,
      },
      include: {
        atleta: { select: { id: true, nombre: true, email: true, rol: true } },
        entrenador: { select: { id: true, nombre: true, email: true, rol: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return planes as any;
  } catch (error) {
    console.error("Error al obtener planes del entrenador:", error);
    const session = await auth();
    return MOCK_PLAN.entrenadorId === (session?.user as any)?.id ? [MOCK_PLAN] as any : [];
  }
}

/**
 * Server Action: Obtener el plan activo del atleta autenticado.
 */
export async function obtenerPlanActivoAtleta(): Promise<PlanConRelaciones | null> {
  const session = await auth();
  if (!session || (session.user as any).rol !== "ATLETA") return null;

  try {
    const plan = await prisma.planEntrenamiento.findFirst({
      where: {
        atletaId: (session.user as any).id,
        activo: true,
      },
      include: {
        atleta: { select: { id: true, nombre: true, email: true, rol: true } },
        entrenador: { select: { id: true, nombre: true, email: true, rol: true } },
        sesiones: {
          orderBy: { fecha: "desc" },
          take: 5,
        },
        rutinas: {
          orderBy: { fechaProgramada: "asc" },
          include: { sesion: true },
        },
      },
    });

    return plan as any;
  } catch (error) {
    console.error("Error al obtener plan activo del atleta:", error);
    return MOCK_PLAN as any;
  }
}

/**
 * Server Action: Obtener atletas asignados al entrenador (con plan activo).
 */
export async function obtenerAtletasAsignados(): Promise<any[]> {
  const session = await auth();
  if (!session || (session.user as any).rol !== "ENTRENADOR") return [];

  try {
    const atletas = await prisma.usuario.findMany({
      where: {
        rol: "ATLETA",
        planesComoAtleta: {
          some: {
            entrenadorId: (session.user as any).id,
            activo: true,
          },
        },
      },
      include: {
        planesComoAtleta: {
          where: { activo: true },
          take: 1,
        },
        sesiones: {
          orderBy: { fecha: "desc" },
          take: 1,
        },
      },
    });

    return atletas;
  } catch (error) {
    console.error("Error al obtener atletas asignados:", error);
    return MOCK_ATLETAS_ASIGNADOS;
  }
}

/**
 * Server Action: Obtener detalle completo de un atleta.
 */
export async function obtenerDetalleAtleta(id: string): Promise<any | null> {
  const session = await auth();
  if (!session) return null;

  try {
    const atleta = await prisma.usuario.findUnique({
      where: { id },
      include: {
        planesComoAtleta: {
          orderBy: { createdAt: "desc" },
          include: {
             entrenador: { select: { nombre: true } },
             rutinas: {
               orderBy: { fechaProgramada: "asc" },
               include: { sesion: true },
             },
          }
        },
        sesiones: {
          orderBy: { fecha: "desc" },
          take: 5,
        },
      },
    });

    return atleta;
  } catch (error) {
    console.error("Error al obtener detalle del atleta:", error);
    return MOCK_ATLETAS_ASIGNADOS[0];
  }
}

/**
 * Server Action: Obtener lista de atletas activos para selects de formularios.
 */
export async function obtenerAtletas(): Promise<UsuarioPublico[]> {

  try {
    const atletas = await prisma.usuario.findMany({
      where: {
        rol: "ATLETA",
        activo: true,
      },
      select: {
        id: true,
        nombre: true,
        documento: true,
        email: true,
        edad: true,
        rol: true,
        telefono: true,
        domicilio: true,
        activo: true,
        createdAt: true,
      },
      orderBy: { nombre: "asc" },
    });

    return atletas;
  } catch (error) {
    console.error("Error al obtener atletas:", error);
    return MOCK_USERS.filter(u => u.rol === "ATLETA") as any;
  }
}
