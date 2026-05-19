import { useEffect, useState } from "react";

interface TwitterEmbedProps {
  link: string;
}

const TwitterEmbed = ({ link }: TwitterEmbedProps) => {
  const [html, setHtml] = useState<string>("");

   useEffect(() => {
    const fetchData = async () => {
      await fetch(
      `https://publish.twitter.com/oembed?url=${encodeURIComponent(link)}&omit_script=true`
    )
      .then((r) => r.json())
      .then((data) => setHtml(data.html))
      .catch(() => setHtml("<p>Failed to load tweet</p>"));
    }
    fetchData()
  }, [link]);

  useEffect(() => {
    if (html && (window as any).twttr) {
      (window as any).twttr.widgets.load();
    }
  }, [html]);

  return <div className="aspect-video scroll-auto" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default TwitterEmbed;