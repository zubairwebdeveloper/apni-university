"use client";

import { getApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { uploadFile, deleteFile } from "@/lib/firebase/storage";

// Default Firebase app se Firestore leta hai, is liye config ka `db` export zaroori nahi.
// (Agar aapke paas `db` export hai to yahan usay import karke use kar sakte hain.)
const getDb = () => getFirestore(getApp());

const normalize = (value) => (value || "").trim().toLowerCase();

/** Kya ye username kisi aur user ne le rakha hai? */
export async function isUsernameTaken(username, currentUid) {
  const name = normalize(username);
  if (!name) return false;
  const snap = await getDoc(doc(getDb(), "usernames", name));
  return snap.exists() && snap.data().uid !== currentUid;
}

/**
 * Profile save karta hai (document na ho tab bhi ban jata hai).
 * Username uniqueness transaction ke andar check hoti hai.
 */
export async function updateProfileInfo(uid, data) {
  if (!uid) throw new Error("User ID is required.");

  const db = getDb();
  const newName = normalize(data.username);
  const userRef = doc(db, "users", uid);

  await runTransaction(db, async (tx) => {
    // 1. Saari reads pehle
    const userSnap = await tx.get(userRef);
    const oldName = normalize(
      userSnap.exists() ? userSnap.data().username : "",
    );

    const newNameRef = newName ? doc(db, "usernames", newName) : null;
    const newNameSnap = newNameRef ? await tx.get(newNameRef) : null;

    const oldNameRef =
      oldName && oldName !== newName ? doc(db, "usernames", oldName) : null;
    const oldNameSnap = oldNameRef ? await tx.get(oldNameRef) : null;

    if (newNameSnap?.exists() && newNameSnap.data().uid !== uid) {
      throw new Error("USERNAME_TAKEN");
    }

    // 2. Phir writes
    if (oldNameSnap?.exists() && oldNameSnap.data().uid === uid) {
      tx.delete(oldNameRef);
    }
    if (newNameRef && !newNameSnap.exists()) {
      tx.set(newNameRef, { uid });
    }

    tx.set(
      userRef,
      {
        ...data,
        username: newName,
        updatedAt: serverTimestamp(),
        ...(userSnap.exists() ? {} : { createdAt: serverTimestamp() }),
      },
      { merge: true },
    );
  });
}

/** Photo upload karke URL Firestore mein save karta hai. */
export async function updateAvatar(uid, file) {
  if (!uid) throw new Error("User ID is required.");
  const url = await uploadFile(`users/${uid}/avatar`, file);
  await setDoc(
    doc(getDb(), "users", uid),
    { photoURL: url, updatedAt: serverTimestamp() },
    { merge: true },
  );
  return url;
}

/** Photo hata deta hai. */
export async function removeAvatar(uid) {
  if (!uid) throw new Error("User ID is required.");
  try {
    await deleteFile(`users/${uid}/avatar`);
  } catch {
    // avatar mojood na ho to theek hai
  }
  await setDoc(
    doc(getDb(), "users", uid),
    { photoURL: null, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

/** Preferences save karta hai. */
export async function updatePreferences(uid, preferences) {
  await setDoc(
    doc(getDb(), "users", uid),
    { preferences, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

/** Username document bhi saaf karke user ka Firestore data delete karta hai. */
export async function deleteUserData(uid) {
  const db = getDb();
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  const username = normalize(snap.exists() ? snap.data().username : "");

  if (username) {
    const unameRef = doc(db, "usernames", username);
    const unameSnap = await getDoc(unameRef);
    if (unameSnap.exists() && unameSnap.data().uid === uid) {
      await deleteDoc(unameRef);
    }
  }
  try {
    await deleteFile(`users/${uid}/avatar`);
  } catch {}
  await deleteDoc(userRef);
}
