import { LoginForm } from "@/components/forms/LoginForm";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Log in to continue to your dashboard.</p>
      </div>
      <LoginForm />
    </>
  );
}
