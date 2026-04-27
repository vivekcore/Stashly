export const detectLinkType = (url: string): { linkType: string; type: string } => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      return { linkType: "Youtube", type: "video" };
    }
    if (hostname.includes("twitter.com") || hostname.includes("x.com")) {
      return { linkType: "Twitter", type: "article" };
    }
    if (hostname.includes("linkedin.com")) {
      return { linkType: "Linkedin", type: "article" };
    }
  } catch {
    return { linkType: "Other", type: "article" };
  }
  return { linkType: "Other", type: "article" };
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
