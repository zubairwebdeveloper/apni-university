import Link from "next/link";
import { GuestGuard } from "@/components/auth/GuestGuard";
import { siteConfig } from "@/config/site";

export default function AuthLayout({ children }) {
  return (
    <GuestGuard>
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="flex mb-8 items-center gap-2">
        <span className="text-blue-600 font-bold text-2xl">Apni</span>
        <span className="text-orange-500 font-bold text-2xl">University</span>
      </div>
        <div className="w-full max-w-md rounded-xl border bg-background p-8 shadow-sm">
          {children}
        </div>
      </div>
    </GuestGuard>
  );
}
