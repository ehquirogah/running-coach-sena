import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { usuarioSchema } from "@/lib/validations/usuario.schema";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validar con Zod
    const validation = usuarioSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { nombre, documento, email, password, edad, rol, telefono, domicilio } = validation.data;

    // Verificar si el documento ya existe
    const existingUser = await prisma.usuario.findUnique({
      where: { documento },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "El documento ya se encuentra registrado" },
        { status: 400 }
      );
    }

    // Hashear contraseña (cumple RNF-003)
    const passwordHash = await bcrypt.hash(password, 12);

    // Crear usuario
    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        documento,
        email,
        password: passwordHash,
        edad,
        rol,
        telefono,
        domicilio,
      },
    });

    // Retorna 201 sin password
    const { password: _, ...usuarioSinPassword } = newUser;

    return NextResponse.json(
      { success: true, data: usuarioSinPassword },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error en POST /api/usuarios:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
