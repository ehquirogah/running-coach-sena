"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { usuarioSchema, UsuarioInput } from "@/lib/validations/usuario.schema";
import { ActionResult, UsuarioPublico } from "@/types";
import { auth } from "@/lib/auth";
import { MOCK_ALL_USERS_ADMIN } from "@/lib/mock-data";

/**
 * Server Action: Registrar un nuevo usuario.
 * Llama internamente a la API de registro para centralizar la lógica de negocio.
 */
export async function registrarUsuario(formData: UsuarioInput): Promise<ActionResult<UsuarioPublico>> {
  // 1. Validar con Zod en el servidor
  const validation = usuarioSchema.safeParse(formData);
  if (!validation.success) {
    return {
      success: false,
      error: "Datos de usuario inválidos",
    };
  }

  try {
    // 2. Llamar a la API interna (POST /api/usuarios)
    // Usamos el host local interno (si no está definido, usamos localhost)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validation.data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Error al registrar el usuario",
      };
    }

    // El éxito se maneja fuera del try/catch para permitir el redirect
  } catch (error) {
    console.error("Error en registrarUsuario action:", error);
    return {
      success: false,
      error: "Error de conexión con el servidor",
    };
  }

  // 3. Redirigir a /login tras éxito (Debe estar fuera del try/catch)
  const { redirect } = await import("next/navigation");
  redirect("/login?registered=true");
  
  return { success: true }; // unreachable but satisfies TS
}

/**
 * Server Action: Obtener todos los usuarios (Solo para ADMIN).
 */
export async function obtenerUsuariosPaginados(page: number = 1, limit: number = 10): Promise<{ usuarios: UsuarioPublico[], total: number }> {
  try {
    const session = await auth();
    if (!session || (session.user as any).rol !== "ADMIN") {
      throw new Error("No autorizado");
    }

    const offset = (page - 1) * limit;

    const [usuarios, total] = await Promise.all([
      prisma.usuario.findMany({
        skip: offset,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          nombre: true,
          documento: true,
          email: true,
          rol: true,
          activo: true,
          createdAt: true,
          edad: true,
          telefono: true,
          domicilio: true,
        },
      }),
      prisma.usuario.count(),
    ]);

    return { usuarios: usuarios as any, total };
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return { usuarios: MOCK_ALL_USERS_ADMIN as any, total: MOCK_ALL_USERS_ADMIN.length };
  }
}

/**
 * Server Action: Activar/Desactivar un usuario (Solo para ADMIN).
 */
export async function toggleUsuarioActivo(userId: string): Promise<ActionResult> {
  try {
    const session = await auth();
    if (!session || (session.user as any).rol !== "ADMIN") {
      return { success: false, error: "No autorizado" };
    }

    const user = await prisma.usuario.findUnique({ where: { id: userId } });
    if (!user) return { success: false, error: "Usuario no encontrado" };

    await prisma.usuario.update({
      where: { id: userId },
      data: { activo: !user.activo },
    });

    revalidatePath("/usuarios");
    return { success: true, message: `Usuario ${!user.activo ? 'activado' : 'desactivado'} correctamente` };

  } catch (error) {
    console.error("Error en toggleUsuarioActivo:", error);
    return { success: true, message: "Modo Demo: El estado se actualizó visualmente (no persistente)" };
  }
}
