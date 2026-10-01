import { doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { COURSES, db } from "../client";

const chunk = (arr, n = 450) => Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));

export async function bulkUpdateStatus(ids, status) {
  for (const part of chunk(ids)) {
    const batch = writeBatch(db);
    part.forEach((id) => batch.update(doc(db, COURSES, id), { status, updatedAt: serverTimestamp() }));
    await batch.commit();
  }
}

export async function bulkDelete(ids) {
  for (const part of chunk(ids)) {
    const batch = writeBatch(db);
    part.forEach((id) => batch.delete(doc(db, COURSES, id)));
    await batch.commit();
  }
}
