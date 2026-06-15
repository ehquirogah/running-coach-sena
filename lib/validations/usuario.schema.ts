import { z } from "zod";

/**
 * RN-001: Contraseña mínimo 8 caracteres, debe contener al menos una letra y un número.
 */
const passwordValidation = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .refine((val) => /[a-zA-Z]/.test(val) && /[0-9]/.test(val), {
    message: "La contraseña debe contener al menos una letra y un número",
  });

export const usuarioSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  documento: z
    .string()
    .min(5, "El documento debe tener al menos 5 dígitos")
    .regex(/^\d+$/, "El documento solo debe contener números"),
  email: z.string().email("Email inválido"),
  password: passwordValidation,
  edad: z.number().int().gt(10, "El atleta debe ser mayor de 10 años (RN-002)"),
  rol: z.enum(["ATLETA", "ENTRENADOR"]),
  telefono: z.string().optional(),
  domicilio: z.string().optional(),
});

export type UsuarioInput = z.infer<typeof usuarioSchema>;
