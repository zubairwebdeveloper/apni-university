export const PAGE_SIZE = 9;

export const COURSE_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
};

export const STATUS_META = {
  draft: { label: "Draft", dot: "bg-amber-500", text: "text-amber-700 dark:text-amber-400" },
  published: { label: "Published", dot: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-400" },
  archived: { label: "Archived", dot: "bg-slate-400", text: "text-slate-600 dark:text-slate-400" },
};

export const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export const CATEGORIES = [
  "Web Development",
  "Mobile Apps",
  "Data Science",
  "Design",
  "Business",
  "Marketing",
  "Language",
];

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "popular", label: "Most enrolled" },
];

export const CURRENCY = "PKR";
