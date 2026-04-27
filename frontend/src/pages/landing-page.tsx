import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import Logo from "@/assets/logo.png";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SparklesCore } from "@/components/ui/sparkles";
import { getToken } from "@/lib/session";

export default function LandingPage() {
  const navigate = useNavigate();
  const token = getToken();
  const theme = localStorage.getItem("vite-ui-theme");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="absolute inset-0">
        <SparklesCore
          id="stashly-hero"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="h-full w-full"
          particleColor={theme === "light" ? "#0f172a" : "#f8fafc"}
        />
      </div>

      <Card className="relative z-10 w-full max-w-4xl border-border/60 bg-card/80 backdrop-blur-xl">
        <CardContent className="grid gap-10 p-8 md:grid-cols-[1.3fr_1fr] md:p-12">
          <div className="space-y-6">
            <div className="inline-flex justify-center items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2">
              <img src={Logo} alt="Stashly Logo" className="text-primary" width={18} height={18} />
              <span className="text-md font-medium">Stashly</span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
                Turn scattered links into a clean content workspace.
              </h1>
              <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
                Save videos, tweets, articles, images, and notes in one structured
                dashboard with clear navigation and a better editing flow.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => navigate(token ? "/home/dashboard" : "/signin")}>
                {token ? "Open dashboard" : "Get started"}
                <ArrowRight size={16} />
              </Button>
              <Button variant="outline" onClick={() => navigate("/signup")}>
                Create account
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <HighlightCard
              title="Structured library"
              description="A single content grid replaces the old page-by-page sprawl."
            />
            <HighlightCard
              title="Reusable UI"
              description="Shared shadcn-style primitives now drive forms, cards, and actions."
            />
            <HighlightCard
              title="Cleaner frontend"
              description="Pages, layout, and content logic are split into focused modules."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function HighlightCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="border-border/60 bg-background/60">
      <CardHeader className="p-5">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="leading-6">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
