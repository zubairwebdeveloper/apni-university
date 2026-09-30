import { AuthGuard } from "@/components/auth/AuthGuard";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Container } from "@/components/layout/Container";

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col">
       
        <div className="flex flex-1">
          <DashboardSidebar />
          <main className="flex-1 py-8">
            <Container>{children}</Container>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
