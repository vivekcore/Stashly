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
  const [tags, setTags] = useState([""]);
  const notify = () => toast("Content added sucessfully 🎉");

  //Auto matich detect links and change the type of links in select feilds
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

  //closing the form and resetting the values
  const handleClose = () => {
    setTitle("");
    setLink("");
    setType(contentTypes[0]);
    setDescription("");
    setTags([""]);
    dispatch(toggle());
  };

  //handling the sibmisson of form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !link.trim()) {
      return;
    }
    //Function for formatting tags properrly with removing spaces and add '#'
    const Items = handleTags(tags);

    //Database call posting data 
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${DATABASE_URL}/user/content`,
        { title, link, type, description, linkType: linktype, tags: Items },
        {
          headers: { "Content-Type": "application/json", Authorization: token },
        },
      );
      notify();
      handleClose();
    } catch (err) {
      console.error("Error adding content", err);
    }
  };

  //Tags formatting function
  function handleTags(e: string[]) {
    let newString = "";
    e.map((v) => (newString += v));
    const array = newString.includes(",") ? newString.split(",") : [newString];
    const newArray = array.map((v) => {
      if (v.includes("#")) {
        if (v.charAt(0) !== "#") {
          v = v.replace(/\s+/g, "");
          v = "#" + v;
        }
      } else {
        v = v.replace(/\s+/g, "");
        v = "#" + v;
      }
      return v;
    });
    return newArray;
  }

  //Check for non empty title and link feild
  const isFormValid = title.trim() !== "" && link.trim() !== "";

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-background text-foreground border-border/50 animate-in fade-in zoom-in-95 relative z-10 mx-4 flex w-full max-w-md flex-col gap-6 overflow-hidden rounded-2xl border p-6 shadow-2xl duration-200 sm:max-w-xl sm:p-8`}
    >
      <div className="border-border/40 flex items-center justify-between border-b pb-4">
        <h2 className="text-foreground text-2xl font-bold tracking-tight">
          Add New Content
        </h2>
        <div className="opacity-70 transition-opacity hover:opacity-100">
          <Button varient="primary" onclick={handleClose}>
            <X size={18} />
          </Button>
        </div>
      </div>

      <div className="scrollbar-light flex max-h-[65vh] flex-col gap-5 overflow-y-auto pr-2">
        <div className="focus-within:text-primary space-y-1.5 transition-colors">
          <label className="block text-sm font-semibold tracking-wide">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            className="border-input bg-background/50 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 focus:bg-background w-full rounded-xl border px-4 py-2.5 text-sm transition-all outline-none focus:ring-2"
            type="text"
            placeholder="What's this about?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="focus-within:text-primary space-y-1.5 transition-colors">
          <label className="block text-sm font-semibold tracking-wide">
            Link <span className="text-red-500">*</span>
          </label>
          <input
            className="border-input bg-background/50 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 focus:bg-background w-full rounded-xl border px-4 py-2.5 text-sm transition-all outline-none focus:ring-2"
            type="url"
            placeholder="https://twitter.com or https://youtube.com/watch?v=..."
            value={link}
            onChange={(e) => handleLinkChange(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="focus-within:text-primary space-y-1.5 transition-colors">
            <label className="block text-sm font-semibold tracking-wide">
              Link type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="border-input bg-background/50 focus:border-primary focus:ring-primary/20 focus:bg-background w-full cursor-pointer appearance-none rounded-xl border px-4 py-2.5 text-sm transition-all outline-none focus:ring-2"
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
              <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="focus-within:text-primary space-y-1.5 transition-colors">
            <label className="block text-sm font-semibold tracking-wide">
              Content Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="border-input bg-background/50 focus:border-primary focus:ring-primary/20 focus:bg-background w-full cursor-pointer appearance-none rounded-xl border px-4 py-2.5 text-sm transition-all outline-none focus:ring-2"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {contentTypes.map((ct) => (
                  <option key={ct} value={ct}>
                    {ct.charAt(0).toUpperCase() + ct.slice(1)}
                  </option>
                ))}
              </select>
              <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="focus-within:text-primary space-y-1.5 transition-colors">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold tracking-wide">
              Description
            </label>
            <span className="text-muted-foreground/70 text-xs font-medium">
              Optional
            </span>
          </div>
          <textarea
            className="border-input bg-background/50 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 focus:bg-background min-h-25 w-full resize-y rounded-xl border p-4 text-sm transition-all outline-none focus:ring-2"
            placeholder="Add a short note or summary..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="focus-within:text-primary space-y-1.5 transition-colors">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold tracking-wide">
              Tags
            </label>
            <span className="text-muted-foreground/70 text-xs font-medium">
              Optional
            </span>
          </div>
          <input
            className="border-input bg-background/50 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 focus:bg-background w-full rounded-xl border px-4 py-2.5 text-sm transition-all outline-none focus:ring-2"
            type="text"
            placeholder="tag1, tag2, productivity..."
            value={tags}
            onChange={(e) => setTags([e.target.value])}
          />
        </div>
      </div>

      <div className="pt-2">
        <Button
          varient="primary"
          size="sm"
          className="w-full"
          disabled={!isFormValid}
        >
          <div className="py-1 text-base font-semibold tracking-wide">
            Save Content
          </div>
        </Button>
      </div>
    </form>
  );
};

export default Form;
