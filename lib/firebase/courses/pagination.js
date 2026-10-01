import { collection, getDocs, limit, query, startAfter } from "firebase/firestore";
import { COURSES, db } from "../client";
import { PAGE_SIZE } from "@/lib/constants/course";

export function serializeCourse(snap) {
  const d = snap.data();
  return {
    id: snap.id,
    ...d,
    createdAt: d.createdAt?.toMillis?.() ?? null,
    updatedAt: d.updatedAt?.toMillis?.() ?? null,
  };
}

// Cursor pagination: fetch pageSize+1 to know if a next page exists without an extra count query.
export async function fetchPage(constraints, { cursor = null, pageSize = PAGE_SIZE } = {}) {
  const q = query(
    collection(db, COURSES),
    ...constraints,
    ...(cursor ? [startAfter(cursor)] : []),
    limit(pageSize + 1)
  );
  const snap = await getDocs(q);
  const hasNext = snap.docs.length > pageSize;
  const docs = hasNext ? snap.docs.slice(0, pageSize) : snap.docs;
  return { courses: docs.map(serializeCourse), lastDoc: docs.at(-1) ?? null, hasNext };
}
