import { Link, Outlet, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";

import Logo from "@/assets/logo.png";
import { ThemeToggle } from "@/shared/theme/theme-toggle";
import { SparklesCore } from "@/shared/ui/sparkles";
import { useTheme } from "@/shared/theme/theme-provider";
import { Navigate } from "react-router";
import { clearUsername, setUsername } from "@/features/auth/store/user-slice";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { useSessionContext } from "@/context/useSessionContext";

export default function AuthPage() {
  const { theme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const {session} = useSessionContext()
  
  const dispatch = useAppDispatch();
  const location = useLocation();
  const locationState = location.state as {
    from?: { pathname?: string };
    message?: string;
  } | null;
  const redirectTo = locationState?.from?.pathname ?? "/home/dashboard";

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
    <div className="bg-background text-foreground relative flex min-h-screen flex-col justify-between overflow-hidden transition-colors duration-500">
      {/* Background visual effects */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        {/* Soft colorful glow blobs */}
        <div className="absolute top-[10%] left-[15%] h-80 w-80 animate-pulse rounded-full bg-violet-600/10 blur-[100px] duration-6000 dark:bg-violet-500/8" />
        <div className="absolute right-[15%] bottom-[15%] h-96 w-96 animate-pulse rounded-full bg-cyan-600/10 blur-[120px] duration-8000 [animation-delay:2s] dark:bg-cyan-500/8" />

        {/* Ambient radial overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.8)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]" />

        {/* Sparkles particle layer */}
        <SparklesCore
          id="auth-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.4}
          particleDensity={40}
          speed={1.5}
          particleColor={isDark ? "#a78bfa" : "#4f46e5"}
          className="absolute inset-0 h-full w-full opacity-60 dark:opacity-40"
        />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-10 flex w-full items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="group text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span>Back to Home</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Authentication Card Area */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo and Brand Header */}
          <div className="animate-fade-in flex flex-col items-center space-y-2 text-center">
            <div className="border-primary/20 bg-card/80 flex h-12 w-12 items-center justify-center rounded-2xl border p-2.5 shadow-xs backdrop-blur-md">
              <img
                src={Logo}
                alt="Stashly Logo"
                className="h-6 w-6 object-contain"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Stashly</h2>
              <p className="text-muted-foreground text-xs">
                Your minimal, unified content workspace
              </p>
            </div>
          </div>

          {/* Form component */}
          <div className="transform transition-all duration-300 hover:scale-[1.005]">
            <Outlet></Outlet>
          </div>
        </div>
      </main>

      {/* Small footer */}
      <footer className="text-muted-foreground/60 relative z-10 w-full py-4 text-center text-xs">
        <p>© 2026 Stashly. Secure content library.</p>
      </footer>
    </div>
  );
}
