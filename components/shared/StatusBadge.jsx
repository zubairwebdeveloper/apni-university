import { Badge } from "@/components/ui/badge";

const STATUS_STYLES = {
  active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  inactive: "bg-neutral-100 text-neutral-700 border-neutral-200",
  error: "bg-red-100 text-red-700 border-red-200",
};

export function StatusBadge({ status = "inactive", label }) {
  return <Badge className={STATUS_STYLES[status] || STATUS_STYLES.inactive}>{label || status}</Badge>;
}
