"use client";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "./client";

export function userDocRef(uid) {
  return doc(db, "users", uid);
}

export async function getDocument(collectionName, id) {
  const ref = doc(db, collectionName, id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function setDocument(collectionName, id, data, options = { merge: true }) {
  const ref = doc(db, collectionName, id);
  return setDoc(ref, { ...data, updatedAt: serverTimestamp() }, options);
}

export async function updateDocument(collectionName, id, data) {
  const ref = doc(db, collectionName, id);
  return updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

export async function findByField(collectionName, field, value, max = 1) {
  const q = query(collection(db, collectionName), where(field, "==", value), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export { serverTimestamp };
