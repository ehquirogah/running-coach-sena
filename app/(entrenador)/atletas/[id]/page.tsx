import { obtenerDetalleAtleta } from "@/actions/planActions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  FileText, 
  Clock, 
  History, 
  TrendingUp, 
  ChevronRight,
  ExternalLink,
  ClipboardCheck,
  MessageSquare
} from "lucide-react";
import MetricCard from "@/components/ui/MetricCard";
import RutinaForm from "@/components/rutinas/RutinaForm";
import FeedbackRutinaForm from "@/components/rutinas/FeedbackRutinaForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DetalleAtletaPage({ params }: Props) {
  const { id } = await params;
  const atleta = await obtenerDetalleAtleta(id);

  if (!atleta) {
    notFound();
  }

  const planActivo = atleta.planesComoAtleta.find((p: any) => p.activo);
  const planesAnteriores = atleta.planesComoAtleta.filter((p: any) => !p.activo);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Link href="/atletas" className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver a la lista de atletas
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar: Información de Perfil */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
            <div className="px-6 pb-6">
              <div className="relative -mt-12 mb-4">
                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md mx-auto">
                  <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <User className="w-12 h-12" />
                  </div>
                </div>
              </div>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">{atleta.nombre}</h2>
                <p className="text-sm text-slate-500">Atleta Registrado</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 truncate">{atleta.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">ID: {atleta.documento}</span>
                </div>
                {atleta.telefono && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{atleta.telefono}</span>
                  </div>
                )}
                {atleta.domicilio && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{atleta.domicilio}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Link href={`/reportes/${atleta.id}`} className="block">
            <Button className="w-full bg-slate-900 hover:bg-black text-white py-6 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Ver Reportes Completos
            </Button>
          </Link>
        </div>

        {/* Contenido Principal */}
        <div className="lg:col-span-3 space-y-8">
          {/* Plan Actual */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                Plan Activo
              </h3>
              {planActivo && (
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded">VIGENTE</span>
              )}
            </div>
            <div className="p-6">
              {planActivo ? (
                <div className="space-y-6">
                  <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100">
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{planActivo.objetivo}</h4>
                    <p className="text-slate-500 text-sm">Iniciado el {new Date(planActivo.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Duración</p>
                      <p className="text-lg font-bold text-slate-900">{planActivo.duracionSemanas} semanas</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Volumen</p>
                      <p className="text-lg font-bold text-slate-900">{planActivo.volumenSemanal} km/sem</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                        <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 font-bold p-0">Editar Plan</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 italic">
                  No hay un plan de entrenamiento activo para este atleta.
                </div>
              )}
            </div>
          </div>

          {/* Rutinas del Plan */}
          {planActivo && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-emerald-500" />
                  Rutinas y retroalimentacion
                </h3>
                <p className="text-sm text-slate-500 mt-1">Asigna entrenamientos concretos y revisa los resultados reportados.</p>
              </div>
              <div className="p-6 space-y-8">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/40 p-5">
                  <h4 className="font-bold text-slate-900 mb-4">Nueva rutina para este plan</h4>
                  <RutinaForm planId={planActivo.id} />
                </div>

                <div className="space-y-4">
                  {planActivo.rutinas && planActivo.rutinas.length > 0 ? (
                    planActivo.rutinas.map((rutina: any) => (
                      <div key={rutina.id} className="rounded-2xl border border-slate-100 p-5">
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
                            <h4 className="text-lg font-bold text-slate-900">{rutina.nombre}</h4>
                            <p className="text-sm text-slate-600 mt-1">{rutina.descripcion}</p>
                            <p className="text-xs text-slate-500 mt-3">
                              {rutina.tipoEntrenamiento} - {rutina.distanciaObjetivo} km - {rutina.tiempoObjetivo} min - intensidad {rutina.intensidadEsperada}/10
                            </p>
                          </div>
                          {rutina.sesion && (
                            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 min-w-56">
                              <p className="font-bold text-slate-900">Resultado</p>
                              <p>{rutina.sesion.distancia} km en {rutina.sesion.tiempo} min</p>
                              <p>Esfuerzo: {rutina.sesion.nivelEsfuerzo}/10</p>
                              {rutina.cumplimiento !== null && <p>Cumplimiento: {rutina.cumplimiento}%</p>}
                            </div>
                          )}
                        </div>

                        {rutina.comentariosAtleta && (
                          <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-4">
                            <h5 className="text-sm font-bold text-amber-900">Retroalimentacion del atleta</h5>
                            <p className="text-sm text-amber-800 mt-2">{rutina.resultadoPercibido}</p>
                            <p className="text-sm text-amber-700 mt-2">{rutina.comentariosAtleta}</p>
                            {rutina.molestiasFisicas && <p className="text-xs text-amber-700 mt-2">Molestias: {rutina.molestiasFisicas}</p>}
                          </div>
                        )}

                        {rutina.feedbackEntrenador && (
                          <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50 p-4">
                            <h5 className="text-sm font-bold text-sky-900 flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              Feedback enviado
                            </h5>
                            <p className="text-sm text-sky-800 mt-2">{rutina.feedbackEntrenador}</p>
                            <p className="text-sm text-sky-700 mt-2 font-medium">{rutina.recomendacionEntrenador}</p>
                            <p className="text-xs text-sky-600 mt-2 uppercase font-black">{rutina.decisionAjuste}</p>
                          </div>
                        )}

                        <FeedbackRutinaForm rutina={rutina} />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-400 italic">
                      Aun no has asignado rutinas a este plan.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Sesiones Recientes */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-500" />
                Historial de Sesiones
              </h3>
              <Link href={`/reportes/${atleta.id}`} className="text-emerald-600 text-sm font-bold flex items-center hover:underline">
                Ver todo <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-6">
              {atleta.sesiones && atleta.sesiones.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left py-2 border-b border-slate-50">
                        <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Fecha</th>
                        <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">KM</th>
                        <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Tiempo</th>
                        <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Esfuerzo</th>
                        <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Ritmo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {atleta.sesiones.map((sesion: any) => {
                        const ritmo = (sesion.tiempo / sesion.distancia).toFixed(2);
                        return (
                          <tr key={sesion.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 text-sm font-medium text-slate-900">
                              {new Date(sesion.fecha).toLocaleDateString()}
                            </td>
                            <td className="py-4 text-sm text-center font-bold text-emerald-600">
                              {sesion.distancia}
                            </td>
                            <td className="py-4 text-sm text-center text-slate-600">
                              {sesion.tiempo} min
                            </td>
                            <td className="py-4 text-sm text-center">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                sesion.nivelEsfuerzo > 8 ? "bg-rose-100 text-rose-600" :
                                sesion.nivelEsfuerzo > 5 ? "bg-amber-100 text-amber-600" :
                                "bg-emerald-100 text-emerald-600"
                              }`}>
                                {sesion.nivelEsfuerzo}/10
                              </span>
                            </td>
                            <td className="py-4 text-sm text-right text-slate-400 font-mono">
                              {ritmo} min/km
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 italic">
                  Este atleta aún no ha registrado ninguna sesión.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
