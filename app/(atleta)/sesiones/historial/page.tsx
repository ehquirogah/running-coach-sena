import { obtenerHistorialSesiones, obtenerResumenSesiones } from "@/actions/sesionActions";
import SesionRow from "@/components/sesiones/SesionRow";
import MetricCard from "@/components/ui/MetricCard";
import { Activity, History, ChevronLeft, ChevronRight, TrendingUp, Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function HistorialSesionesPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 10;

  const [{ sesiones, total }, resumen] = await Promise.all([
    obtenerHistorialSesiones(currentPage, limit),
    obtenerResumenSesiones(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Atleta Digital</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <History className="w-8 h-8 text-emerald-600" />
            Historial de Carreras
          </h1>
          <p className="text-slate-500 mt-1">Explora cada zancada y monitorea tu evolución constante.</p>
        </div>
        
        <Link href="/sesiones/nueva">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-2xl font-bold shadow-xl shadow-emerald-100 active:scale-95 transition-all">
            Nueva Sesión
          </Button>
        </Link>
      </div>

      {/* Resumen de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          label="Total Sesiones"
          value={resumen.totalSesiones.toString()}
          icon={Activity}
          description="Entrenamientos registrados"
        />
        <MetricCard
          label="Kilómetros Totales"
          value={`${resumen.totalKm.toFixed(1)} km`}
          icon={TrendingUp}
          description="Distancia acumulada"
        />
        <MetricCard
          label="Promedio Esfuerzo"
          value={`${resumen.promedioEsfuerzo.toFixed(1)}/10`}
          icon={Filter}
          description="Intensidad media"
        />
      </div>

      {/* Tabla de Historial */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            Listado Detallado
          </h2>
          <span className="text-xs font-bold text-slate-400">{total} registros encontrados</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">Distancia</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">Tiempo</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">Esfuerzo</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right">Ritmo Medio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {sesiones.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-400 italic">
                    Aún no has registrado sesiones de entrenamiento.
                  </td>
                </tr>
              ) : (
                sesiones.map((sesion) => (
                  <SesionRow key={sesion.id} sesion={sesion} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="p-6 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">
              Página {currentPage} de {totalPages}
            </p>
            <div className="flex gap-2">
              <Link 
                href={`/sesiones/historial?page=${currentPage - 1}`}
                className={`p-2 rounded-xl border transition-all ${
                  currentPage <= 1 
                    ? "pointer-events-none opacity-30 border-slate-200" 
                    : "bg-white hover:bg-emerald-50 border-slate-200 hover:border-emerald-200 text-slate-600 hover:text-emerald-600"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <Link 
                href={`/sesiones/historial?page=${currentPage + 1}`}
                className={`p-2 rounded-xl border transition-all ${
                  currentPage >= totalPages 
                    ? "pointer-events-none opacity-30 border-slate-200" 
                    : "bg-white hover:bg-emerald-50 border-slate-200 hover:border-emerald-200 text-slate-600 hover:text-emerald-600"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
