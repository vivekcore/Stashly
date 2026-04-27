import {
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  Link2,
  NotebookPen,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router";

import Logo from "@/assets/logo.png";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "@/components/theme-provider";
import { getToken } from "@/lib/session";

const benefits = [
  "Save links from the sources you already browse.",
  "Keep everything in one clean dashboard.",
  "Turn saved content into notes without extra tools.",
];

const sources = ["YouTube", "Twitter/X", "LinkedIn", "Articles", "Notes"];

const features: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: Link2,
    title: "Capture quickly",
    description: "Save useful links and notes before they disappear into open tabs.",
  },
  {
    icon: LayoutDashboard,
    title: "Review clearly",
    description: "Use one dashboard with a simpler structure and less visual noise.",
  },
  {
    icon: NotebookPen,
    title: "Write with context",
    description: "Move from saved material into working notes when it is time to synthesize.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const token = getToken();
  const { theme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const openPrimary = () => navigate(token ? "/home/dashboard" : "/signin");
  const openSecondary = () => navigate("/signup");

  return (
    <div className="landing-page relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/15 to-transparent" />
        <SparklesCore
          id="landing-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={55}
          speed={2}
          particleColor={isDark ? "#f5f5f5" : "#171717"}
          className="absolute inset-0 h-full w-full opacity-55 dark:opacity-35"
        />
      </div>

      <header className="relative z-10 px-4 pt-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border/80 bg-card/90 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
              <img src={Logo} alt="Stashly logo" className="h-5 w-5" width={20} height={20} />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">Stashly</p>
              <p className="text-xs text-muted-foreground">Save and organize useful content</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              size="sm"
              className="cursor-pointer rounded-full px-4"
              onClick={openPrimary}
            >
              {token ? "Open app" : "Get started"}
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-16 pt-10 md:pt-14">
        <div className="mx-auto max-w-5xl space-y-10">
          <section className="space-y-8 text-center">
            <div className="flex justify-center">
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/8 px-4 py-1.5 text-primary"
              >
                Minimal content workspace
              </Badge>
            </div>

            <div className="space-y-4">
              <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl md:text-6xl">
                Save content fast. Find it later without the mess.
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                Stashly keeps videos, posts, articles, and notes in one calm workspace so your
                research stays usable.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="cursor-pointer rounded-full px-6"
                onClick={openPrimary}
              >
                {token ? "Open dashboard" : "Start saving"}
                <ArrowRight size={16} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="cursor-pointer rounded-full px-6"
                onClick={openSecondary}
              >
                Create account
              </Button>
            </div>

            <div className="mx-auto grid max-w-3xl gap-3 text-left sm:grid-cols-3">
              {benefits.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border/80 bg-card/80 px-4 py-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-primary/10 p-1 text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <Card className="border-border/80 bg-card/85">
              <CardContent className="grid gap-6 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Badge className="bg-primary text-primary-foreground">Workspace preview</Badge>
                    <h2 className="text-2xl font-semibold tracking-tight">One place for saved material</h2>
                    <p className="max-w-lg text-sm leading-7 text-muted-foreground">
                      The landing page now stays focused on the core use case instead of trying to
                      explain every possible flow at once.
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {sources.map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-2xl border border-border/80 bg-background/70 px-4 py-3"
                      >
                        <p className="text-sm font-medium">{item}</p>
                        <p className="text-xs text-muted-foreground">Saved to workspace</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[1.75rem] border border-border/80 bg-secondary px-5 py-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                      Dashboard
                    </p>
                    <p className="mt-3 text-4xl font-semibold tracking-[-0.05em]">142</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Saved items organized in one cleaner interface.
                    </p>
                  </div>

                  <div className="rounded-[1.75rem] border border-border/80 bg-background/72 px-5 py-5">
                    <p className="text-sm font-semibold">Simple flow</p>
                    <div className="mt-4 space-y-3">
                      <MiniRow label="Capture" value="Links and notes" />
                      <MiniRow label="Organize" value="One shared dashboard" />
                      <MiniRow label="Write" value="Editor when needed" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-3 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Why it works
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                Fewer sections. Clearer value.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </section>

          <section>
            <Card className="border-border/80 bg-card/88">
              <CardContent className="flex flex-col items-center gap-5 px-6 py-8 text-center md:px-8">
                <Badge
                  variant="outline"
                  className="border-primary/20 bg-primary/8 text-primary"
                >
                  Ready to use
                </Badge>
                <div className="space-y-3">
                  <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                    Keep the good inputs. Drop the clutter around them.
                  </h2>
                  <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground">
                    The page now focuses on the main promise and uses a lighter, calmer visual
                    structure in both themes.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="cursor-pointer rounded-full px-6"
                    onClick={openPrimary}
                  >
                    {token ? "Go to dashboard" : "Create your workspace"}
                    <ArrowRight size={16} />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="cursor-pointer rounded-full px-6"
                    onClick={openSecondary}
                  >
                    Sign up
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-border/80 bg-card/85">
      <CardHeader className="space-y-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-sm leading-6">{description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}

function MiniRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-card px-4 py-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
