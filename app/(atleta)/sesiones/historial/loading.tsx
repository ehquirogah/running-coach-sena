export default function HistorialLoading() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header Skeleton */}
      <div className="h-32 bg-white rounded-3xl border border-slate-100 p-8 flex justify-between items-center">
        <div className="space-y-3">
          <div className="h-4 w-32 bg-slate-100 rounded animate-pulse"></div>
          <div className="h-10 w-64 bg-slate-100 rounded animate-pulse"></div>
          <div className="h-4 w-96 bg-slate-100 rounded animate-pulse"></div>
        </div>
        <div className="h-14 w-40 bg-slate-100 rounded-2xl animate-pulse"></div>
      </div>

      {/* Metrics Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-white rounded-3xl border border-slate-100 animate-pulse"></div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/30 h-16"></div>
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className="h-8 flex-1 bg-slate-50 rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-slate-50 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-slate-50 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-slate-50 rounded animate-pulse text-right"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
