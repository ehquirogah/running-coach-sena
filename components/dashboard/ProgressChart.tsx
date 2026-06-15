"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface ProgressChartProps {
  data: { fecha: string; km: number; esfuerzo: number }[];
  title?: string;
}

export default function ProgressChart({ data, title }: ProgressChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-gray-400 font-medium italic">Sin datos de sesiones todavía</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title || "Evolución de Volumen (km)"}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorKm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="fecha" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 500 }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              labelStyle={{ fontWeight: 'bold', marginBottom: '4px', color: '#111827' }}
            />
            <Area 
              type="monotone" 
              dataKey="km" 
              stroke="#16A34A" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorKm)" 
              dot={{ r: 4, fill: '#16A34A', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
