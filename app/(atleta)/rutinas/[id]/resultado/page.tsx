import { obtenerRutinaAsignada } from "@/actions/rutinaActions";
import ResultadoRutinaForm from "@/components/rutinas/ResultadoRutinaForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ClipboardCheck, Target } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ResultadoRutinaPage({ params }: Props) {
  const { id } = await params;
  const rutina = await obtenerRutinaAsignada(id);

  if (!rutina) notFound();

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <Link href="/mi-plan" className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver a mi plan
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 bg-emerald-600 text-white">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardCheck className="w-8 h-8 text-emerald-100" />
            <span className="text-emerald-100 text-sm font-bold uppercase tracking-widest">Rutina asignada</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">{rutina.nombre}</h1>
          <p className="text-emerald-50 mt-2">{rutina.descripcion}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b border-slate-100 bg-slate-50/50">
          <Info label="Fecha" value={new Date(rutina.fechaProgramada).toLocaleDateString()} />
          <Info label="Tipo" value={rutina.tipoEntrenamiento} />
          <Info label="Objetivo" value={`${rutina.distanciaObjetivo} km`} />
          <Info label="Intensidad" value={`${rutina.intensidadEsperada}/10`} />
        </div>

        {rutina.observacionesEntrenador && (
          <div className="mx-6 mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <h2 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Indicaciones del entrenador
            </h2>
            <p className="mt-2 text-sm text-emerald-800">{rutina.observacionesEntrenador}</p>
          </div>
        )}

        <div className="p-6">
          {rutina.estado === "REVISADA" ? (
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-6 text-sky-900">
              <h2 className="text-xl font-bold">Esta rutina ya fue revisada</h2>
              <p className="mt-2 text-sm">{rutina.feedbackEntrenador}</p>
              <p className="mt-2 text-sm font-semibold">{rutina.recomendacionEntrenador}</p>
              <Link href="/mi-plan" className="mt-6 inline-block">
                <Button className="bg-sky-700 hover:bg-sky-800 text-white">Ver retroalimentacion</Button>
              </Link>
            </div>
          ) : (
            <ResultadoRutinaForm rutina={rutina} />
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4">
      <p className="text-xs font-black uppercase text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-slate-900">{value}</p>
    </div>
  );
}
