"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES, LEVELS, SORT_OPTIONS, STATUS_META } from "@/lib/constants/course";

function Filter({ label, value, onChange, options }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[150px]" aria-label={label}><SelectValue placeholder={label} /></SelectTrigger>
      <SelectContent>
        {options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

const opt = (all, list) => [{ value: "all", label: all }, ...list.map((v) => ({ value: v, label: v }))];

export default function CourseFilters({ filters, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Filter label="Status" value={filters.status} onChange={(v) => onChange("status", v)}
        options={[{ value: "all", label: "All statuses" }, ...Object.entries(STATUS_META).map(([value, m]) => ({ value, label: m.label }))]} />
      <Filter label="Category" value={filters.category} onChange={(v) => onChange("category", v)} options={opt("All categories", CATEGORIES)} />
      <Filter label="Level" value={filters.level} onChange={(v) => onChange("level", v)} options={opt("All levels", LEVELS)} />
      <Filter label="Sort" value={filters.sort} onChange={(v) => onChange("sort", v)} options={SORT_OPTIONS} />
    </div>
  );
}
