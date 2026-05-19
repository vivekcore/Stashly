import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { ContentGrid } from "@/features/content/components/content-grid";
import type { ContentFilter } from "@/features/content/types";

interface ContentPageProps {
  title: string;
  description: string;
  filter: ContentFilter;
}

export default function ContentPage({
  title,
  description,
  filter,
}: ContentPageProps) {
  return (
    <div className="space-y-6">
      <Card className="border-border/60 bg-linear-to-r from-card to-card/70">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>

      <ContentGrid websiteFilter={filter} />
    </div>
  );
}

