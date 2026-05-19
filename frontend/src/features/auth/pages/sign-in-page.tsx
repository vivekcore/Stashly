import { AuthForm } from "@/features/auth/components/auth-form";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <AuthForm mode="signin" />
    </div>
  );
}

