"use client";

import {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
  logout,
  resetPassword,
  confirmReset,
  sendVerificationEmail,
  updateUserProfile,
  reauthenticate,
  changePassword,
  deleteCurrentUser,
} from "@/lib/firebase/auth";
import { setDocument, getDocument } from "@/lib/firebase/firestore";
import { getFirebaseErrorMessage } from "@/lib/utils/firebaseErrors";

/**
 * authService centralizes all authentication + user-record business logic.
 * UI components should never call Firebase directly — always go through here.
 */
export const authService = {
  async register({ name, email, password }) {
    try {
      const credential = await registerWithEmail(email, password);
      const { user } = credential;

      await updateUserProfile(user, { displayName: name });
      await sendVerificationEmail(user);

      await setDocument("users", user.uid, {
        uid: user.uid,
        name,
        username: email.split("@")[0],
        email,
        photoURL: user.photoURL || null,
        phone: "",
        bio: "",
        website: "",
        location: "",
        socialLinks: { github: "", linkedin: "", twitter: "", instagram: "" },
        role: "user",
        status: "active",
        emailVerified: false,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      });

      return { user };
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async login({ email, password }) {
    try {
      const credential = await loginWithEmail(email, password);
      return { user: credential.user };
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async loginWithGoogle() {
    try {
      const credential = await loginWithGoogle();
      const { user } = credential;

      const existing = await getDocument("users", user.uid);
      if (!existing) {
        await setDocument("users", user.uid, {
          uid: user.uid,
          name: user.displayName || "",
          username: (user.email || "").split("@")[0],
          email: user.email,
          photoURL: user.photoURL || null,
          role: "user",
          status: "active",
          emailVerified: user.emailVerified,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        });
      }

      return { user };
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async logout() {
    try {
      await logout();
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async forgotPassword(email) {
    try {
      await resetPassword(email);
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async resetPassword(code, newPassword) {
    try {
      await confirmReset(code, newPassword);
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async resendVerification(user) {
    try {
      await sendVerificationEmail(user);
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async changePassword(user, currentPassword, newPassword) {
    try {
      await reauthenticate(user, currentPassword);
      await changePassword(user, newPassword);
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async deleteAccount(user, currentPassword) {
    try {
      await reauthenticate(user, currentPassword);
      await deleteCurrentUser(user);
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  },
};
