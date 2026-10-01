import { AuthGuard } from "@/components/auth/AuthGuard";
import { Container } from "@/components/layout/Container";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import MobileHeader from "@/components/layout/MobileHeader";
import Link from "next/link";

// TODO: replace with the signed-in user's real role and profile once your auth context exposes them.
const ROLE = "student";
const USER = { name: "Student" };

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-background">
        {/* Keyboard users can skip the navigation */}
        <Link
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow-lg focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </Link>

        {/* Mobile header (hidden from md and up). It already includes the menu button. */}
        <MobileHeader role={ROLE} user={USER} notifications={[]} />

        <div className="flex flex-1">
          {/* Desktop sidebar */}
          <DashboardSidebar role={ROLE} />

          {/* Main content */}
          <main id="main-content" className="min-w-0 flex-1 py-6 md:py-8">
            <Container>{children}</Container>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
