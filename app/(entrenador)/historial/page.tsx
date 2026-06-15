import { obtenerHistorialEntrenamientosEntrenador } from "@/actions/rutinaActions";
import { Button } from "@/components/ui/button";
import { Activity, ArrowRight, ClipboardCheck, Gauge, History, MessageSquare, Timer } from "lucide-react";
import Link from "next/link";

export default async function HistorialEntrenadorPage() {
  const sesiones = await obtenerHistorialEntrenamientosEntrenador();

  const totalKm = sesiones.reduce((total, sesion) => total + sesion.distancia, 0);
  const promedioEsfuerzo = sesiones.length
    ? sesiones.reduce((total, sesion) => total + sesion.nivelEsfuerzo, 0) / sesiones.length
    : 0;
  const rutinasRevisadas = sesiones.filter((sesion) => sesion.rutina?.estado === "REVISADA").length;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600">
            <History className="h-4 w-4" />
            Historial del entrenador
          </div>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Entrenamientos realizados</h1>
          <p className="mt-1 text-slate-500">Consulta sesiones libres, rutinas completadas y retroalimentacion registrada.</p>
        </div>
        <Link href="/proyeccion">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold">
            Ver proyeccion <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResumenCard icon={Activity} label="Sesiones registradas" value={sesiones.length.toString()} />
        <ResumenCard icon={Timer} label="Kilometros acumulados" value={`${totalKm.toFixed(1)} km`} />
        <ResumenCard icon={Gauge} label="Esfuerzo promedio" value={`${promedioEsfuerzo.toFixed(1)}/10`} />
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Detalle historico</h2>
          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-700">
            {rutinasRevisadas} rutinas revisadas
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-black uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Atleta</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Rutina</th>
                <th className="px-6 py-4 text-center">Resultado</th>
                <th className="px-6 py-4 text-center">Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {sesiones.map((sesion) => (
                <tr key={sesion.id} className="hover:bg-slate-50/60">
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {new Date(sesion.fecha).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/atletas/${sesion.atleta.id}`} className="font-bold text-emerald-700 hover:underline">
                      {sesion.atleta.nombre}
                    </Link>
                    <p className="text-xs text-slate-400">{sesion.atleta.email}</p>
                  </td>
                  <td className="px-6 py-4 max-w-xs text-slate-600">
                    <p className="line-clamp-1">{sesion.plan.objetivo}</p>
                  </td>
                  <td className="px-6 py-4">
                    {sesion.rutina ? (
                      <div>
                        <p className="font-bold text-slate-800">{sesion.rutina.nombre}</p>
                        <p className="text-xs text-slate-400">{sesion.rutina.estado}</p>
                      </div>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500">Libre</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-slate-900">{sesion.distancia} km</span>
                    <p className="text-xs text-slate-500">{sesion.tiempo} min - esfuerzo {sesion.nivelEsfuerzo}/10</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {sesion.rutina?.feedbackEntrenador ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-700">
                        <MessageSquare className="h-3 w-3" />
                        Revisado
                      </span>
                    ) : sesion.rutina ? (
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">
                        Pendiente
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-400">No aplica</span>
                    )}
                  </td>
                </tr>
              ))}
              {sesiones.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                    <ClipboardCheck className="mx-auto mb-3 h-10 w-10 opacity-30" />
                    Aun no hay entrenamientos registrados por tus atletas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ResumenCard({ icon: Icon, label, value }: { icon: typeof Activity; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <Icon className="h-6 w-6 text-emerald-600" />
      <p className="mt-4 text-xs font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-slate-900">{value}</p>
    </div>
  );
}
