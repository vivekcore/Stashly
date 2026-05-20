import { useEffect, useState } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { Link, useParams } from "react-router";

import { ContentCard } from "@/features/content/components/content-card";
import { fetchContentItemBySlug } from "@/features/content/api/content-api";
import type { ContentItem } from "@/features/content/types";

export default function SharedContentPage() {
  const { slug = "" } = useParams();
  const [item, setItem] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadSharedContent() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchContentItemBySlug(slug);
        if (isMounted) {
          setItem(response);
        }
      } catch {
        if (isMounted) {
          setError("This shared content could not be loaded.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (slug) {
      void loadSharedContent();
      return () => {
        isMounted = false;
      };
    }

    setError("Missing share slug.");
    setIsLoading(false);
    return () => {
      isMounted = false;
    };
  }, [slug]);

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-primary underline underline-offset-4"
          to="/auth"
        >
          <ArrowLeft size={16} />
          Back to Stashly
        </Link>

        {isLoading ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <LoaderCircle className="animate-spin text-muted-foreground" />
          </div>
        ) : null}

        {!isLoading && error ? (
          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <h1 className="text-xl font-semibold">Shared content unavailable</h1>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          </div>
        ) : null}

        {!isLoading && item ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Shared by {item.user.name}</p>
              <h1 className="text-2xl font-semibold tracking-tight">{item.title}</h1>
            </div>
            <ContentCard item={item} />
          </div>
        ) : null}
      </div>
    </main>
  );
}

