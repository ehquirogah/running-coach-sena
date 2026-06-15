"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { CalendarPlus, Loader2 } from "lucide-react";
import { crearRutina } from "@/actions/rutinaActions";
import { rutinaSchema, RutinaInput } from "@/lib/validations/rutina.schema";

interface RutinaFormProps {
  planId: string;
}

export default function RutinaForm({ planId }: RutinaFormProps) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RutinaInput>({
    resolver: zodResolver(rutinaSchema),
    defaultValues: {
      planId,
      tipoEntrenamiento: "Rodaje",
      intensidadEsperada: 5,
      distanciaObjetivo: 5,
      tiempoObjetivo: 30,
      fechaProgramada: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data: RutinaInput) => {
    startTransition(async () => {
      const result = await crearRutina(data);
      if (result.success) {
        toast.success(result.message || "Rutina creada");
        reset({
          planId,
          tipoEntrenamiento: "Rodaje",
          intensidadEsperada: 5,
          distanciaObjetivo: 5,
          tiempoObjetivo: 30,
          fechaProgramada: new Date().toISOString().split("T")[0],
          nombre: "",
          descripcion: "",
          observacionesEntrenador: "",
        });
      } else {
        toast.error(result.error || "No se pudo crear la rutina");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register("planId")} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase">Nombre</label>
          <input {...register("nombre")} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" placeholder="Series suaves" />
          {errors.nombre && <p className="text-xs text-rose-500">{errors.nombre.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase">Tipo</label>
          <select {...register("tipoEntrenamiento")} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 bg-white">
            <option>Rodaje</option>
            <option>Intervalos</option>
            <option>Tempo</option>
            <option>Fondo</option>
            <option>Recuperacion</option>
            <option>Fuerza</option>
          </select>
          {errors.tipoEntrenamiento && <p className="text-xs text-rose-500">{errors.tipoEntrenamiento.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase">Descripcion</label>
        <textarea {...register("descripcion")} rows={3} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 resize-none" placeholder="Calentamiento, bloque principal y vuelta a la calma" />
        {errors.descripcion && <p className="text-xs text-rose-500">{errors.descripcion.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase">Fecha</label>
          <input type="date" {...register("fechaProgramada")} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase">Km objetivo</label>
          <input type="number" step="0.1" {...register("distanciaObjetivo", { valueAsNumber: true })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase">Min objetivo</label>
          <input type="number" {...register("tiempoObjetivo", { valueAsNumber: true })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase">Intensidad</label>
          <input type="number" min="1" max="10" {...register("intensidadEsperada", { valueAsNumber: true })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase">Observaciones</label>
        <textarea {...register("observacionesEntrenador")} rows={2} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 resize-none" placeholder="Indicaciones tecnicas, ritmo o precauciones" />
      </div>

      <button type="submit" disabled={isPending} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-60">
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4" />}
        Crear rutina
      </button>
    </form>
  );
}
