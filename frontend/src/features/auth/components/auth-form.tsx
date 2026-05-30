import React, { useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router";
import { Loader2 } from "lucide-react";
import { useAppDispatch } from "@/app/store/hooks";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { clearUsername, setUsername } from "@/features/auth/store/user-slice";
import { Input } from "@/shared/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";

const providers = [
  {
    id: "google",
    label: "Google",
    icon: (
      <svg
        className="mr-3 h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 12-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
    hoverClass:
      "hover:bg-white/80 dark:hover:bg-neutral-800 hover:shadow-md hover:shadow-blue-500/5",
  },
  {
    id: "github",
    label: "GitHub",
    icon: (
      <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    hoverClass:
      "hover:bg-black/90 dark:hover:bg-neutral-800 dark:hover:text-white hover:text-white hover:shadow-md hover:shadow-neutral-500/5",
  },
] as const;

// type ProviderId = (typeof providers)[number]["id"];
interface IAuthPropos {
  mode: "signin" | "signup";
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  onSocial: (id: string) => void;
  error: string | undefined;
  activeProvider: string | null;
  isLoading?: boolean;
}
export function AuthForm({
  mode,
  onSubmit,
  onSocial,
  error,
  activeProvider,
  isLoading,
}: IAuthPropos) {
  const isSignUp = mode === "signup";
  const { data: session, isPending } = authClient.useSession();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const locationState = location.state as {
    from?: { pathname?: string };
    message?: string;
  } | null;
  const redirectTo = locationState?.from?.pathname ?? "/home/dashboard";
  const successMessage = locationState?.message;

  useEffect(() => {
    if (!session?.user) {
      return;
    }

    dispatch(clearUsername());
    dispatch(setUsername(session.user.name || session.user.email));
  }, [dispatch, session?.user]);

  if (session) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return (
    <Card className="border-border/80 bg-card/90 relative overflow-hidden rounded-3xl border p-1 shadow-2xl backdrop-blur-xl transition-all duration-300">
      <CardHeader className="space-y-1.5 pb-6">
        <CardTitle className="text-center text-2xl font-bold tracking-tight">
          {isSignUp ? "Create Stashly Account" : "Welcome Back"}
        </CardTitle>
        <CardDescription className="text-muted-foreground mx-auto max-w-70 text-center text-sm leading-normal">
          {isSignUp
            ? "Sign up to start organizing and decluttering your saved resources."
            : "Sign in to access your unified minimal dashboard."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 px-6 pb-6">
        <div className="flex flex-col gap-3">
          {successMessage && (
            <div className="border-primary/20 bg-primary/5 rounded-2xl border p-3 text-center">
              <p className="text-primary text-xs font-medium">{successMessage}</p>
            </div>
          )}
          {mode === "signup" ? (
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <div>
                <Label>Name</Label>
                <Input className=" placeholder:text-xs" name="name" type="text" placeholder="Eren" />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                className=" placeholder:text-xs"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input className=" placeholder:text-xs" name="password" type="password" placeholder="Password" />
              </div>
              <div>
                <Button
                  className={`border-border/80 bg-background/50 text-foreground hover:bg-accent relative h-12 w-full cursor-pointer justify-center rounded-2xl border text-sm font-medium transition-all duration-300 hover:scale-[1.015] active:scale-[0.99]`}
                  type="submit"
                  disabled={isLoading || activeProvider !== null || isPending}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing up...
                    </>
                  ) : (
                    "SignUp"
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <div>
                <Label>Email</Label>
                <Input
                className=" placeholder:text-xs"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input className=" placeholder:text-xs" name="password" type="password" placeholder="Password" />
              </div>
              <Link
                className="text-xs underline underline-offset-2"
                to={"/auth/forget-password"}
                state={locationState}
              >
                Forget password
              </Link>
              <div>
                <Button
                  className={`border-border/80 bg-background/50 text-foreground hover:bg-background/20 relative h-12 w-full cursor-pointer justify-center rounded-2xl border text-sm font-medium transition-all duration-300 hover:scale-[1.015] active:scale-[0.99]`}
                  type="submit"
                  disabled={isLoading || activeProvider !== null || isPending}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "SignIn"
                  )}
                </Button>
              </div>
            </form>
          )}

          {providers.map((provider) => {
            const isCurrentSubmitting = activeProvider === provider.id;
            return (
              <Button
                key={provider.id}
                className={`border-border/80 bg-background/50 text-foreground relative h-12 w-full cursor-pointer justify-center rounded-2xl border text-sm font-medium transition-all duration-300 hover:scale-[1.015] active:scale-[0.99] ${provider.hoverClass}`}
                type="button"
                onClick={() => onSocial(provider.id)}
                disabled={activeProvider !== null || isPending}
              >
                {isCurrentSubmitting ? (
                  <>
                    <Loader2 className="text-muted-foreground mr-3 h-5 w-5 animate-spin" />
                    <span>Connecting to {provider.label}...</span>
                  </>
                ) : (
                  <>
                    {provider.icon}
                    <span>Continue with {provider.label}</span>
                  </>
                )}
              </Button>
            );
          })}
        </div>

        {error ? (
          <div className="border-destructive/20 bg-destructive/5 rounded-2xl border p-3 text-center">
            <p className="text-destructive text-xs font-medium">{error}</p>
          </div>
        ) : null}

        <div className="border-border/40 border-t pt-2 text-center">
          <p className="text-muted-foreground text-xs">
            {isSignUp ? "Already have an account?" : "Need a new account?"}{" "}
            <Link
              className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4 transition-colors"
              to={isSignUp ? "/auth/signin" : "/auth/signup"}
              state={locationState}
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
