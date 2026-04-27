import { useEffect, useState } from "react";
import { Box, LoaderCircle, Plus } from "lucide-react";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteContentItem, fetchContentItems } from "@/features/content/api";
import { ContentCard } from "@/features/content/content-card";
import type { ContentFilter, ContentItem } from "@/features/content/types";
import { toggle } from "@/features/FormSlice";
import { getToken } from "@/lib/session";

interface ContentGridProps {
  linkType: ContentFilter;
}

export function ContentGrid({ linkType }: ContentGridProps) {
  const refreshKey = useAppSelector((state) => state.ui.refreshKey);
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getToken();

    if (!storedToken) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    const token = storedToken;

    let isMounted = true;

    async function loadItems() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchContentItems(token, linkType);
        if (isMounted) {
          setItems(response);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load your content.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadItems();

    return () => {
      isMounted = false;
    };
  }, [linkType, refreshKey]);

  const handleDelete = async (id: string) => {
    const token = getToken();
    if (!token) {
      return;
    }

    await deleteContentItem(token, id);
    setItems((current) => current.filter((item) => item._id !== id));
    toast.success("Content deleted successfully.");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoaderCircle className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>Could not load content</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="mx-auto max-w-2xl border-dashed">
        <CardHeader className="items-center text-center">
          <div className="mx-auto rounded-2xl bg-primary/10 p-4 text-primary">
            <Box size={24} />
          </div>
          <CardTitle>No saved content yet</CardTitle>
          <CardDescription>
            Start by saving a link, image, note, or social post. This area will
            become your structured content library instead of a loose collection of
            pages.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => dispatch(toggle())}>
            <Plus size={16} />
            Add your first item
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {Array.isArray(items) && items?.map((item) => (
        <ContentCard key={item._id} item={item} onDelete={handleDelete} />
      ))}
    </div>
  );
}
