"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Loader2, Save } from "lucide-react";
import { registrarResultadoRutina } from "@/actions/rutinaActions";
import { resultadoRutinaSchema, ResultadoRutinaInput } from "@/lib/validations/rutina.schema";

interface ResultadoRutinaFormProps {
  rutina: any;
}

export default function ResultadoRutinaForm({ rutina }: ResultadoRutinaFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResultadoRutinaInput>({
    resolver: zodResolver(resultadoRutinaSchema),
    defaultValues: {
      rutinaId: rutina.id,
      distancia: rutina.sesion?.distancia ?? rutina.distanciaObjetivo,
      tiempo: rutina.sesion?.tiempo ?? rutina.tiempoObjetivo,
      nivelEsfuerzo: rutina.sesion?.nivelEsfuerzo ?? rutina.intensidadEsperada,
      fecha: new Date(rutina.sesion?.fecha ?? rutina.fechaProgramada).toISOString().split("T")[0],
      resultadoPercibido: rutina.resultadoPercibido ?? "",
      cumplimiento: rutina.cumplimiento ?? 100,
      comentariosAtleta: rutina.comentariosAtleta ?? "",
      molestiasFisicas: rutina.molestiasFisicas ?? "",
      dificultadReal: rutina.dificultadReal ?? rutina.intensidadEsperada,
      evidencia: rutina.evidencia ?? "",
    },
  });

  const onSubmit = (data: ResultadoRutinaInput) => {
    startTransition(async () => {
      const result = await registrarResultadoRutina(data);
      if (result.success) {
        toast.success(result.message || "Resultado registrado");
        router.push("/mi-plan");
        router.refresh();
      } else {
        toast.error(result.error || "No se pudo registrar el resultado");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="hidden" {...register("rutinaId")} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Field label="Distancia real (km)" error={errors.distancia?.message}>
          <input type="number" step="0.1" {...register("distancia", { valueAsNumber: true })} className="input-rutina" />
        </Field>
        <Field label="Tiempo real (min)" error={errors.tiempo?.message}>
          <input type="number" {...register("tiempo", { valueAsNumber: true })} className="input-rutina" />
        </Field>
        <Field label="Esfuerzo 1-10" error={errors.nivelEsfuerzo?.message}>
          <input type="number" min="1" max="10" {...register("nivelEsfuerzo", { valueAsNumber: true })} className="input-rutina" />
        </Field>
        <Field label="Fecha" error={errors.fecha?.message}>
          <input type="date" {...register("fecha")} className="input-rutina" />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Cumplimiento (%)" error={errors.cumplimiento?.message}>
          <input type="number" min="0" max="100" {...register("cumplimiento", { valueAsNumber: true })} className="input-rutina" />
        </Field>
        <Field label="Dificultad real 1-10" error={errors.dificultadReal?.message}>
          <input type="number" min="1" max="10" {...register("dificultadReal", { valueAsNumber: true })} className="input-rutina" />
        </Field>
      </div>

      <Field label="Resultado percibido" error={errors.resultadoPercibido?.message}>
        <textarea {...register("resultadoPercibido")} rows={3} className="input-rutina resize-none" placeholder="Como sentiste el entrenamiento" />
      </Field>
      <Field label="Comentarios del atleta" error={errors.comentariosAtleta?.message}>
        <textarea {...register("comentariosAtleta")} rows={3} className="input-rutina resize-none" placeholder="Que salio bien, que costo, que cambiarias" />
      </Field>
      <Field label="Molestias fisicas" error={errors.molestiasFisicas?.message}>
        <input {...register("molestiasFisicas")} className="input-rutina" placeholder="Opcional" />
      </Field>
      <Field label="Evidencia o nota adicional" error={errors.evidencia?.message}>
        <input {...register("evidencia")} className="input-rutina" placeholder="Opcional: enlace, marca del reloj o referencia" />
      </Field>

      <button type="submit" disabled={isPending} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-lg font-black text-white hover:bg-emerald-700 disabled:opacity-60">
        {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
        Guardar resultado
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase text-slate-500">{label}</label>
      {children}
      {error && <p className="text-xs font-medium text-rose-500">{error}</p>}
    </div>
  );
}
