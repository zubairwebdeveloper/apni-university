import { Skeleton } from "@/components/ui/skeleton";
import { TONES } from "@/lib/constants/status";

export default function ResourceStats({ config, stats }) {
  const items = [
    { key: "total", label: `All ${config.plural.toLowerCase()}`, dot: "bg-primary" },
    ...Object.entries(config.statuses).map(([key, m]) => ({ key, label: m.label, dot: TONES[m.tone]?.dot ?? "bg-slate-400" })),
  ];
  return (
    <dl className="flex flex-wrap gap-3">
      {items.map((i) => (
        <div key={i.key} className="min-w-[140px] flex-1 rounded-xl border bg-card p-4">
          <dt className="flex items-center gap-2 text-sm text-muted-foreground"><span className={`size-2 rounded-full ${i.dot}`} />{i.label}</dt>
          <dd className="mt-1 text-3xl font-semibold tabular-nums">{stats ? stats[i.key] ?? 0 : <Skeleton className="h-9 w-12" />}</dd>
        </div>
      ))}
    </dl>
  );
}
