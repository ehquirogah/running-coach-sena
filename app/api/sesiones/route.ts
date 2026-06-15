import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sesionSchema } from "@/lib/validations/sesion.schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 1. Validar con Zod
    const validation = sesionSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { atletaId, planId, distancia, tiempo, nivelEsfuerzo, fecha } = validation.data;

    // 2. Verificar que el atleta tenga un plan activo (RN-003)
    const activePlan = await prisma.planEntrenamiento.findFirst({
      where: {
        id: planId,
        atletaId,
        activo: true,
      },
    });

    if (!activePlan) {
      return NextResponse.json(
        { success: false, error: "El atleta debe tener un plan activo para registrar sesiones" },
        { status: 400 }
      );
    }

    // 3. Crear sesión
    const newSession = await prisma.sesionEntrenamiento.create({
      data: {
        atletaId,
        planId,
        distancia,
        tiempo,
        nivelEsfuerzo,
        fecha: new Date(fecha),
      },
    });

    return NextResponse.json(
      { success: true, data: newSession },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error en POST /api/sesiones:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
