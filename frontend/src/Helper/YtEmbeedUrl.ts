export const  getEmbedUrl = (shareLink:string):string => {
  const id = shareLink.includes("youtu.be/")
    ? shareLink.split("youtu.be/")[1].split("?")[0]
    : new URL(shareLink).searchParams.get("v");
  return `https://www.youtube.com/embed/${id}`;
}

// Usage

// → "https://www.youtube.com/embed/dQw4w9WgXcQ"