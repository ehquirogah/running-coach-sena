"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity, Lock, FileText, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [documento, setDocumento] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        documento,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Documento o contraseña incorrectos");
      } else {
        toast.success("¡Bienvenido!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-green-50">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-green-50 text-[#16A34A] rounded-2xl mb-4">
            <Activity size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h1>
          <p className="text-sm text-gray-500 mt-2">Accede a tu cuenta de Running Coach</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText size={16} /> Documento
            </label>
            <input
              type="text"
              required
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#16A34A] focus:ring-2 focus:ring-green-100 outline-none transition-all"
              placeholder="Ej: 12345678"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Lock size={16} /> Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#16A34A] focus:ring-2 focus:ring-green-100 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold rounded-xl shadow-lg shadow-green-100 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Entrar"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="text-[#16A34A] font-bold hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
