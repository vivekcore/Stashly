import { useState, type ReactNode } from "react";
import { getEmbedUrl } from "../../Helper/YtEmbeedUrl";
import TwitterEmbed from "../../Helper/TwitterEmbeedTweets";
import LinkedInEmbed from "../../Helper/LinkedInEmbed";

export type ContentType =
  | "twitter"
  | "youtube"
  | "linkedin"
  | "image"
  | "video"
  | "article"
  | "audio";

interface CardProps {
  IconLeft: ReactNode;
  Title: string;
  IconRight1?: ReactNode;
  IconRight2?: ReactNode;
  Heading?: string;
  Image?: string;
  Paragraph?: string;
  Description?: string;
  Tags: string[];
  Date?: string;
  link: string;
  type?: ContentType;
}
export const Card = (props: CardProps) => {
  const [date] = useState(() => {
    const date = new Date();
    return date.toLocaleString();
  });

  const contentType = props.type?.toLowerCase() || "";
  const isYoutube = contentType === "youtube" || contentType === "video";

  return (
    <div className="flex flex-col bg-muted text-foreground hover:shadow-lg hover:border-border transition-all duration-300 aspect-square scrollbar-light scroll-smooth overflow-y-auto  border-border/40 rounded-2xl border p-5 shadow-sm group">
      <div className="flex items-center justify-between xl:mb-2">
        <div className="flex items-center gap-3">
          <div className="text-primary bg-primary/10 p-2 rounded-xl transition-colors group-hover:bg-primary/20">
            {props.IconLeft}
          </div>
          <span className="font-semibold text-lg tracking-tight">{props.Title}</span>
        </div>
        <div className="ml-2 flex items-center gap-2 text-muted-foreground">
          {props.IconRight1 && <div className="hover:text-foreground cursor-pointer transition-transform hover:scale-110 active:scale-95 p-1">{props.IconRight1}</div>}
          {props.IconRight2 && <div className="hover:text-foreground cursor-pointer transition-transform hover:scale-110 active:scale-95 p-1">{props.IconRight2}</div>}
        </div>
      </div>
      
      {props.Heading && (
        <h2 className="mt-3 text-xl font-bold leading-tight group-hover:text-primary transition-colors">{props.Heading}</h2>
      )}
      
      {props.Description && (
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{props.Description}</p>
      )}
      
      {props.Image && (
        <div className="mt-4 overflow-hidden rounded-xl border border-border/50">
          <img className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" src={props.Image} alt={props.Heading || "Card content"} />
        </div>
      )}
      
      {props.Paragraph && <p className="mt-4 text-sm leading-relaxed">{props.Paragraph}</p>}
      
      <div className="mx-auto mt-4 w-full h-full flex flex-col justify-start">
        {isYoutube ? (
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full rounded-lg"
              src={getEmbedUrl(props.link)}
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        ) : contentType === "twitter" ? (
          <TwitterEmbed  link={props.link} />
        ) : contentType === "linkedin" ? (
          <LinkedInEmbed  link={props.link} title={props.Title} description={props.Description} />
        ) : contentType === "image" ? (
          <img className="mt-4 w-full" src={props.link} alt={props.Title} />
        ) : contentType === "article" ? (
          <a
            className="text-blue-500 underline"
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read article
          </a>
        ) : contentType === "audio" ? (
          <audio controls className="w-full">
            <source src={props.link} />
            Your browser does not support the audio element.
          </audio>
        ) : (
          props.link && (
            <a
              className="text-blue-500 underline"
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.link}
            </a>
          )
        )}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {props.Tags.map((val, index) => (
          <span
            className="bg-accent/50 text-secondary-foreground hover:bg-secondary/80 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors"
            key={index}
          >
            {val}
          </span>
        ))}
      </div>
      <p className="text-muted-foreground mt-4 text-[11px] font-medium flex items-center gap-1.5 opacity-70 uppercase tracking-wider">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
        Added {date}
      </p>
    </div>
  );
};
