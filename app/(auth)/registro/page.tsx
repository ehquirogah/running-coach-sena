"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Activity, User, FileText, Mail, Lock, Calendar, Phone, Home, Loader2, ShieldCheck, ShieldAlert } from "lucide-react";
import { usuarioSchema, UsuarioInput } from "@/lib/validations/usuario.schema";
import { registrarUsuario } from "@/actions/usuarioActions";
import Link from "next/link";

export default function RegistroPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UsuarioInput>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      rol: "ATLETA",
      edad: 18,
    },
  });

  const password = watch("password", "");

  // RN-001: Indicador de fortaleza
  const getPasswordStrength = () => {
    if (!password) return null;
    const hasLength = password.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (hasLength && hasLetter && hasNumber) {
      return { label: "Segura", color: "text-green-600", icon: <ShieldCheck size={14} /> };
    }
    return { label: "Débil", color: "text-red-500", icon: <ShieldAlert size={14} /> };
  };

  const strength = getPasswordStrength();

  const onSubmit = async (data: UsuarioInput) => {
    setIsLoading(true);
    try {
      const result = await registrarUsuario(data);
      if (result.success) {
        toast.success("Usuario registrado exitosamente");
        // El action maneja el redirect, pero por si acaso:
        router.push("/login?registered=true");
      } else {
        toast.error(result.error || "Error al registrar usuario");
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-green-50">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-green-50 text-[#16A34A] rounded-2xl mb-4">
            <Activity size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Crear Cuenta</h1>
          <p className="text-sm text-gray-500 mt-2">Únete a la comunidad de Running Coach</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User size={16} /> Nombre completo
              </label>
              <input
                {...register("nombre")}
                className={`w-full px-4 py-2.5 rounded-xl border ${errors.nombre ? 'border-red-300' : 'border-gray-200'} outline-none focus:ring-2 focus:ring-green-100 focus:border-[#16A34A] transition-all`}
                placeholder="Juan Pérez"
              />
              {errors.nombre && <p className="text-xs text-red-500 font-medium">{errors.nombre.message}</p>}
            </div>

            {/* Documento */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText size={16} /> Documento
              </label>
              <input
                {...register("documento")}
                className={`w-full px-4 py-2.5 rounded-xl border ${errors.documento ? 'border-red-300' : 'border-gray-200'} outline-none focus:ring-2 focus:ring-green-100 focus:border-[#16A34A] transition-all`}
                placeholder="12345678"
              />
              {errors.documento && <p className="text-xs text-red-500 font-medium">{errors.documento.message}</p>}
            </div>

            {/* Correo */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Mail size={16} /> Correo electrónico
              </label>
              <input
                {...register("email")}
                type="email"
                className={`w-full px-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-300' : 'border-gray-200'} outline-none focus:ring-2 focus:ring-green-100 focus:border-[#16A34A] transition-all`}
                placeholder="correo@ejemplo.com"
              />
              {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
            </div>

            {/* Edad */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar size={16} /> Edad
              </label>
              <input
                {...register("edad", { valueAsNumber: true })}
                type="number"
                className={`w-full px-4 py-2.5 rounded-xl border ${errors.edad ? 'border-red-300' : 'border-gray-200'} outline-none focus:ring-2 focus:ring-green-100 focus:border-[#16A34A] transition-all`}
                placeholder="25"
              />
              {errors.edad && <p className="text-xs text-red-500 font-medium">{errors.edad.message}</p>}
            </div>

            {/* Rol */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Rol en el sistema</label>
              <select
                {...register("rol")}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-100 focus:border-[#16A34A] bg-white transition-all cursor-pointer"
              >
                <option value="ATLETA">Atleta</option>
                <option value="ENTRENADOR">Entrenador</option>
              </select>
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Phone size={16} /> Teléfono (Opcional)
              </label>
              <input
                {...register("telefono")}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-100 focus:border-[#16A34A] transition-all"
                placeholder="+57 321..."
              />
            </div>
          </div>

          {/* Domicilio */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Home size={16} /> Domicilio (Opcional)
            </label>
            <input
              {...register("domicilio")}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-100 focus:border-[#16A34A] transition-all"
              placeholder="Calle 123 #45-67"
            />
          </div>

          {/* Contraseña */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Lock size={16} /> Contraseña
              </label>
              {strength && (
                <span className={`text-xs font-bold flex items-center gap-1 ${strength.color} bg-opacity-10 px-2 py-0.5 rounded`}>
                  {strength.icon} {strength.label}
                </span>
              )}
            </div>
            <input
              {...register("password")}
              type="password"
              className={`w-full px-4 py-2.5 rounded-xl border ${errors.password ? 'border-red-300' : 'border-gray-200'} outline-none focus:ring-2 focus:ring-green-100 focus:border-[#16A34A] transition-all`}
              placeholder="Contraseña (mín 8 chars, 1 letra, 1 número)"
            />
            {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold rounded-xl shadow-lg shadow-green-100 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Crear mi cuenta"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-[#16A34A] font-bold hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
