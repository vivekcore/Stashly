import {
  ExternalLink,
  FileAudio,
  FileText,
  Image as ImageIcon,
  Linkedin,
  Share2,
  Trash2,
  Twitter,
  Youtube,
} from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router";

import LinkedInEmbed from "@/features/content/lib/linkedin-embed";
import TwitterEmbed from "@/features/content/lib/twitter-embed";
import { getEmbedUrl } from "@/features/content/lib/youtube-embed-url";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import type { ContentItem } from "@/features/content/types";

interface ContentCardProps {
  item: ContentItem;
  onDelete?: (id: string) => Promise<void>;
}

const iconMap = {
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
  other: FileText,
  image: ImageIcon,
  video: Youtube,
  article: FileText,
  audio: FileAudio,
};

export function ContentCard({ item, onDelete }: ContentCardProps) {
  const contentType = (item.website || item.type) as keyof typeof iconMap;
  const Icon = iconMap[contentType] ?? FileText;

  const handleShare = async () => {
    const shareUrl = item.slug
      ? `${window.location.origin}${window.location.pathname}#/shared/${item.slug}`
      : item.link;

    await navigator.clipboard.writeText(shareUrl);
    toast.success(item.slug ? "Share link copied." : "Original link copied.");
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden border-border/70 bg-card/80 backdrop-blur">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <Icon size={18} />
            </div>
            <div className="space-y-1">
              <CardTitle className="line-clamp-2 text-base">{item.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {item.website === "other" ? item.type : item.website}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(item.link, "_blank", "noopener,noreferrer")}
            >
              <ExternalLink size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => void handleShare()}
            >
              <Share2 size={16} />
            </Button>
            {onDelete ? (
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={() => void onDelete(item.id)}
              >
                <Trash2 size={16} />
              </Button>
            ) : null}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        {item.description ? (
          <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
        ) : null}

        <div className="overflow-hidden rounded-xl border border-border/60 bg-background/60">
          <Preview item={item} />
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex flex-wrap gap-2">
        {item.slug ? (
          <Link
            className="text-sm font-medium text-primary underline underline-offset-4"
            to={`/shared/${item.slug}`}
          >
            Open share page
          </Link>
        ) : null}
        {(item.tags ?? []).map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}

function Preview({ item }: { item: ContentItem }) {
  const normalizedType = item.website !== "other" ? item.website : item.type;

  if (normalizedType === "youtube" || normalizedType === "video") {
    return (
      <div className="aspect-video">
        <iframe
          className="h-full w-full"
          src={getEmbedUrl(item.link)}
          title={item.title}
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  if (normalizedType === "twitter") {
    return (
      <div className="max-h-80 overflow-auto p-3">
        <TwitterEmbed link={item.link} />
      </div>
    );
  }

  if (normalizedType === "linkedin") {
    return (
      <div className="p-3">
        <LinkedInEmbed
          link={item.link}
          title={item.title}
          description={item.description}
        />
      </div>
    );
  }

  if (normalizedType === "image") {
    return <img className="h-64 w-full object-cover" src={item.link} alt={item.title} />;
  }

  if (normalizedType === "audio") {
    return (
      <div className="p-4">
        <audio controls className="w-full">
          <source src={item.link} />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }

  return (
    <div className="flex min-h-48 flex-col justify-between gap-4 p-4">
      <p className="text-sm text-muted-foreground">
        Open the saved link in a new tab to view the original content.
      </p>
      <a
        className="text-sm font-medium break-all text-primary underline underline-offset-4"
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.link}
      </a>
    </div>
  );
}

