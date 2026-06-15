import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Activity, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Calendar, 
  ArrowRight,
  ChevronRight,
  Zap,
  Medal
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();

  // 1. Redirección inteligente basada en el rol
  if (session) {
    const userRole = (session.user as any).rol;
    if (userRole === "ATLETA") redirect("/dashboard/atleta");
    if (userRole === "ENTRENADOR") redirect("/dashboard/entrenador");
    if (userRole === "ADMIN") redirect("/admin");
  }

  // 2. Landing Page para visitantes (No autenticados)
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-50">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-100 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4"></div>
        </div>

        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full text-emerald-700 text-xs font-bold tracking-widest uppercase animate-fade-in">
            <Zap className="w-4 h-4" />
            Transforma tu rendimiento hoy
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight max-w-4xl mx-auto">
            La plataforma <span className="text-emerald-600">definitiva</span> para corredores y entrenadores
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Planifica, registra y analiza cada kilómetro. Running Coach conecta a atletas con entrenadores expertos para alcanzar metas extraordinarias.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/registro">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-8 rounded-2xl text-lg font-black shadow-2xl shadow-emerald-100 transition-all active:scale-95 flex items-center gap-3">
                Empezar a Entrenar
                <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 border border-slate-200 px-10 py-8 rounded-2xl text-lg font-bold transition-all">
                Acceso Miembros
              </Button>
            </Link>
          </div>

          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
             <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-slate-900">10k+</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Kilómetros Corridos</span>
             </div>
             <div className="flex flex-col items-center gap-1 border-x border-slate-100">
                <span className="text-2xl font-bold text-slate-900">500+</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Atletas Activos</span>
             </div>
             <div className="flex flex-col items-center gap-1 border-r border-slate-100">
                <span className="text-2xl font-bold text-slate-900">50+</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Coaches Expertos</span>
             </div>
             <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-slate-900">98%</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Metas Alcanzadas</span>
             </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Logotypes Placeholder */}
      <section className="bg-slate-50/50 py-12 border-y border-slate-100">
        <div className="container mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
           <span className="text-xl font-black italic tracking-tighter">GARMIN.</span>
           <span className="text-xl font-black italic tracking-tighter">STRAVA</span>
           <span className="text-xl font-black italic tracking-tighter">SUUNTO</span>
           <span className="text-xl font-black italic tracking-tighter">COROS</span>
           <span className="text-xl font-black italic tracking-tighter">POLAR</span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em]">Características</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900">Diseñado para el alto rendimiento</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50 transition-all group">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Planes Personalizados</h4>
              <p className="text-slate-500 leading-relaxed">
                Planes adaptados a tu nivel actual y tus metas, creados por tu entrenador con objetivos semanales específicos.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50 transition-all group">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all mb-6">
                <Activity className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Seguimiento Diario</h4>
              <p className="text-slate-500 leading-relaxed">
                Registra cada entrenamiento, distancia, tiempo y nivel de esfuerzo percibido para un control total de tu fatiga.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50 transition-all group">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all mb-6">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Análisis de Progreso</h4>
              <p className="text-slate-500 leading-relaxed">
                Visualiza tu evolución con reportes detallados y gráficas que muestran el cumplimiento de tu plan semanal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Athlete vs Coach Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Una herramienta, <br />
              <span className="text-emerald-400">dos perspectivas</span> profesionales.
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <Medal className="w-6 h-6 text-emerald-400" />
                </div>
                <div id="atleta">
                  <h5 className="font-bold text-lg mb-1">Para Corredores</h5>
                  <p className="text-slate-400 text-sm">Recibe orientación experta, mantén la disciplina y observa cómo tus marcas personales mejoran mes a mes.</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div id="coach">
                  <h5 className="font-bold text-lg mb-1">Para Entrenadores</h5>
                  <p className="text-slate-400 text-sm">Gestiona a todos tus atletas en un solo lugar, diseña planes escalables y ajusta cargas basadas en datos reales.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-emerald-600 aspect-square rounded-[40px] rotate-6 absolute inset-0 opacity-20 blur-3xl"></div>
            <div className="bg-emerald-900/50 p-8 rounded-[40px] border border-white/10 backdrop-blur-sm relative z-10 shadow-2xl">
               <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Vista de Reporte</span>
                  <div className="flex gap-1">
                     <div className="w-2 h-2 rounded-full bg-red-500"></div>
                     <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="h-8 bg-white/10 rounded-lg w-3/4"></div>
                  <div className="h-32 bg-white/5 rounded-xl border border-white/5 flex items-end gap-2 p-4">
                     <div className="h-1/3 w-full bg-emerald-500/50 rounded-sm"></div>
                     <div className="h-2/3 w-full bg-emerald-500/50 rounded-sm"></div>
                     <div className="h-1/2 w-full bg-emerald-500/50 rounded-sm"></div>
                     <div className="h-full w-full bg-emerald-500 rounded-sm"></div>
                     <div className="h-4/5 w-full bg-emerald-500 rounded-sm"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                     <div className="h-16 bg-white/10 rounded-xl"></div>
                     <div className="h-16 bg-white/10 rounded-xl"></div>
                     <div className="h-16 bg-white/10 rounded-xl"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black">¿Listo para cruzar la meta?</h2>
          <p className="text-xl text-emerald-100 max-w-xl mx-auto">Únete a la comunidad de Running Coach y lleva tus límites al siguiente nivel.</p>
          <Link href="/registro" className="inline-block">
            <Button className="bg-white text-emerald-600 hover:bg-emerald-50 px-12 py-8 rounded-2xl text-xl font-black transition-all shadow-2xl shadow-emerald-900/20 flex items-center gap-4">
              Registrarme Ahora
              <ArrowRight className="w-6 h-6" />
            </Button>
          </Link>
          <p className="text-emerald-200 text-sm font-medium">Registro gratuito para atletas • Sin compromisos</p>
        </div>
      </section>
    </div>
  );
}
