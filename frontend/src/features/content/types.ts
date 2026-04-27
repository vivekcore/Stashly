export type ContentKind =
  | "twitter"
  | "youtube"
  | "linkedin"
  | "image"
  | "video"
  | "article"
  | "audio";

export type ContentFilter = "Other" | "Twitter" | "Youtube" | "Linkedin";

export interface ContentItem {
  _id: string;
  title: string;
  link: string;
  linkType: ContentFilter;
  type: ContentKind;
  tags?: string[];
  description?: string;
}

export interface NewContentPayload {
  title: string;
  link: string;
  linkType: ContentFilter;
  type: Extract<ContentKind, "image" | "video" | "article" | "audio">;
  description: string;
  tags: string[];
}
