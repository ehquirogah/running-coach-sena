"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MapPin, Clock, Gauge, Calendar, Loader2 } from "lucide-react";
import { sesionSchema, SesionInput } from "@/lib/validations/sesion.schema";
import { registrarSesion } from "@/actions/sesionActions";

interface RegistroSesionFormProps {
  atletaId: string;
  planId: string;
}

export default function RegistroSesionForm({ atletaId, planId }: RegistroSesionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SesionInput>({
    resolver: zodResolver(sesionSchema),
    defaultValues: {
      atletaId,
      planId,
      fecha: new Date().toISOString().split("T")[0],
      nivelEsfuerzo: 5,
    },
  });

  const onSubmit = async (data: SesionInput) => {
    setIsLoading(true);
    try {
      const result = await registrarSesion(data);
      if (result.success) {
        toast.success("Sesión registrada exitosamente");
        router.push("/dashboard/atleta");
        router.refresh();
      } else {
        toast.error(result.error || "Error al registrar la sesión");
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distancia */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MapPin size={16} /> Distancia (KM)
          </label>
          <input
            {...register("distancia", { valueAsNumber: true })}
            type="number"
            step="0.01"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.distancia ? 'border-red-300' : 'border-gray-200'} outline-none focus:ring-2 focus:ring-green-100 focus:border-[#16A34A] transition-all`}
            placeholder="0.00"
          />
          {errors.distancia && <p className="text-xs text-red-500 font-medium">{errors.distancia.message}</p>}
        </div>

        {/* Tiempo */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Clock size={16} /> Tiempo (Minutos)
          </label>
          <input
            {...register("tiempo", { valueAsNumber: true })}
            type="number"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.tiempo ? 'border-red-300' : 'border-gray-200'} outline-none focus:ring-2 focus:ring-green-100 focus:border-[#16A34A] transition-all`}
            placeholder="45"
          />
          {errors.tiempo && <p className="text-xs text-red-500 font-medium">{errors.tiempo.message}</p>}
        </div>

        {/* Fecha */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Calendar size={16} /> Fecha del entrenamiento
          </label>
          <input
            {...register("fecha")}
            type="date"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.fecha ? 'border-red-300' : 'border-gray-200'} outline-none focus:ring-2 focus:ring-green-100 focus:border-[#16A34A] bg-white transition-all`}
          />
          {errors.fecha && <p className="text-xs text-red-500 font-medium">{errors.fecha.message}</p>}
        </div>

        {/* Nivel de Esfuerzo */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Gauge size={16} /> Nivel percibido (1-10)
          </label>
          <input
            {...register("nivelEsfuerzo", { valueAsNumber: true })}
            type="number"
            min="1"
            max="10"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.nivelEsfuerzo ? 'border-red-300' : 'border-gray-200'} outline-none focus:ring-2 focus:ring-green-100 focus:border-[#16A34A] transition-all`}
            placeholder="5"
          />
          {errors.nivelEsfuerzo && <p className="text-xs text-red-500 font-medium">{errors.nivelEsfuerzo.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold rounded-xl shadow-lg shadow-green-100 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "Registrar Sesión"}
      </button>
    </form>
  );
}
