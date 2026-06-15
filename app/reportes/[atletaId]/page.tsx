import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { obtenerReporte } from "@/actions/reporteActions";
import prisma from "@/lib/prisma";
import { MapPin, Gauge, Clock, Calendar, BarChart3, ChevronLeft, User } from "lucide-react";
import MetricCard from "@/components/ui/MetricCard";
import ProgressChart from "@/components/dashboard/ProgressChart";
import Link from "next/link";

export default async function ReporteAtletaPage({
  params,
}: {
  params: { atletaId: string };
}) {
  const session = await auth();
  const { atletaId } = params;

  // 1. Autorización: Atleta ve el suyo, Entrenador ve a cualquiera (simplificado), Admin ve todo
  if (!session) redirect("/login");

  const me = session.user as any;
  if (me.rol === "ATLETA" && me.id !== atletaId) {
    redirect("/dashboard/atleta");
  }

  // 2. Cargar datos del atleta y reporte
  const atleta = await prisma.usuario.findUnique({
    where: { id: atletaId },
    select: { nombre: true, email: true, rol: true },
  });

  if (!atleta) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-400">Atleta no encontrado</h1>
        <Link href="/" className="text-[#16A34A] hover:underline mt-4 inline-block">Volver al inicio</Link>
      </div>
    );
  }

  const reporte = await obtenerReporte(atletaId);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-[#16A34A] text-white p-3 rounded-2xl shadow-lg shadow-green-100">
            <BarChart3 size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reporte de Progreso</h1>
            <div className="flex items-center gap-2 mt-1 text-gray-500">
              <User size={14} />
              <span className="text-sm font-medium">{atleta.nombre}</span>
              <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full font-bold uppercase tracking-widest">{atleta.rol}</span>
            </div>
          </div>
        </div>
        <Link 
          href={me.rol === "ATLETA" ? "/dashboard/atleta" : "/dashboard/entrenador"}
          className="flex items-center gap-2 text-sm font-bold text-[#16A34A] hover:text-[#15803d]"
        >
          <ChevronLeft size={16} /> Volver al Inicio
        </Link>
      </div>

      {/* Resumen de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Volumen Total"
          value={reporte.totalKm}
          unit="KM"
          icon={MapPin}
          description="Kilómetros acumulados"
        />
        <MetricCard
          label="Nivel de Esfuerzo"
          value={reporte.promedioEsfuerzo}
          unit="/10"
          icon={Gauge}
          description="Intensidad promedio"
        />
        <MetricCard
          label="Ritmo promedio"
          value={reporte.promedioTiempo}
          unit="min"
          icon={Clock}
          description="Tiempo medio por sesión"
        />
        <MetricCard
          label="Total Sesiones"
          value={reporte.sesiones.length}
          icon={Calendar}
          description="Días de entrenamiento"
        />
      </div>

      {/* Gráfico de Evolución Detallado */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProgressChart 
            data={reporte.evolucion} 
            title="Evolución de Rendimiento (Puntos de Sesión)"
          />
        </div>
        
        {/* Distribución de Esfuerzo (Simulada para diseño) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Frecuencia de Esfuerzo</h3>
          <div className="space-y-4">
            {[ {l: 'Baja (1-3)', v: 20}, {l: 'Media (4-7)', v: 65}, {l: 'Alta (8-10)', v: 15} ].map((item) => (
              <div key={item.l}>
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                  <span>{item.l}</span>
                  <span>{item.v}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#16A34A] h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${item.v}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-6 leading-relaxed">
            La mayoría de tus entrenamientos se encuentran en la zona de resistencia aeróbica (4-7). ¡Sigue así!
          </p>
        </div>
      </div>

      {/* Listado Completo de Sesiones */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Historial Detallado de Entrenamientos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs text-gray-400 uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Rutina</th>
                <th className="px-6 py-4">Kilómetros</th>
                <th className="px-6 py-4">Duración</th>
                <th className="px-6 py-4">Esfuerzo Peribido</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {reporte.sesiones.slice().reverse().map((sesion) => (
                <tr key={sesion.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {new Date(sesion.fecha).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    {(sesion as any).rutina ? (
                      <div>
                        <p className="font-bold text-gray-700">{(sesion as any).rutina.nombre}</p>
                        <p className="text-xs text-gray-400">{(sesion as any).rutina.estado}</p>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-gray-400 uppercase">Libre</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{sesion.distancia} km</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{sesion.tiempo} min</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#16A34A] h-full" 
                          style={{ width: `${sesion.nivelEsfuerzo * 10}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-gray-700">{sesion.nivelEsfuerzo}/10</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                      Completada
                    </span>
                  </td>
                </tr>
              ))}
              {reporte.sesiones.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic">
                    Sin entrenamientos que mostrar.
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
