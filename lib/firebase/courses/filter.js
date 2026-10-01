import { orderBy, where } from "firebase/firestore";

const SORTS = {
  newest: [orderBy("createdAt", "desc")],
  oldest: [orderBy("createdAt", "asc")],
  "price-asc": [orderBy("price", "asc")],
  "price-desc": [orderBy("price", "desc")],
  popular: [orderBy("students", "desc")],
};

export function buildFilterConstraints({ status = "all", category = "all", level = "all", sort = "newest" } = {}) {
  const c = [];
  if (status !== "all") c.push(where("status", "==", status));
  if (category !== "all") c.push(where("category", "==", category));
  if (level !== "all") c.push(where("level", "==", level));
  return [...c, ...(SORTS[sort] ?? SORTS.newest)];
}

export const buildEqualityConstraints = (f = {}) =>
  buildFilterConstraints(f).filter((x) => x.type === "where");
