import { useState, type FormEvent } from "react";
import axios from "axios";
import { Link, Navigate, useLocation, useNavigate } from "react-router";

import { useAppDispatch } from "@/app/store/hooks";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { DATABASE_URL } from "@/config";
import { clearUsername, setUsername } from "@/features/auth/store/user-slice";
import { getToken } from "@/shared/lib/session";

interface AuthFormProps {
  mode: "signin" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "signup";
  const [username, setLocalUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = getToken();
  if (token) {
    return <Navigate to="/home/dashboard" replace state={{ from: location }} />;
  }
  const redirectTo =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ??
    "/home/dashboard";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${DATABASE_URL}/user/${isSignUp ? "signup" : "signin"}`,
        isSignUp
          ? { username, password, email }
          : { username, password },
      );

      const authData = response.data?.data;
      const nextUsername = authData?.user?.name ?? username;

      localStorage.setItem("token", authData?.token ?? "");
      dispatch(clearUsername());
      dispatch(setUsername(nextUsername));
      navigate(redirectTo, { replace: true });
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) {
        setError(
          requestError.response?.data?.message ??
            requestError.response?.data?.msg ??
            "Request failed.",
        );
      } else {
        setError("Request failed.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-border/60 bg-card/85 backdrop-blur">
      <CardHeader>
        <CardTitle>{isSignUp ? "Create account" : "Sign in"}</CardTitle>
        <CardDescription>
          {isSignUp
            ? "Start organizing content in a cleaner workspace."
            : "Continue to your saved content dashboard."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-medium">Username</span>
            <Input
              value={username}
              onChange={(event) => setLocalUsername(event.target.value)}
              required
            />
          </label>

          {isSignUp ? (
            <label className="block space-y-2">
              <span className="text-sm font-medium">Email</span>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
          ) : null}

          <label className="block space-y-2">
            <span className="text-sm font-medium">Password</span>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isSignUp
                ? "Creating account..."
                : "Signing in..."
              : isSignUp
                ? "Create account"
                : "Sign in"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
            <Link
              className="font-medium text-primary underline underline-offset-4"
              to={isSignUp ? "/signin" : "/signup"}
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

