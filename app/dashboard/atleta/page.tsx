import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Activity, Gauge, MapPin, Calendar } from "lucide-react";
import MetricCard from "@/components/ui/MetricCard";
import ProgressChart from "@/components/dashboard/ProgressChart";
import { obtenerReporte } from "@/actions/reporteActions";

export default async function AtletaDashboard() {
  const session = await auth();

  // 1. Autorización: Redirigir si no es Atleta
  if (!session || (session.user as any).rol !== "ATLETA") {
    redirect("/login");
  }

  // 2. Cargar datos del reporte
  const reporte = await obtenerReporte(session.user?.id!);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mi Panel de Entrenamiento</h1>
        <p className="text-gray-500 mt-2">Bienvenido de nuevo, {session.user?.name}. Aquí está tu resumen de progreso.</p>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Distancia Total"
          value={reporte.totalKm}
          unit="KM"
          icon={MapPin}
          trend={{ value: 12, isUp: true }}
          description="Acumulado histórico"
        />
        <MetricCard
          label="Esfuerzo Promedio"
          value={reporte.promedioEsfuerzo}
          unit="/10"
          icon={Gauge}
          description="Nivel de intensidad medio"
        />
        <MetricCard
          label="Sesiones"
          value={reporte.sesiones.length}
          icon={Activity}
          description="Entrenamientos registrados"
        />
        <MetricCard
          label="Ritmo Promedio"
          value={reporte.promedioTiempo}
          unit="min"
          icon={Calendar}
          description="Tiempo medio por sesión"
        />
      </div>

      {/* Gráfico de Evolución */}
      <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
        <ProgressChart 
          data={reporte.evolucion} 
          title="Mi Rendimiento Semanal"
        />
      </div>

      {/* Sesiones Recientes */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Sesiones Recientes</h2>
          <button className="text-[#16A34A] text-sm font-bold hover:underline">Ver todas</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs text-gray-400 uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Distancia (km)</th>
                <th className="px-6 py-4">Tiempo (min)</th>
                <th className="px-6 py-4">Esfuerzo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {reporte.sesiones.slice(-5).reverse().map((sesion) => (
                <tr key={sesion.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {new Date(sesion.fecha).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{sesion.distancia} km</td>
                  <td className="px-6 py-4 text-gray-600">{sesion.tiempo} min</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700">
                      {sesion.nivelEsfuerzo}/10
                    </span>
                  </td>
                </tr>
              ))}
              {reporte.sesiones.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-400 italic">
                    No hay sesiones registradas aún.
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
