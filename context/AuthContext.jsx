"use client";

import { createContext, useEffect, useState, useCallback } from "react";
import { watchAuthState } from "@/lib/firebase/auth";
import { authService } from "@/lib/services/authService";
import { profileService } from "@/lib/services/profileService";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (uid) => {
    if (!uid) {
      setProfile(null);
      return;
    }
    const data = await profileService.getProfile(uid);
    setProfile(data);
  }, []);

  useEffect(() => {
    const unsubscribe = watchAuthState(async (user) => {
      setFirebaseUser(user);
      if (user) {
        await loadProfile(user.uid);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [loadProfile]);

  const refreshUser = useCallback(async () => {
    if (firebaseUser) {
      await firebaseUser.reload();
      await loadProfile(firebaseUser.uid);
    }
  }, [firebaseUser, loadProfile]);

  const value = {
    user: firebaseUser,
    profile,
    loading,
    isAuthenticated: !!firebaseUser,
    isEmailVerified: !!firebaseUser?.emailVerified,

    register: authService.register,
    login: authService.login,
    loginWithGoogle: authService.loginWithGoogle,
    logout: authService.logout,
    forgotPassword: authService.forgotPassword,
    resetPassword: authService.resetPassword,
    resendVerification: () => authService.resendVerification(firebaseUser),
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
