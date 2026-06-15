import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, ClipboardList, TrendingUp, Plus } from "lucide-react";
import MetricCard from "@/components/ui/MetricCard";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function EntrenadorDashboard() {
  const session = await auth();

  // 1. Autorización
  if (!session || (session.user as any).rol !== "ENTRENADOR") {
    redirect("/login");
  }

  // 2. Cargar atletas y planes activos vinculados a este entrenador
  const totalAtletas = await prisma.usuario.count({ where: { rol: "ATLETA", activo: true } });
  
  const misPlanesActivos = await prisma.planEntrenamiento.findMany({
    where: { 
      entrenadorId: session.user?.id!,
      activo: true 
    },
    include: {
      atleta: true,
      sesiones: {
        orderBy: { fecha: "desc" },
        take: 1
      }
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Entrenador</h1>
          <p className="text-gray-500 mt-2">Gestiona el progreso de tus atletas y asigna nuevos retos.</p>
        </div>
        <Link 
          href="/planes/nuevo"
          className="flex items-center gap-2 px-6 py-3 bg-[#16A34A] text-white font-bold rounded-xl hover:bg-[#15803d] transition-all shadow-lg shadow-green-100 w-fit"
        >
          <Plus size={20} /> Asignar Nuevo Plan
        </Link>
      </div>

      {/* Resumen Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/historial" className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:border-emerald-200 transition-colors">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-600">Consulta</p>
          <h2 className="mt-2 text-lg font-bold text-gray-900">Historial de entrenamientos</h2>
          <p className="mt-1 text-sm text-gray-500">Revisa sesiones realizadas, rutinas completadas y feedback pendiente.</p>
        </Link>
        <Link href="/proyeccion" className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:border-emerald-200 transition-colors">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-600">Planeacion</p>
          <h2 className="mt-2 text-lg font-bold text-gray-900">Proyeccion de actividades</h2>
          <p className="mt-1 text-sm text-gray-500">Identifica proximas rutinas y decisiones para ajustar el plan deportivo.</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          label="Total Atletas"
          value={totalAtletas}
          icon={Users}
          description="Atletas registrados en el sistema"
        />
        <MetricCard
          label="Planes Activos"
          value={misPlanesActivos.length}
          icon={ClipboardList}
          description="Bajo tu seguimiento"
        />
        <MetricCard
          label="Cumplimiento"
          value="85"
          unit="%"
          icon={TrendingUp}
          trend={{ value: 5, isUp: true }}
          description="Promedio de sesiones completadas"
        />
      </div>

      {/* Tabla de mis Atletas con Planes Activos */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Seguimiento de Planes Activos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs text-gray-400 uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Atleta</th>
                <th className="px-6 py-4">Objetivo</th>
                <th className="px-6 py-4">Última Actividad</th>
                <th className="px-6 py-4">Volumen Semanal</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {misPlanesActivos.map((plan: any) => (
                <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{plan.atleta.nombre}</span>
                      <span className="text-xs text-gray-400">{plan.atleta.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{plan.objetivo}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {plan.sesiones[0] 
                      ? new Date(plan.sesiones[0].fecha).toLocaleDateString()
                      : "Sin actividad todavía"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#16A34A]">{plan.volumenSemanal} km</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/atletas/${plan.atleta.id}`} className="text-[#16A34A] font-bold hover:underline">
                      Ver Detalle
                    </Link>
                  </td>
                </tr>
              ))}
              {misPlanesActivos.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    <ClipboardList className="mx-auto mb-2 opacity-20" size={48} />
                    No tienes planes activos bajo tu tutoría.
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
