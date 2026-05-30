import { authClient } from "@/lib/auth-client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const emailValue = formData.get("email") as string;
    setEmail(emailValue);

    const { error } = await authClient.requestPasswordReset({
      email: emailValue,
      redirectTo: `${window.location.origin}/#/auth/change-password`,
    });

    if (error) {
      setError(error.message || "Something went wrong. Please try again.");
    } else {
      setIsSent(true);
    }
    setIsLoading(false);
  };

  if (isSent) {
    return (
      <Card className="border-border/80 bg-card/90 mx-auto w-full max-w-md overflow-hidden rounded-3xl border p-1 shadow-2xl backdrop-blur-xl transition-all duration-300">
        <CardHeader className="space-y-1.5 pb-6">
          <div className="bg-primary/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
            <Mail className="text-primary h-6 w-6" />
          </div>
          <CardTitle className="text-center text-2xl font-bold tracking-tight">
            Check your email
          </CardTitle>
          <CardDescription className="mx-auto max-w-[280px] text-center text-sm leading-normal">
            We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-6 pb-6 text-center">
          <p className="text-muted-foreground text-xs">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <Button
            variant="outline"
            className="w-full rounded-2xl"
            onClick={() => setIsSent(false)}
          >
            Try another email
          </Button>
          <Link
            to="/auth/signin"
            className="text-primary hover:text-primary/80 flex items-center justify-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/80 bg-card/90 mx-auto w-full max-w-md overflow-hidden rounded-3xl border p-1 shadow-2xl backdrop-blur-xl transition-all duration-300">
      <CardHeader className="space-y-1.5 pb-6">
        <CardTitle className="text-center text-2xl font-bold tracking-tight">
          Forgot Password
        </CardTitle>
        <CardDescription className="mx-auto max-w-[280px] text-center text-sm leading-normal">
          Enter your email address and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 px-6 pb-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="border-destructive/20 bg-destructive/5 rounded-2xl border p-3 text-center">
              <p className="text-destructive text-xs font-medium">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 relative h-12 w-full cursor-pointer justify-center rounded-2xl border-none text-sm font-medium transition-all duration-300 hover:scale-[1.015] active:scale-[0.99]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>

          <Link
            to="/auth/signin"
            className="text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </Link>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;