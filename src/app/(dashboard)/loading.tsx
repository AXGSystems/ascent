export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
      {/* Hero skeleton */}
      <div className="h-36 rounded-2xl bg-[var(--border-color)]" />

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-[var(--border-color)]" />
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="h-64 rounded-2xl bg-[var(--border-color)]" />

      {/* Two column skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-72 rounded-2xl bg-[var(--border-color)]" />
        <div className="h-72 rounded-2xl bg-[var(--border-color)]" />
      </div>
    </div>
  );
}
