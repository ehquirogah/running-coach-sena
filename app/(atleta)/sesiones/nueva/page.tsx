"use client";

import { useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Activity, Clock, TrendingUp, Calendar, Loader2, ArrowLeft, Target, AlertTriangle, ClipboardCheck } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { sesionSchema, SesionInput } from "@/lib/validations/sesion.schema";
import { registrarSesion } from "@/actions/sesionActions";
import { obtenerPlanActivoAtleta } from "@/actions/planActions";
import { obtenerRutinasPlanActivoAtleta } from "@/actions/rutinaActions";
import { useSession } from "next-auth/react";

export default function NuevaSesionPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [planActivo, setPlanActivo] = useState<any>(null);
  const [rutinasPendientes, setRutinasPendientes] = useState<any[]>([]);
  const [loadingPlan, setLoadingPlan] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SesionInput>({
    resolver: zodResolver(sesionSchema),
    defaultValues: {
      fecha: new Date().toISOString(),
      nivelEsfuerzo: 5,
    },
  });

  const effortValue = watch("nivelEsfuerzo");

  useEffect(() => {
    async function checkPlan() {
      const plan = await obtenerPlanActivoAtleta();
      const rutinas = await obtenerRutinasPlanActivoAtleta();
      setPlanActivo(plan);
      setRutinasPendientes(rutinas.filter((rutina: any) => rutina.estado === "PENDIENTE" || rutina.estado === "COMPLETADA"));
      if (plan) {
        setValue("planId", plan.id);
        setValue("atletaId", (session?.user as any)?.id || "");
      }
      setLoadingPlan(false);
    }
    if (session) checkPlan();
  }, [session, setValue]);

  const onSubmit = (data: SesionInput) => {
    startTransition(async () => {
      try {
        const result = await registrarSesion(data);
        if (result.success) {
          toast.success(`Sesión registrada: ${data.distancia} km en ${data.tiempo} min`);
          router.push("/sesiones/historial");
        } else {
          toast.error(result.error || "Error al registrar sesión");
        }
      } catch (error) {
        toast.error("Error de conexión");
      }
    });
  };

  const getEffortColor = (val: number) => {
    if (val <= 3) return "bg-emerald-500 shadow-emerald-200";
    if (val <= 6) return "bg-amber-500 shadow-amber-200";
    return "bg-rose-500 shadow-rose-200";
  };

  const getEffortLabel = (val: number) => {
    if (val <= 3) return "Suave / Recuperación";
    if (val <= 6) return "Moderado / Ritmo";
    if (val <= 8) return "Intenso / Umbral";
    return "Máximo / VO2 Máx";
  };

  if (loadingPlan) {
    return (
      <div className="container mx-auto p-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!planActivo) {
    return (
      <div className="container mx-auto p-6 max-w-xl">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center space-y-4">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto" />
          <h2 className="text-2xl font-bold text-amber-900">Requiere un Plan Activo</h2>
          <p className="text-amber-700">
            No puedes registrar sesiones sin un plan de entrenamiento activo asignado por tu entrenador.
          </p>
          <Link href="/mi-plan" className="block">
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl py-6 font-bold shadow-lg mt-4">
              Ir a Mi Plan
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Link href="/mi-plan" className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-6 group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver a mi plan
      </Link>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-emerald-300" />
            <span className="text-emerald-100 text-sm font-bold tracking-widest uppercase">RF-004</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Registar Entrenamiento</h1>
          <p className="text-emerald-50 mt-1 opacity-90">Plan actual: {planActivo.objetivo}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
          {rutinasPendientes.length > 0 && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <h2 className="text-sm font-black uppercase text-emerald-800 flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4" />
                Rutinas asignadas disponibles
              </h2>
              <div className="mt-4 grid gap-3">
                {rutinasPendientes.slice(0, 3).map((rutina) => (
                  <Link key={rutina.id} href={`/rutinas/${rutina.id}/resultado`} className="flex items-center justify-between rounded-xl bg-white p-4 border border-emerald-100 hover:border-emerald-300 transition-colors">
                    <div>
                      <p className="font-bold text-slate-900">{rutina.nombre}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(rutina.fechaProgramada).toLocaleDateString()} - {rutina.distanciaObjetivo} km - {rutina.estado}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-emerald-700">Registrar</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Distancia (KM)
              </label>
              <input
                {...register("distancia", { valueAsNumber: true })}
                type="number"
                step="0.1"
                placeholder="0.0"
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-emerald-500 focus:ring-0 transition-all text-xl font-bold text-slate-800 placeholder:text-slate-300 outline-none"
              />
              {errors.distancia && <p className="text-rose-500 text-xs font-bold">{errors.distancia.message}</p>}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                Tiempo (Minutos)
              </label>
              <input
                {...register("tiempo", { valueAsNumber: true })}
                type="number"
                placeholder="0"
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-emerald-500 focus:ring-0 transition-all text-xl font-bold text-slate-800 placeholder:text-slate-300 outline-none"
              />
              {errors.tiempo && <p className="text-rose-500 text-xs font-bold">{errors.tiempo.message}</p>}
            </div>
          </div>

          <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-end">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" />
                Nivel de Esfuerzo Percibido
              </label>
              <span className={`text-2xl font-black px-4 py-1 rounded-xl text-white shadow-lg transition-colors ${getEffortColor(effortValue)}`}>
                {effortValue}
              </span>
            </div>
            
            <div className="space-y-2">
              <input
                {...register("nivelEsfuerzo", { valueAsNumber: true })}
                type="range"
                min="1"
                max="10"
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                <span>Tranquilo</span>
                <span>Moderado</span>
                <span>Muy Duro</span>
                <span>Al Límite</span>
              </div>
            </div>
            <p className="text-center text-sm font-bold text-slate-500 italic">
              "{getEffortLabel(effortValue)}"
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Fecha del Entrenamiento
            </label>
            <input
              {...register("fecha")}
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-emerald-500 transition-all text-slate-800 font-medium outline-none"
            />
            {errors.fecha && <p className="text-rose-500 text-xs font-bold">{errors.fecha.message}</p>}
          </div>

          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl py-8 text-xl font-black shadow-2xl shadow-emerald-100 transition-all active:scale-95 disabled:opacity-50"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin" />
                Guardando sesión...
              </div>
            ) : (
              "¡Guardar Entrenamiento!"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
