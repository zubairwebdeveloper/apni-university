import { orderBy, where } from "firebase/firestore";
import { fetchPage } from "./pagination";
import { buildEqualityConstraints } from "./filter";

// Prefix search on `titleLower` (Firestore has no native full-text search).
export function searchCourses(term, filters, opts) {
  const t = term.trim().toLowerCase();
  return fetchPage(
    [
      ...buildEqualityConstraints(filters),
      where("titleLower", ">=", t),
      where("titleLower", "<=", t + "\uf8ff"),
      orderBy("titleLower", "asc"),
    ],
    opts
  );
}
