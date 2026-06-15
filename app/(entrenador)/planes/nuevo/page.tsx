"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Plus, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { planSchema, PlanInput } from "@/lib/validations/plan.schema";
import { crearPlan, obtenerAtletas } from "@/actions/planActions";
import { UsuarioPublico } from "@/types";

export default function NuevoPlanPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [atletas, setAtletas] = useState<UsuarioPublico[]>([]);
  const [loadingAtletas, setLoadingAtletas] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanInput>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      duracionSemanas: 12,
      volumenSemanal: 30,
    },
  });

  useEffect(() => {
    async function loadAtletas() {
      const data = await obtenerAtletas();
      setAtletas(data);
      setLoadingAtletas(false);
    }
    loadAtletas();
  }, []);

  const onSubmit = (data: PlanInput) => {
    startTransition(async () => {
      try {
        const result = await crearPlan(data);
        if (result.success) {
          toast.success(result.message || "Plan creado exitosamente");
          router.push("/planes");
        } else {
          toast.error(result.error || "Ocurrió un error");
        }
      } catch (error) {
        toast.error("Error al conectar con el servidor");
      }
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Link href="/planes" className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-6 group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver a la lista
      </Link>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Plus className="w-6 h-6 text-emerald-600" />
            Nuevo Plan de Entrenamiento
          </h1>
          <p className="text-slate-500 mt-2">Personaliza el entrenamiento para tu atleta.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block" htmlFor="atletaId">
              Atleta Asignado
            </label>
            <select
              {...register("atletaId")}
              disabled={loadingAtletas || isPending}
              id="atletaId"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none disabled:bg-slate-50 appearance-none bg-white"
            >
              <option value="">Selecciona un atleta...</option>
              {atletas.map((atleta) => (
                <option key={atleta.id} value={atleta.id}>
                  {atleta.nombre} ({atleta.email})
                </option>
              ))}
            </select>
            {errors.atletaId && <p className="text-rose-500 text-xs font-medium ml-1">{errors.atletaId.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block" htmlFor="objetivo">
              Objetivo del Plan
            </label>
            <textarea
              {...register("objetivo")}
              disabled={isPending}
              id="objetivo"
              rows={4}
              placeholder="Ej: Preparación para maratón de Boston, mejorar ritmo de 5k..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none resize-none disabled:bg-slate-50"
            />
            {errors.objetivo && <p className="text-rose-500 text-xs font-medium ml-1">{errors.objetivo.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block" htmlFor="duracionSemanas">
                Duración (Semanas)
              </label>
              <input
                {...register("duracionSemanas", { valueAsNumber: true })}
                disabled={isPending}
                type="number"
                id="duracionSemanas"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none disabled:bg-slate-50"
              />
              {errors.duracionSemanas && <p className="text-rose-500 text-xs font-medium ml-1">{errors.duracionSemanas.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block" htmlFor="volumenSemanal">
                Volumen (KM Semanales)
              </label>
              <input
                {...register("volumenSemanal", { valueAsNumber: true })}
                disabled={isPending}
                type="number"
                step="0.1"
                id="volumenSemanal"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none disabled:bg-slate-50"
              />
              {errors.volumenSemanal && <p className="text-rose-500 text-xs font-medium ml-1">{errors.volumenSemanal.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending || loadingAtletas}
            className="w-full py-4 text-white font-bold rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200 mt-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creando plan...
              </>
            ) : (
              "Crear Plan de Entrenamiento"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
