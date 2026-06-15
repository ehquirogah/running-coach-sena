import { SesionConPlan } from "@/types";

interface Props {
  sesion: SesionConPlan;
}

export default function SesionRow({ sesion }: Props) {
  const formatTime = (totalMin: number) => {
    const hours = Math.floor(totalMin / 60);
    const mins = totalMin % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  const getEffortBadge = (val: number) => {
    let colors = "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (val > 3 && val <= 6) colors = "bg-amber-100 text-amber-700 border-amber-200";
    if (val > 6) colors = "bg-rose-100 text-rose-700 border-rose-200";

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${colors}`}>
        {val}/10
      </span>
    );
  };

  const calculatePace = (dist: number, time: number) => {
    if (dist === 0) return "0.00";
    return (time / dist).toFixed(2);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  };

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">
          {formatDate(sesion.fecha)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="text-sm font-black text-slate-800">{sesion.distancia.toFixed(1)} km</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="text-sm font-medium text-slate-600">{formatTime(sesion.tiempo)}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        {getEffortBadge(sesion.nivelEsfuerzo)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold text-slate-900">{calculatePace(sesion.distancia, sesion.tiempo)}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">min/km</span>
        </div>
      </td>
    </tr>
  );
}
