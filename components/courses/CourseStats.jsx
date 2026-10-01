import { Skeleton } from "@/components/ui/skeleton";

const ITEMS = [
  { key: "total", label: "All courses", dot: "bg-primary" },
  { key: "published", label: "Published", dot: "bg-emerald-500" },
  { key: "draft", label: "Drafts", dot: "bg-amber-500" },
  { key: "archived", label: "Archived", dot: "bg-slate-400" },
];

export default function CourseStats({ stats }) {
  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {ITEMS.map((i) => (
        <div key={i.key} className="rounded-xl border bg-card p-4">
          <dt className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className={`size-2 rounded-full ${i.dot}`} />{i.label}
          </dt>
          <dd className="mt-1 text-3xl font-semibold tabular-nums">
            {stats ? stats[i.key] : <Skeleton className="h-9 w-12" />}
          </dd>
        </div>
      ))}
    </dl>
  );
}
