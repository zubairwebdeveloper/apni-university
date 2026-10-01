export const TONES = {
  amber: { dot: "bg-amber-500", text: "text-amber-700 dark:text-amber-400" },
  emerald: { dot: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-400" },
  slate: { dot: "bg-slate-400", text: "text-slate-600 dark:text-slate-400" },
  rose: { dot: "bg-rose-500", text: "text-rose-700 dark:text-rose-400" },
  sky: { dot: "bg-sky-500", text: "text-sky-700 dark:text-sky-400" },
};

export const STATUS_SETS = {
  publishing: {
    draft: { label: "Draft", tone: "amber" },
    published: { label: "Published", tone: "emerald" },
    archived: { label: "Archived", tone: "slate" },
  },
  moderation: {
    pending: { label: "Pending", tone: "amber" },
    approved: { label: "Approved", tone: "emerald" },
    rejected: { label: "Rejected", tone: "rose" },
    hidden: { label: "Hidden", tone: "slate" },
  },
};
