import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/forms/ResetPasswordForm";
import { PageLoader } from "@/components/shared/PageLoader";

export const metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold">Reset your password</h1>
        <p className="text-sm text-muted-foreground">Choose a new password for your account.</p>
      </div>
      <Suspense fallback={<PageLoader />}>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}
