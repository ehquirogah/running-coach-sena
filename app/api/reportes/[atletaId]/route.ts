import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ReporteProgreso } from "@/types";
import { Prisma } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ atletaId: string }> }
) {
  try {
    const { atletaId } = await params;
    const searchParams = req.nextUrl.searchParams;
    const desde = searchParams.get("desde");
    const hasta = searchParams.get("hasta");

    const whereClause: Prisma.SesionEntrenamientoWhereInput = {
      atletaId,
    };

    if (desde || hasta) {
      whereClause.fecha = {};
      if (desde) whereClause.fecha.gte = new Date(desde);
      if (hasta) whereClause.fecha.lte = new Date(hasta);
    }

    const sesiones = await prisma.sesionEntrenamiento.findMany({
      where: whereClause,
      include: {
        plan: true,
        rutina: true,
      },
      orderBy: {
        fecha: "asc",
      },
    });

    if (sesiones.length === 0) {
      return NextResponse.json(
        { 
          success: true, 
          data: [], 
          message: "No se encontraron sesiones en el rango especificado." 
        },
        { status: 200 }
      );
    }

    // Calcular métricas (RF-005)
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

    const reporte: ReporteProgreso = {
      sesiones,
      totalKm: Number(totalKm.toFixed(2)),
      promedioTiempo: Number((totalTiempo / sesiones.length).toFixed(2)),
      promedioEsfuerzo: Number((totalEsfuerzo / sesiones.length).toFixed(2)),
      evolucion,
    };

    return NextResponse.json(
      { success: true, data: reporte },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error en GET /api/reportes/[atletaId]:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
