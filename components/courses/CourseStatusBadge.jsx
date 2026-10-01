import { Badge } from "@/components/ui/badge";
import { STATUS_META } from "@/lib/constants/course";

export default function CourseStatusBadge({ status }) {
  const m = STATUS_META[status] ?? STATUS_META.draft;
  return (
    <Badge variant="outline" className={`gap-1.5 bg-background/80 font-medium backdrop-blur ${m.text}`}>
      <span className={`size-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </Badge>
  );
}
