"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { PageLoader } from "@/components/shared/PageLoader";

/**
 * Wrap guest-only pages (login/register) so authenticated users
 * are redirected away from them.
 */
export function GuestGuard({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || isAuthenticated) {
    return <PageLoader />;
  }

  return children;
}
