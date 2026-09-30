"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import { auth } from "./client";

const googleProvider = new GoogleAuthProvider();

export function registerWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function logout() {
  return signOut(auth);
}

export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export function confirmReset(code, newPassword) {
  return confirmPasswordReset(auth, code, newPassword);
}

export function sendVerificationEmail(user) {
  return sendEmailVerification(user);
}

export function updateUserProfile(user, data) {
  return updateProfile(user, data);
}

export function watchAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function reauthenticate(user, currentPassword) {
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  return reauthenticateWithCredential(user, credential);
}

export function changePassword(user, newPassword) {
  return updatePassword(user, newPassword);
}

export function deleteCurrentUser(user) {
  return deleteUser(user);
}
