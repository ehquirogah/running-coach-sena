import { obtenerAtletasAsignados } from "@/actions/planActions";
import Link from "next/link";
import { Users, User, ArrowRight, Calendar, Activity } from "lucide-react";
import MetricCard from "@/components/ui/MetricCard";
import { Button } from "@/components/ui/button";

export default async function AtletasPage() {
  const atletas = await obtenerAtletasAsignados();

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Mis Atletas</h1>
          <p className="text-slate-500 mt-1">Monitorea el progreso de los corredores bajo tu supervisión.</p>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
          <span className="text-emerald-700 font-bold text-lg">{atletas.length}</span>
          <span className="text-emerald-600 text-sm ml-2">Atletas activos</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {atletas.length === 0 ? (
          <div className="col-span-full h-64 flex flex-col items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <Users className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-700">No tienes atletas asignados</h3>
            <p className="text-slate-500 mb-6 text-center max-w-xs">Asigna un plan de entrenamiento a un atleta para que aparezca en esta lista.</p>
            <Link href="/planes/nuevo" className="text-emerald-600 font-bold hover:underline">
              Ir a crear plan
            </Link>
          </div>
        ) : (
          atletas.map((atleta) => {
            const planActivo = atleta.planesComoAtleta[0];
            const ultimaSesion = atleta.sesiones[0];

            return (
              <div key={atleta.id} className="group bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <User className="text-slate-500 group-hover:text-emerald-600 w-6 h-6 transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">CC: {atleta.documento}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">{atleta.nombre}</h3>
                  <p className="text-slate-400 text-xs mb-6 truncate">{atleta.email}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      <span className="text-slate-600 font-medium">Plan:</span>
                      <span className="text-slate-900 truncate">{planActivo?.objetivo || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="w-4 h-4 text-emerald-500" />
                      <span className="text-slate-600 font-medium">Últ. Sesión:</span>
                      <span className="text-slate-900">
                        {ultimaSesion ? new Date(ultimaSesion.fecha).toLocaleDateString() : "Ninguna"}
                      </span>
                    </div>
                  </div>

                  <Link href={`/atletas/${atleta.id}`}>
                    <Button className="w-full bg-slate-50 hover:bg-emerald-600 text-slate-600 hover:text-white border border-slate-100 hover:border-emerald-600 transition-all font-bold flex items-center justify-center gap-2 rounded-xl group/btn h-11">
                      Ver Perfil
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
