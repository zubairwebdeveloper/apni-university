import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { COURSES, db } from "../client";

export async function updateCourse(id, data) {
  await updateDoc(doc(db, COURSES, id), {
    ...data,
    ...(data.title ? { titleLower: data.title.toLowerCase() } : {}),
    updatedAt: serverTimestamp(),
  });
}
