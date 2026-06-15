import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { planSchema } from "@/lib/validations/plan.schema";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    // 1. Verificar autenticación y rol (RN-004)
    if (!session || (session.user as any).rol !== "ENTRENADOR") {
      return NextResponse.json(
        { success: false, error: "No autorizado. Solo entrenadores pueden crear planes." },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // 2. Validar con Zod
    const validation = planSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { objetivo, duracionSemanas, volumenSemanal, atletaId } = validation.data;

    // 3. RN-003: Verificar si el atleta ya tiene un plan activo
    const activePlan = await prisma.planEntrenamiento.findFirst({
      where: {
        atletaId,
        activo: true,
      },
    });

    if (activePlan) {
      return NextResponse.json(
        { success: false, error: "El atleta ya tiene un plan activo" },
        { status: 400 }
      );
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
        atleta: {
          select: { id: true, nombre: true, email: true, rol: true },
        },
        entrenador: {
          select: { id: true, nombre: true, email: true, rol: true },
        },
      },
    });

    return NextResponse.json(
      { success: true, data: newPlan },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error en POST /api/planes:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
