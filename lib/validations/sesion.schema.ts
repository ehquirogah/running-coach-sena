import { z } from "zod";

export const sesionSchema = z.object({
  atletaId: z.string().cuid("ID de atleta invalido"),
  planId: z.string().cuid("ID de plan invalido"),
  rutinaId: z.string().cuid("ID de rutina invalido").optional().or(z.literal("")),
  distancia: z.number().positive("La distancia debe ser positiva"),
  tiempo: z.number().positive("El tiempo debe ser un valor positivo"),
  nivelEsfuerzo: z.number().int().min(1).max(10, "Esfuerzo debe estar entre 1 y 10"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
});

export type SesionInput = z.infer<typeof sesionSchema>;
