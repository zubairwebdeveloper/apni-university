import { Archive, EyeOff, Rocket } from "lucide-react";

export const opt = (list = []) => list.map((v) => (typeof v === "string" ? { value: v, label: v } : v));
export const statusOptions = (statuses) => Object.entries(statuses).map(([value, m]) => ({ value, label: m.label }));
export const compact = (n) => new Intl.NumberFormat("en-PK", { notation: "compact" }).format(n);

export const publishingActions = [
  { status: "published", label: "Publish", icon: Rocket, bulk: true },
  { status: "draft", label: "Move to draft", icon: EyeOff },
  { status: "archived", label: "Archive", icon: Archive, bulk: true },
];

export const baseSorts = {
  newest: { label: "Newest first", field: "createdAt", dir: "desc" },
  oldest: { label: "Oldest first", field: "createdAt", dir: "asc" },
};

export const featuredFilter = {
  key: "featured",
  label: "Featured",
  type: "boolean",
  options: [{ value: "yes", label: "Featured" }, { value: "no", label: "Not featured" }],
};
