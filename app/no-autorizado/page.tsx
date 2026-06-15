import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function NoAutorizadoPage() {
  const session = await auth();
  const userRole = (session?.user as any)?.rol;

  // Determinar a dónde redirigir según el rol
  let backUrl = "/login";
  if (userRole === "ATLETA") backUrl = "/dashboard/atleta";
  if (userRole === "ENTRENADOR") backUrl = "/dashboard/entrenador";
  if (userRole === "ADMIN") backUrl = "/admin";

  return (
    <div className="container mx-auto px-4 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="bg-white p-12 rounded-[40px] shadow-2xl shadow-rose-100 border border-slate-100 max-w-lg w-full space-y-8 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-10"></div>
        
        <div className="w-24 h-24 bg-rose-100 rounded-3xl flex items-center justify-center mx-auto rotate-12 animate-bounce">
          <ShieldAlert className="w-12 h-12 text-rose-600 -rotate-12" />
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Acceso Denegado</h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Lo sentimos, pero no tienes los permisos necesarios para ver esta sección.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <Link href={backUrl} className="block w-full">
            <Button className="w-full bg-slate-900 hover:bg-black text-white py-8 rounded-2xl font-black text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3">
              <Home className="w-5 h-5" />
              Volver a mi Panel
            </Button>
          </Link>
          
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-slate-600 font-bold transition-colors gap-2">
            <ArrowLeft className="w-4 h-4" />
            Ir a la página principal
          </Link>
        </div>

        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest pt-8 border-t border-slate-50">
          Error 403 • Running Coach Security
        </p>
      </div>
    </div>
  );
}
