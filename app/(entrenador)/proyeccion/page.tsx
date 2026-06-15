import { obtenerProyeccionEntrenador } from "@/actions/rutinaActions";
import { Button } from "@/components/ui/button";
import { CalendarClock, ClipboardList, Gauge, History, Plus, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function ProyeccionEntrenadorPage() {
  const proyecciones = await obtenerProyeccionEntrenador();

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600">
            <CalendarClock className="h-4 w-4" />
            Proyeccion deportiva
          </div>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Actividades y planes proyectados</h1>
          <p className="mt-1 text-slate-500">Prioriza proximas rutinas segun volumen semanal, esfuerzo y resultados pendientes de revision.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/historial">
            <Button variant="outline" className="rounded-xl font-bold">
              <History className="mr-2 h-4 w-4" />
              Historial
            </Button>
          </Link>
          <Link href="/planes/nuevo">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo plan
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {proyecciones.map((item) => (
          <div key={item.plan.id} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link href={`/atletas/${item.atleta.id}`} className="text-xl font-extrabold text-slate-900 hover:text-emerald-700">
                  {item.atleta.nombre}
                </Link>
                <p className="text-sm text-slate-500">{item.plan.objetivo}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                Semana {item.semanaActual}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <MiniMetric icon={TrendingUp} label="Volumen" value={`${item.kmSemana}/${item.plan.volumenSemanal} km`} />
              <MiniMetric icon={Gauge} label="Cumplimiento" value={`${item.cumplimientoVolumen}%`} />
              <MiniMetric icon={ClipboardList} label="Pendientes" value={item.rutinasPendientes.toString()} />
              <MiniMetric icon={CalendarClock} label="Restan" value={`${item.semanasRestantes} sem`} />
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Siguiente actividad</p>
              {item.siguienteRutina ? (
                <div className="mt-2">
                  <p className="font-bold text-slate-900">{item.siguienteRutina.nombre}</p>
                  <p className="text-sm text-slate-600">
                    {new Date(item.siguienteRutina.fechaProgramada).toLocaleDateString()} - {item.siguienteRutina.distanciaObjetivo} km - intensidad {item.siguienteRutina.intensidadEsperada}/10
                  </p>
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-500">No hay rutinas futuras. Conviene proyectar nuevas actividades.</p>
              )}
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-emerald-700">Recomendacion para el entrenador</p>
              <p className="mt-2 text-sm font-semibold text-emerald-900">{item.recomendacion}</p>
              {item.rutinasPorRevisar > 0 && (
                <p className="mt-2 text-xs text-emerald-700">{item.rutinasPorRevisar} rutina(s) completada(s) esperan retroalimentacion.</p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Link href={`/atletas/${item.atleta.id}`}>
                <Button className="rounded-xl bg-slate-900 text-white hover:bg-black font-bold">
                  Gestionar rutinas
                </Button>
              </Link>
              <Link href={`/reportes/${item.atleta.id}`}>
                <Button variant="outline" className="rounded-xl font-bold">
                  Ver reporte
                </Button>
              </Link>
            </div>
          </div>
        ))}

        {proyecciones.length === 0 && (
          <div className="lg:col-span-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center text-slate-500">
            <CalendarClock className="mx-auto mb-4 h-12 w-12 text-slate-300" />
            <h2 className="text-xl font-bold text-slate-800">No hay planes activos para proyectar</h2>
            <p className="mt-2">Crea un plan activo para un atleta y luego asigna rutinas de entrenamiento.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MiniMetric({ icon: Icon, label, value }: { icon: typeof TrendingUp; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3">
      <Icon className="h-4 w-4 text-emerald-600" />
      <p className="mt-2 text-[10px] font-black uppercase text-slate-400">{label}</p>
      <p className="font-extrabold text-slate-900">{value}</p>
    </div>
  );
}
