"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Loader2, MessageSquare } from "lucide-react";
import { retroalimentarRutina } from "@/actions/rutinaActions";
import { feedbackRutinaSchema, FeedbackRutinaInput } from "@/lib/validations/rutina.schema";

interface FeedbackRutinaFormProps {
  rutina: any;
}

export default function FeedbackRutinaForm({ rutina }: FeedbackRutinaFormProps) {
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors } } = useForm<FeedbackRutinaInput>({
    resolver: zodResolver(feedbackRutinaSchema),
    defaultValues: {
      rutinaId: rutina.id,
      feedbackEntrenador: rutina.feedbackEntrenador ?? "",
      recomendacionEntrenador: rutina.recomendacionEntrenador ?? "",
      decisionAjuste: rutina.decisionAjuste ?? "",
    },
  });

  const onSubmit = (data: FeedbackRutinaInput) => {
    startTransition(async () => {
      const result = await retroalimentarRutina(data);
      if (result.success) {
        toast.success(result.message || "Retroalimentacion guardada");
      } else {
        toast.error(result.error || "No se pudo guardar la retroalimentacion");
      }
    });
  };

  if (rutina.estado !== "COMPLETADA") return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3 rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
      <input type="hidden" {...register("rutinaId")} />
      <textarea {...register("feedbackEntrenador")} rows={2} className="w-full rounded-lg border border-emerald-100 px-3 py-2 text-sm outline-none focus:border-emerald-500" placeholder="Retroalimentacion tecnica" />
      {errors.feedbackEntrenador && <p className="text-xs text-rose-500">{errors.feedbackEntrenador.message}</p>}
      <textarea {...register("recomendacionEntrenador")} rows={2} className="w-full rounded-lg border border-emerald-100 px-3 py-2 text-sm outline-none focus:border-emerald-500" placeholder="Recomendacion para el siguiente entrenamiento" />
      {errors.recomendacionEntrenador && <p className="text-xs text-rose-500">{errors.recomendacionEntrenador.message}</p>}
      <input {...register("decisionAjuste")} className="w-full rounded-lg border border-emerald-100 px-3 py-2 text-sm outline-none focus:border-emerald-500" placeholder="Decision de ajuste: mantener, subir carga, descargar..." />
      {errors.decisionAjuste && <p className="text-xs text-rose-500">{errors.decisionAjuste.message}</p>}
      <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-60">
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageSquare className="h-4 w-4" />}
        Enviar feedback
      </button>
    </form>
  );
}
