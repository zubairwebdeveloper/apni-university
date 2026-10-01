import { Badge } from "@/components/ui/badge";
import { TONES } from "@/lib/constants/status";

export default function StatusBadge({ config, status }) {
  const m = config.statuses[status] ?? { label: status, tone: "slate" };
  const t = TONES[m.tone] ?? TONES.slate;
  return (
    <Badge variant="outline" className={`gap-1.5 bg-background/80 font-medium ${t.text}`}>
      <span className={`size-1.5 rounded-full ${t.dot}`} />
      {m.label}
    </Badge>
  );
}
