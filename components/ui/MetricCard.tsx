import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  description?: string;
}

export default function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  trend,
  description,
}: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-green-50 text-[#16A34A] rounded-xl">
          <Icon size={24} />
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            trend.isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {trend.isUp ? '↑' : '↓'} {trend.value}%
          </span>
        )}
      </div>
      
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          {unit && <span className="text-sm font-semibold text-gray-400">{unit}</span>}
        </div>
        {description && (
          <p className="text-xs text-gray-400 mt-2 font-medium">{description}</p>
        )}
      </div>
    </div>
  );
}
