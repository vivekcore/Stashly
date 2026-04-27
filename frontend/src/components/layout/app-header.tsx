import { Link2, Plus } from "lucide-react";

import { useAppDispatch } from "@/app/hooks";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { toggle } from "@/features/FormSlice";

export function AppHeader() {
  const dispatch = useAppDispatch();

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
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-4 py-2 sm:py-3 md:px-6">
        <div className="min-w-0">
          <p className="hidden text-sm font-medium text-muted-foreground sm:block">Workspace</p>
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
    </header>
  );
}
