import { useSearchParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";

import { AuthForm } from "@/features/auth/components/auth-form";
import Logo from "@/assets/logo.png";
import { ThemeToggle } from "@/shared/theme/theme-toggle";
import { SparklesCore } from "@/shared/ui/sparkles";
import { useTheme } from "@/shared/theme/theme-provider";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  const { theme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-background text-foreground transition-colors duration-500">
      {/* Background visual effects */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {/* Soft colorful glow blobs */}
        <div className="absolute top-[10%] left-[15%] h-80 w-80 rounded-full bg-violet-600/10 blur-[100px] dark:bg-violet-500/8 animate-pulse duration-[6000ms]" />
        <div className="absolute bottom-[15%] right-[15%] h-96 w-96 rounded-full bg-cyan-600/10 blur-[120px] dark:bg-cyan-500/8 animate-pulse duration-[8000ms] [animation-delay:2s]" />

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
          className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Authentication Card Area */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          {/* Logo and Brand Header */}
          <div className="flex flex-col items-center space-y-2 text-center animate-fade-in">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-card/80 p-2.5 shadow-xs backdrop-blur-md">
              <img src={Logo} alt="Stashly Logo" className="h-6 w-6 object-contain" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight bg-linear-to-b from-foreground to-foreground/80">
                Stashly
              </h2>
              <p className="text-xs text-muted-foreground">
                Your minimal, unified content workspace
              </p>
            </div>
          </div>

          {/* Form component */}
          <div className="transform transition-all duration-300 hover:scale-[1.005]">
            <AuthForm mode={mode} />
          </div>
        </div>
      </main>

      {/* Small footer */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-muted-foreground/60">
        <p>© 2026 Stashly. Secure content library.</p>
      </footer>
    </div>
  );
}
