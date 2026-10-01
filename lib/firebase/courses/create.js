import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { COURSES, db } from "../client";

export async function createCourse(data) {
  const ref = await addDoc(collection(db, COURSES), {
    ...data,
    titleLower: data.title.toLowerCase(),
    students: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}
