import { obtenerPlanActivoAtleta } from "@/actions/planActions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Target, TrendingUp, Clock, History, PlusCircle, ClipboardCheck, MessageSquare } from "lucide-react";
import MetricCard from "@/components/ui/MetricCard";

export default async function MiPlanPage() {
  const plan = await obtenerPlanActivoAtleta();

  if (!plan) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-slate-50 p-12 rounded-3xl border-2 border-dashed border-slate-200 text-slate-500 max-w-md">
          <Target className="w-16 h-16 mx-auto mb-6 text-slate-300" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No tienes un plan activo</h2>
          <p className="mb-8">Para maximizar tu rendimiento necesitas un plan personalizado. Contacta a tu entrenador para que te asigne uno.</p>
          <Button className="bg-emerald-600 hover:bg-emerald-700 w-full rounded-xl py-6 h-auto font-bold shadow-lg">
            Ver Entrenadores Disponibles
          </Button>
        </div>
      </div>
    );
  }

  // Calcular semana actual
  const hoy = new Date();
  const inicio = new Date(plan.createdAt);
  const diffTiempo = Math.abs(hoy.getTime() - inicio.getTime());
  const diffDias = Math.floor(diffTiempo / (1000 * 60 * 60 * 24));
  const semanaActual = Math.floor(diffDias / 7) + 1;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">PLAN ACTIVO</span>
            <span className="text-slate-400 text-sm">Iniciativa el {new Date(plan.createdAt).toLocaleDateString()}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">Mi Plan de Entrenamiento</h1>
          <p className="text-slate-500 text-lg">Entrenador: <span className="text-emerald-600 font-semibold">{plan.entrenador.nombre}</span></p>
        </div>
        
        <Link href="/sesiones/nueva">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 px-8 py-7 rounded-xl text-lg font-bold transition-all shadow-xl shadow-emerald-100 active:scale-95">
            <PlusCircle className="w-6 h-6" />
            Registrar sesión de hoy
          </Button>
        </Link>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Objetivo Principal"
          value={plan.objetivo}
          icon={Target}
          description="Meta establecida"
        />
        <MetricCard
          label="Progreso Temporal"
          value={`Semana ${semanaActual} de ${plan.duracionSemanas}`}
          icon={Calendar}
          description={`${plan.duracionSemanas - semanaActual} semanas restantes`}
        />
        <MetricCard
          label="Volumen Semanal"
          value={`${plan.volumenSemanal} km`}
          icon={TrendingUp}
          description="Kilómetros objetivo"
        />
        <MetricCard
          label="Estado"
          value={plan.activo ? "Activo" : "Finalizado"}
          icon={Clock}
          description="Estado del plan"
        />
      </div>

      {/* Detalles y Sesiones Recientes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-emerald-600" />
              Rutinas asignadas
            </h2>

            {(plan as any).rutinas && (plan as any).rutinas.length > 0 ? (
              <div className="space-y-4">
                {(plan as any).rutinas.map((rutina: any) => (
                  <div key={rutina.id} className="rounded-xl border border-slate-100 bg-slate-50/40 p-5">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-xs font-bold uppercase text-slate-400">
                            {new Date(rutina.fechaProgramada).toLocaleDateString()}
                          </span>
                          <span className={`rounded-full px-2 py-1 text-[10px] font-black ${
                            rutina.estado === "REVISADA" ? "bg-sky-100 text-sky-700" :
                            rutina.estado === "COMPLETADA" ? "bg-amber-100 text-amber-700" :
                            rutina.estado === "CANCELADA" ? "bg-slate-200 text-slate-600" :
                            "bg-emerald-100 text-emerald-700"
                          }`}>
                            {rutina.estado}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{rutina.nombre}</h3>
                        <p className="text-sm text-slate-600 mt-1">{rutina.descripcion}</p>
                        <p className="text-xs text-slate-500 mt-3">
                          {rutina.tipoEntrenamiento} - {rutina.distanciaObjetivo} km - {rutina.tiempoObjetivo} min - intensidad {rutina.intensidadEsperada}/10
                        </p>
                        {rutina.observacionesEntrenador && (
                          <p className="mt-3 rounded-lg bg-white p-3 text-sm text-slate-600 border border-slate-100">
                            {rutina.observacionesEntrenador}
                          </p>
                        )}
                      </div>
                      {rutina.estado === "PENDIENTE" || rutina.estado === "COMPLETADA" ? (
                        <Link href={`/rutinas/${rutina.id}/resultado`} className="shrink-0">
                          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold">
                            {rutina.estado === "COMPLETADA" ? "Editar resultado" : "Registrar resultado"}
                          </Button>
                        </Link>
                      ) : null}
                    </div>

                    {rutina.feedbackEntrenador && (
                      <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50 p-4">
                        <h4 className="text-sm font-bold text-sky-900 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Retroalimentacion del entrenador
                        </h4>
                        <p className="text-sm text-sky-800 mt-2">{rutina.feedbackEntrenador}</p>
                        <p className="text-sm text-sky-700 mt-2 font-medium">{rutina.recomendacionEntrenador}</p>
                        <p className="text-xs text-sky-600 mt-2 uppercase font-black">{rutina.decisionAjuste}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <ClipboardCheck className="w-12 h-12 mb-2 opacity-20" />
                <p>Aun no tienes rutinas asignadas en este plan.</p>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[300px]">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-600" />
              Últimas Sesiones
            </h2>
            
            {(plan as any).sesiones && (plan as any).sesiones.length > 0 ? (
              <div className="space-y-4">
                {(plan as any).sesiones.map((sesion: any) => (
                  <div key={sesion.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 bg-slate-50/30 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-sm shadow-emerald-200">
                        {sesion.distancia}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{new Date(sesion.fecha).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                        <p className="text-sm text-slate-500">{sesion.tiempo} min • Esfuerzo: {sesion.nivelEsfuerzo}/10</p>
                      </div>
                    </div>
                    <div className="text-emerald-600 text-sm font-bold bg-white px-3 py-1 rounded-full border border-slate-100">
                      KM
                    </div>
                  </div>
                ))}
                <Link href="/sesiones/historial" className="block text-center text-sm font-bold text-emerald-600 hover:text-emerald-700 mt-6 bg-emerald-50 py-3 rounded-lg border border-emerald-100 transition-colors">
                  Ver todo el historial
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                <TrendingUp className="w-12 h-12 mb-2 opacity-20" />
                <p>Aún no has registrado sesiones para este plan.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 rounded-2xl shadow-lg shadow-emerald-100 text-white">
            <h3 className="text-xl font-bold mb-4">Nota del Entrenador</h3>
            <p className="text-emerald-50 leading-relaxed mb-6 italic">
              "Mantén la consistencia. El volumen semanal de {plan.volumenSemanal} km es clave para llegar bien a la semana {plan.duracionSemanas}. No olvides calentar siempre."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-400/30 border border-emerald-300 flex items-center justify-center font-bold">
                {plan.entrenador.nombre[0]}
              </div>
              <div>
                <p className="font-bold text-sm bg-blue-10">{plan.entrenador.nombre}</p>
                <p className="text-emerald-300 text-xs">Coach Certificado</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Consejo de hoy</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              La hidratación adecuada durante el entrenamiento puede mejorar tu rendimiento hasta en un 15%. Intenta beber 150ml cada 20 minutos de carrera.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
