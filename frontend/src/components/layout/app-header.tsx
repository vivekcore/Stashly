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
      <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">Workspace</p>
          <h1 className="truncate text-lg font-semibold tracking-tight">Content dashboard</h1>
        </div>

        <div className="grid w-full grid-cols-[auto,minmax(0,1fr),minmax(0,1fr)] gap-2 sm:w-auto sm:grid-cols-none sm:auto-cols-max sm:grid-flow-col">
          <div className="shrink-0 [&>button]:h-11 [&>button]:w-11">
            <ThemeToggle />
          </div>
          <Button
            variant="outline"
            className="min-h-[44px] min-w-0 px-3 sm:px-4"
            onClick={() => void handleShare()}
          >
            <Link2 size={16} className="shrink-0" />
            <span className="truncate">Share</span>
          </Button>
          <Button
            className="min-h-[44px] min-w-0 px-3 sm:px-4"
            onClick={() => dispatch(toggle())}
          >
            <Plus size={16} className="shrink-0" />
            <span className="truncate">Add content</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
