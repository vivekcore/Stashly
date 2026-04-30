import { Link2, LogOut, Plus } from "lucide-react";
import { NavLink } from "react-router";
import { useAppDispatch } from "@/app/hooks";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { toggle } from "@/features/FormSlice";
import { toggle as logoutAleart } from "@/features/AlertSlice";
import { cn } from "@/lib/utils";
export function AppHeader() {
  const dispatch = useAppDispatch();
  const mobileNavItems = [
    { to: "/home/dashboard", label: "Dashboard" },
    { to: "/home/youtube", label: "Youtube" },
    { to: "/home/twitter", label: "Twitter" },
    { to: "/home/linkedin", label: "LinkedIn" },
    { to: "/home/text-editor", label: "Editor" },
  ];
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/home/dashboard`;

    if (navigator.share) {
      await navigator.share({
        title: "Stashly",
        text: "Open my Stashly workspace",
        url: shareUrl,
      });
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
  };

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-30 border-b backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-4 py-2 sm:py-3 md:px-6">
        <div className="min-w-0">
          <p className="text-muted-foreground hidden text-sm font-medium sm:block">
            Workspace
          </p>
          <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg">
            Content dashboard
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="shrink-0 [&>button]:h-11 [&>button]:w-11">
            <ThemeToggle />
          </div>
          <Button
            variant="outline"
            size="icon"
            aria-label="Share workspace"
            className="h-11 w-11 sm:w-auto sm:px-4"
            onClick={() => void handleShare()}
          >
            <Link2 size={16} className="shrink-0" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button
            size="icon"
            aria-label="Add content"
            className="h-11 w-11 sm:w-auto sm:px-4"
            onClick={() => dispatch(toggle())}
          >
            <Plus size={16} className="shrink-0" />
            <span className="hidden sm:inline">Add content</span>
          </Button>
        </div>
      </div>
      <div className="border-border/60 border-y px-4 py-2 lg:hidden">
        <div className="flex items-center gap-2 overflow-x-auto">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "shrink-0 rounded-full px-3 py-1 text-sm font-medium",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            className="bg-primary-foreground m-0 ml-auto rounded-2xl border px-3 py-1 text-sm font-medium"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Top
          </button>
          <button
            onClick={() => dispatch(logoutAleart())}
            className="bg-primary-foreground rounded-2xl border px-3 py-1 text-sm font-medium"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
