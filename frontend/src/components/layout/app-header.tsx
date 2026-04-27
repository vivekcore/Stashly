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
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur md:px-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Workspace</p>
        <h1 className="text-lg font-semibold tracking-tight">Content dashboard</h1>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="outline" onClick={() => void handleShare()}>
          <Link2 size={16} />
          Share
        </Button>
        <Button onClick={() => dispatch(toggle())}>
          <Plus size={16} />
          Add content
        </Button>
      </div>
    </header>
  );
}
