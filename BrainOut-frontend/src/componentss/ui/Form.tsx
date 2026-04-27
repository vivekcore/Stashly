import { X } from "lucide-react";
import { Button } from "./Button";
import { useAppDispatch } from "../../app/hooks";
import { toggle } from "../../features/FormSlice";
import { useState } from "react";
import type { FormEvent } from "react";
import { DATABASE_URL } from "../../config";
import axios from "axios";
import { detectLinkType, isImageUrl } from "../../Helper/urlDetector";
import { toast } from "react-toastify";

const contentTypes = ["image", "video", "article", "audio"];
const linktypes = ["Other", "Twitter", "Youtube", "Linkedin"];
const Form = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [linktype, setLinktype] = useState(linktypes[0]);
  const [type, setType] = useState(contentTypes[0]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
 const notify = () => toast("Content added sucessfully 🎉")
  const handleLinkChange = (value: string) => {
    setLink(value);
    if (value) {
      const detected = detectLinkType(value);
      setLinktype(detected.linkType);
      if (isImageUrl(value)) {
        setType("image");
      } else {
        setType(detected.type);
      }
    }
  };

  const handleClose = () => {
    setTitle("");
    setLink("");
    setType(contentTypes[0]);
    setDescription("");
    setTags("");
    dispatch(toggle());
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !link.trim()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${DATABASE_URL}/user/content`,
        { title, link, type, description, linkType: linktype },
        {
          headers: { "Content-Type": "application/json", Authorization: token },
        },
      );
      notify()
      handleClose();

    } catch (err) {
      console.error("Error adding content", err);
    }
  };

  const isFormValid = title.trim() !== "" && link.trim() !== "";

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-background text-foreground shadow-2xl relative z-10 w-full max-w-md sm:max-w-xl mx-4 overflow-hidden rounded-2xl border border-border/50 p-6 sm:p-8 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-border/40">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Add New Content</h2>
        <div className="opacity-70 hover:opacity-100 transition-opacity">
          <Button varient="primary" onclick={handleClose}>
            <X size={18} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-5 overflow-y-auto max-h-[65vh] pr-2 scrollbar-light">
        <div className="space-y-1.5 focus-within:text-primary transition-colors">
          <label className="block text-sm font-semibold tracking-wide">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full rounded-xl border border-input bg-background/50 px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-background"
            type="text"
            placeholder="What's this about?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="space-y-1.5 focus-within:text-primary transition-colors">
          <label className="block text-sm font-semibold tracking-wide">
            Link <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full rounded-xl border border-input bg-background/50 px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-background"
            type="url"
            placeholder="https://twitter.com or https://youtube.com/watch?v=..."
            value={link}
            onChange={(e) => handleLinkChange(e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5 focus-within:text-primary transition-colors">
            <label className="block text-sm font-semibold tracking-wide">
              Link type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-xl border border-input bg-background/50 px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-background cursor-pointer"
                value={linktype}
                onChange={(e) => setLinktype(e.target.value)}
                required
              >
                {linktypes.map((ct) => (
                  <option key={ct} value={ct}>
                    {ct}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
          <div className="space-y-1.5 focus-within:text-primary transition-colors">
            <label className="block text-sm font-semibold tracking-wide">
              Content Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-xl border border-input bg-background/50 px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-background cursor-pointer"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {contentTypes.map((ct) => (
                  <option key={ct} value={ct}>
                    {ct.charAt(0).toUpperCase() + ct.slice(1)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 focus-within:text-primary transition-colors">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold tracking-wide">Description</label>
            <span className="text-xs text-muted-foreground/70 font-medium">Optional</span>
          </div>
          <textarea
            className="w-full rounded-xl border border-input bg-background/50 p-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-background min-h-25 resize-y"
            placeholder="Add a short note or summary..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-1.5 focus-within:text-primary transition-colors">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold tracking-wide">Tags</label>
            <span className="text-xs text-muted-foreground/70 font-medium">Optional</span>
          </div>
          <input
            className="w-full rounded-xl border border-input bg-background/50 px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-background"
            type="text"
            placeholder="tag1, tag2, productivity..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
      </div>

      <div className="pt-2">
        <Button varient="primary" size="sm" className="w-full" disabled={!isFormValid}>
          <div className="py-1 text-base font-semibold tracking-wide">
            Save Content
          </div>
        </Button>
      </div>
    </form>
  );
};

export default Form;
