import { RegisterForm } from "@/components/forms/RegisterForm";

export const metadata = { title: "Create an account" };

export default function RegisterPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold">Create your account</h1>
        <p className="text-sm text-muted-foreground">Start your learning journey today.</p>
      </div>
      <RegisterForm />
    </>
  );
}
