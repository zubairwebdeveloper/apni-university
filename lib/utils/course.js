import { CURRENCY } from "@/lib/constants/course";

export const formatPrice = (n) =>
  !n ? "Free" : new Intl.NumberFormat("en-PK", { style: "currency", currency: CURRENCY, maximumFractionDigits: 0 }).format(n);

export const formatDate = (ms) =>
  ms ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(ms)) : "—";

// Deterministic gradient per course so cards without thumbnails still look distinct.
export function gradientFor(title = "") {
  let h = 0;
  for (let i = 0; i < title.length; i++) h = (h * 31 + title.charCodeAt(i)) % 360;
  return `linear-gradient(135deg, hsl(${h} 55% 42%), hsl(${(h + 48) % 360} 60% 30%))`;
}

export const tagsToArray = (s = "") =>
  [...new Set(s.split(",").map((t) => t.trim()).filter(Boolean))].slice(0, 8);
