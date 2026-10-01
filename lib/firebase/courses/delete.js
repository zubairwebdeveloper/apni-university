import { deleteDoc, doc } from "firebase/firestore";
import { COURSES, db } from "../client";

export const deleteCourse = (id) => deleteDoc(doc(db, COURSES, id));
