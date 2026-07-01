import { trustStatsContent } from "@/content/trust-stats";

export function TrustStatsBar() {
  return (
    <div className="stats-bar">
      <div className="container-shell grid gap-8 py-8 sm:grid-cols-3 sm:py-10">
        {trustStatsContent.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
