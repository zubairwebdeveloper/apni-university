"use client";

import { useState } from "react";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { notificationService } from "@/lib/services/notificationService";

export default function VerifyEmailPage() {
  const { resendVerification, user } = useAuth();
  const [sending, setSending] = useState(false);

  async function handleResend() {
    setSending(true);
    try {
      await resendVerification();
      notificationService.success("Verification email sent");
    } catch (error) {
      notificationService.error(error.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="rounded-full bg-primary/10 p-4">
        <MailCheck className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-xl font-semibold">Verify your email</h1>
      <p className="text-sm text-muted-foreground">
        We sent a verification link to <span className="font-medium">{user?.email}</span>. Click
        the link to activate your account.
      </p>
      <Button variant="outline" onClick={handleResend} disabled={sending}>
        {sending ? "Sending..." : "Resend verification email"}
      </Button>
    </div>
  );
}
