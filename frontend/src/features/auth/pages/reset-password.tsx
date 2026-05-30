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
import { Eye, EyeOff, Loader2, KeyRound, AlertCircle, ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router";

const ChangePassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const token = new URLSearchParams(window.location.search).get("token");

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Invalid or missing reset token. Please request a new password reset link.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newpassword") as string;
    const confirmPassword = formData.get("confirmpassword") as string;

    if (newPassword.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
    }

    if (confirmPassword !== newPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    const { error: resetError } = await authClient.resetPassword({
      newPassword: newPassword,
      token,
    });

    if (resetError) {
      setError(resetError.message || "Failed to reset password. The link may have expired.");
      setIsLoading(false);
    } else {
      // Small delay for better UX before redirecting
      setTimeout(() => {
        navigate("/auth/signin", { 
          state: { message: "Password reset successful! You can now sign in with your new password." } 
        });
      }, 1500);
    }
  };

  if (!token && !isLoading) {
    return (
      <Card className="border-border/80 bg-card/90 mx-auto w-full max-w-md overflow-hidden rounded-3xl border p-1 shadow-2xl backdrop-blur-xl">
        <CardHeader className="space-y-1.5 pb-6">
          <div className="bg-destructive/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
            <AlertCircle className="text-destructive h-6 w-6" />
          </div>
          <CardTitle className="text-center text-2xl font-bold tracking-tight">
            Invalid Link
          </CardTitle>
          <CardDescription className="text-center text-sm">
            This password reset link is invalid or has expired.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6 text-center">
          <Link
            to="/auth/forget-password"
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-11 items-center justify-center rounded-2xl px-6 text-sm font-medium transition-all"
          >
            Request New Link
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/80 bg-card/90 mx-auto w-full max-w-md overflow-hidden rounded-3xl border p-1 shadow-2xl backdrop-blur-xl transition-all duration-300">
      <CardHeader className="space-y-1.5 pb-6">
        <div className="bg-primary/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <KeyRound className="text-primary h-6 w-6" />
        </div>
        <CardTitle className="text-center text-2xl font-bold tracking-tight">
          Reset Password
        </CardTitle>
        <CardDescription className="text-center text-sm">
          Please enter and confirm your new password below.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 px-6 pb-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <label htmlFor="newpassword" className="text-sm font-medium">
              New Password
            </label>
            <div className="relative">
              <Input
                id="newpassword"
                name="newpassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                required
                disabled={isLoading}
                onChange={() => setError(null)}
              />
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmpassword" className="text-sm font-medium">
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                id="confirmpassword"
                name="confirmpassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repeat new password"
                required
                disabled={isLoading}
                onChange={() => setError(null)}
              />
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
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
                Updating password...
              </>
            ) : (
              "Reset Password"
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

export default ChangePassword;