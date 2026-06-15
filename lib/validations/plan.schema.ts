import { z } from "zod";

export const planSchema = z.object({
  objetivo: z.string().min(10, "El objetivo debe tener al menos 10 caracteres"),
  duracionSemanas: z.number().int().positive("La duración debe ser un número positivo"),
  volumenSemanal: z.number().positive("El volumen semanal debe ser positivo"),
  atletaId: z.string().cuid("ID de atleta inválido"),
});

export type PlanInput = z.infer<typeof planSchema>;
