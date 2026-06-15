import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: atletaId } = await params;
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

    const sessions = await prisma.sesionEntrenamiento.findMany({
      where: whereClause,
      include: {
        plan: true,
      },
      orderBy: {
        fecha: "desc",
      },
    });

    return NextResponse.json(
      { success: true, data: sessions },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error en GET /api/sesiones/atleta/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
