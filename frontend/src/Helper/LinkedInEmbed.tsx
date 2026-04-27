import { Linkedin } from "lucide-react";

interface LinkedInEmbedProps {
  link: string;
  title?: string;
  description?: string;
}

const LinkedInEmbed = ({ link, title, description }: LinkedInEmbedProps) => {
  const handleLinkedInClick = () => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div 
      onClick={handleLinkedInClick}
      className="cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3 border-b border-gray-100 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700">
          <Linkedin className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{title || "LinkedIn Post"}</p>
          <p className="text-xs text-gray-500">LinkedIn</p>
        </div>
      </div>
      {description && (
        <p className="p-3 text-sm text-gray-700 line-clamp-3">{description}</p>
      )}
      <div className="flex justify-end gap-4 border-t border-gray-100 p-2">
        <span className="rounded px-3 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100">
          View on LinkedIn →
        </span>
      </div>
    </div>
  );
};

export default LinkedInEmbed;
