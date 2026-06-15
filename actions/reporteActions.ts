"use server";

import prisma from "@/lib/prisma";
import { ReporteProgreso } from "@/types";

/**
 * Server Action: Obtener reporte de progreso de un atleta.
 * Consulta directamente Prisma para alimentar los gráficos de Recharts.
 */
export async function obtenerReporte(
  atletaId: string,
  desde?: string,
  hasta?: string
): Promise<ReporteProgreso> {
  try {
    const whereClause: any = {
      atletaId,
    };

    if (desde || hasta) {
      whereClause.fecha = {};
      if (desde) whereClause.fecha.gte = new Date(desde);
      if (hasta) whereClause.fecha.lte = new Date(hasta);
    }

    // 1. Consultar sesiones
    const sesiones = await prisma.sesionEntrenamiento.findMany({
      where: whereClause,
      include: {
        plan: true,
        rutina: true,
      },
      orderBy: { fecha: "asc" },
    });

    if (sesiones.length === 0) {
      return {
        sesiones: [],
        totalKm: 0,
        promedioTiempo: 0,
        promedioEsfuerzo: 0,
        evolucion: [],
      };
    }

    // 2. Calcular métricas (RF-005)
    let totalKm = 0;
    let totalTiempo = 0;
    let totalEsfuerzo = 0;

    const evolucion = sesiones.map((s) => {
      totalKm += s.distancia;
      totalTiempo += s.tiempo;
      totalEsfuerzo += s.nivelEsfuerzo;

      return {
        fecha: s.fecha.toISOString().split("T")[0],
        km: Number(s.distancia.toFixed(2)),
        esfuerzo: s.nivelEsfuerzo,
      };
    });

    return {
      sesiones,
      totalKm: Number(totalKm.toFixed(2)),
      promedioTiempo: Number((totalTiempo / sesiones.length).toFixed(2)),
      promedioEsfuerzo: Number((totalEsfuerzo / sesiones.length).toFixed(2)),
      evolucion,
    };

  } catch (error) {
    console.error("Error en obtenerReporte action:", error);
    return {
      sesiones: [],
      totalKm: 0,
      promedioTiempo: 0,
      promedioEsfuerzo: 0,
      evolucion: [],
    };
  }
}
