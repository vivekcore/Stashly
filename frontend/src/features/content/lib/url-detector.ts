import type { ContentType, ContentWebsite } from "@/features/content/types";

export const detectLinkType = (
  url: string,
): { website: ContentWebsite; type: ContentType } => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      return { website: "youtube", type: "video" };
    }
    if (hostname.includes("twitter.com") || hostname.includes("x.com")) {
      return { website: "twitter", type: "article" };
    }
    if (hostname.includes("linkedin.com")) {
      return { website: "linkedin", type: "article" };
    }
  } catch {
    return { website: "other", type: "article" };
  }
  return { website: "other", type: "article" };
};

export const isImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp"];
    return imageExtensions.some(ext => pathname.endsWith(ext));
  } catch {
    return false;
  }
};
