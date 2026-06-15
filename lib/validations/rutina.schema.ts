import { z } from "zod";

export const rutinaSchema = z.object({
  planId: z.string().cuid("ID de plan invalido"),
  nombre: z.string().min(4, "El nombre debe tener al menos 4 caracteres"),
  descripcion: z.string().min(10, "La descripcion debe tener al menos 10 caracteres"),
  tipoEntrenamiento: z.string().min(3, "Selecciona o escribe un tipo de entrenamiento"),
  fechaProgramada: z.string().min(1, "La fecha programada es obligatoria"),
  distanciaObjetivo: z.number().positive("La distancia objetivo debe ser positiva"),
  tiempoObjetivo: z.number().positive("El tiempo objetivo debe ser positivo"),
  intensidadEsperada: z.number().int().min(1).max(10, "La intensidad debe estar entre 1 y 10"),
  observacionesEntrenador: z.string().optional(),
});

export const resultadoRutinaSchema = z.object({
  rutinaId: z.string().cuid("ID de rutina invalido"),
  distancia: z.number().positive("La distancia realizada debe ser positiva"),
  tiempo: z.number().positive("El tiempo realizado debe ser positivo"),
  nivelEsfuerzo: z.number().int().min(1).max(10, "El esfuerzo debe estar entre 1 y 10"),
  fecha: z.string().min(1, "La fecha del entrenamiento es obligatoria"),
  resultadoPercibido: z.string().min(4, "Describe brevemente el resultado"),
  cumplimiento: z.number().int().min(0).max(100, "El cumplimiento debe estar entre 0 y 100"),
  comentariosAtleta: z.string().min(4, "Agrega un comentario sobre el entrenamiento"),
  molestiasFisicas: z.string().optional(),
  dificultadReal: z.number().int().min(1).max(10, "La dificultad debe estar entre 1 y 10"),
  evidencia: z.string().optional(),
});

export const feedbackRutinaSchema = z.object({
  rutinaId: z.string().cuid("ID de rutina invalido"),
  feedbackEntrenador: z.string().min(8, "La retroalimentacion debe tener al menos 8 caracteres"),
  recomendacionEntrenador: z.string().min(8, "La recomendacion debe tener al menos 8 caracteres"),
  decisionAjuste: z.string().min(4, "Indica la decision para el siguiente ajuste"),
});

export type RutinaInput = z.infer<typeof rutinaSchema>;
export type ResultadoRutinaInput = z.infer<typeof resultadoRutinaSchema>;
export type FeedbackRutinaInput = z.infer<typeof feedbackRutinaSchema>;
