export type ContentType = "image" | "video" | "article" | "audio";

export type ContentWebsite = "youtube" | "twitter" | "linkedin" | "other";

export type ContentFilter = "all" | ContentWebsite;

export interface ContentUser {
  id: string;
  name: string;
  email: string;
}

export interface ContentItem {
  id: string;
  title: string;
  link: string;
  website: ContentWebsite;
  slug: string;
  type: ContentType;
  tags: string[];
  description?: string;
  user: ContentUser;
  createdAt: string;
  updatedAt: string;
}

export interface NewContentPayload {
  title: string;
  link: string;
  website: ContentWebsite;
  slug?: string;
  type: ContentType;
  description: string;
  tags: string[];
}
