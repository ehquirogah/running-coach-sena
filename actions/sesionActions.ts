"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sesionSchema, SesionInput } from "@/lib/validations/sesion.schema";
import { ActionResult, SesionConPlan } from "@/types";
import { MOCK_SESIONES } from "@/lib/mock-data";

/**
 * Server Action: Registrar una sesión de entrenamiento.
 */
export async function registrarSesion(data: SesionInput): Promise<ActionResult<SesionConPlan>> {
  // 1. Validar datos
  const validation = sesionSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: "Datos de la sesión inválidos" };
  }

  try {
    const { atletaId, planId, rutinaId, distancia, tiempo, nivelEsfuerzo, fecha } = validation.data;

    // 2. Verificar que el atleta tenga el plan activo
    const activePlan = await prisma.planEntrenamiento.findFirst({
      where: {
        id: planId,
        atletaId,
        activo: true,
      },
    });

    if (!activePlan) {
      return { 
        success: false, 
        error: "El atleta no tiene un plan activo asociado a esta sesión" 
      };
    }

    // 3. Crear la sesión en BD
    const newSession = await prisma.sesionEntrenamiento.create({
      data: {
        atletaId,
        planId,
        rutinaId: rutinaId || null,
        distancia,
        tiempo,
        nivelEsfuerzo,
        fecha: new Date(fecha),
      },
      include: {
        plan: true,
        rutina: true,
      },
    });

    // 4. Revalidar caché de historial y reportes
    revalidatePath("/sesiones/historial");
    revalidatePath(`/reportes/${atletaId}`);

    return { success: true, data: newSession as SesionConPlan, message: "Sesión registrada correctamente" };

  } catch (error) {
    console.error("Error en registrarSesion action:", error);
    return { success: false, error: "Error al guardar la sesión de entrenamiento" };
  }
}

/**
 * Server Action: Obtener historial de sesiones del atleta con paginación.
 */
export async function obtenerHistorialSesiones(page: number = 1, limit: number = 10): Promise<{ sesiones: SesionConPlan[], total: number }> {
  try {
    const session = await auth();
    if (!session || (session.user as any).rol !== "ATLETA") return { sesiones: [], total: 0 };

    const offset = (page - 1) * limit;
    const atletaId = (session.user as any).id;

    const [sesiones, total] = await Promise.all([
      prisma.sesionEntrenamiento.findMany({
        where: { atletaId },
        include: { plan: true, rutina: true },
        orderBy: { fecha: "desc" },
        skip: offset,
        take: limit,
      }),
      prisma.sesionEntrenamiento.count({
        where: { atletaId },
      }),
    ]);

    return { sesiones: sesiones as SesionConPlan[], total };
  } catch (error) {
    console.error("Error al obtener historial de sesiones:", error);
    return { sesiones: MOCK_SESIONES as any, total: MOCK_SESIONES.length };
  }
}

/**
 * Server Action: Obtener resumen estadístico de sesiones para el atleta.
 */
export async function obtenerResumenSesiones(): Promise<{ totalSesiones: number, totalKm: number, promedioEsfuerzo: number }> {
  try {
    const session = await auth();
    if (!session || (session.user as any).rol !== "ATLETA") return { totalSesiones: 0, totalKm: 0, promedioEsfuerzo: 0 };

    const atletaId = (session.user as any).id;

    const agregados = await prisma.sesionEntrenamiento.aggregate({
      where: { atletaId },
      _count: { id: true },
      _sum: { distancia: true },
      _avg: { nivelEsfuerzo: true },
    });

    return {
      totalSesiones: agregados._count.id || 0,
      totalKm: agregados._sum.distancia || 0,
      promedioEsfuerzo: agregados._avg.nivelEsfuerzo || 0,
    };
  } catch (error) {
    console.error("Error al obtener resumen de sesiones:", error);
    const totalKm = MOCK_SESIONES.reduce((acc, s) => acc + s.distancia, 0);
    const promedioEsfuerzo = MOCK_SESIONES.reduce((acc, s) => acc + s.nivelEsfuerzo, 0) / MOCK_SESIONES.length;
    return {
      totalSesiones: MOCK_SESIONES.length,
      totalKm,
      promedioEsfuerzo,
    };
  }
}

import { auth } from "@/lib/auth";
