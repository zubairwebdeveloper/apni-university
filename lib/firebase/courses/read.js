import { collection, doc, getCountFromServer, getDoc, query, where } from "firebase/firestore";
import { COURSES, db } from "../client";
import { buildFilterConstraints } from "./filter";
import { fetchPage, serializeCourse } from "./pagination";

export const getCourses = (filters, opts) => fetchPage(buildFilterConstraints(filters), opts);

export async function getCourseById(id) {
  const snap = await getDoc(doc(db, COURSES, id));
  return snap.exists() ? serializeCourse(snap) : null;
}

export async function getCourseStats() {
  const col = collection(db, COURSES);
  const count = async (status) =>
    (await getCountFromServer(status ? query(col, where("status", "==", status)) : col)).data().count;
  const [total, published, draft, archived] = await Promise.all([
    count(), count("published"), count("draft"), count("archived"),
  ]);
  return { total, published, draft, archived };
}
