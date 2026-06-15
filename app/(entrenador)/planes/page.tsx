import { obtenerPlanesDeEntrenador } from "@/actions/planActions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, List } from "lucide-react";

export default async function PlanesPage() {
  const planes = await obtenerPlanesDeEntrenador();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Planes de Entrenamiento</h1>
          <p className="text-slate-500 mt-1">Gestiona los planes activos y el historial de tus atletas.</p>
        </div>
        <Link href="/planes/nuevo">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 px-6 py-6 rounded-lg text-lg transition-all shadow-md">
            <Plus className="w-5 h-5" />
            Crear nuevo plan
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {planes.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <List className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-700">No hay planes registrados</h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-2">
              Comienza creando un plan personalizado para uno de tus atletas.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden bg-white rounded-xl shadow-sm border border-slate-100">
            <table className="w-full text-left truncate">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Atleta</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Objetivo</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Duración</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Volumen</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Estado</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Creado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {planes.map((plan) => (
                  <tr key={plan.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{plan.atleta.nombre}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600 line-clamp-1 max-w-xs">{plan.objetivo}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-slate-700">{plan.duracionSemanas} semanas</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-slate-700 font-medium">{plan.volumenSemanal} km/sem</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block border ${
                        plan.activo 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}>
                        {plan.activo ? "ACTIVO" : "INACTIVO"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-500 text-sm italic">
                      {new Date(plan.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
