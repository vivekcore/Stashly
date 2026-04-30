import { useState, type FormEvent, type ReactNode } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";

import { detectLinkType, isImageUrl } from "@/Helper/urlDetector";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createContentItem } from "@/features/content/api";
import type { ContentFilter, NewContentPayload } from "@/features/content/types";
import { contentSaved, setOpen } from "@/features/FormSlice";
import { getToken } from "@/lib/session";

const contentTypes: NewContentPayload["type"][] = ["image", "video", "article", "audio"];
const linkTypes: ContentFilter[] = ["Other", "Twitter", "Youtube", "Linkedin"];

export function AddContentDialog() {
  const isOpen = useAppSelector((state) => state.ui.isOpen);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [linkType, setLinkType] = useState<ContentFilter>("Other");
  const [type, setType] = useState<NewContentPayload["type"]>("article");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const closeDialog = () => {
    dispatch(setOpen(false));
  };

  const resetForm = () => {
    setTitle("");
    setLink("");
    setLinkType("Other");
    setType("article");
    setDescription("");
    setTags("");
  };

  const handleLinkChange = (value: string) => {
    setLink(value);

    if (!value) {
      return;
    }

    const detected = detectLinkType(value);
    setLinkType(detected.linkType as ContentFilter);
    setType(isImageUrl(value) ? "image" : (detected.type as NewContentPayload["type"]));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = getToken();

    if (!token) {
      return;
    }

    setIsSaving(true);

    try {
      await createContentItem(token, {
        title: title.trim(),
        link: link.trim(),
        linkType,
        type,
        description: description.trim(),
        tags: normalizeTags(tags),
      });

      dispatch(contentSaved());
      toast.success("Content added successfully.");
      resetForm();
      closeDialog();
    } catch {
      toast.error("Failed to save content.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-2xl  ">
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div className="space-y-1">
            <CardTitle>Add content</CardTitle>
            <CardDescription>
              Save links with a clearer structure and consistent metadata.
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={closeDialog}>
            <X size={18} />
          </Button>
        </CardHeader>

        <CardContent>
          <form className="space-y-2 sm:space-y-4" onSubmit={handleSubmit}>
            <Field label="Title" required>
              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Weekly market notes"
                required
              />
            </Field>

            <Field label="Link" required>
              <Input
                type="url"
                value={link}
                onChange={(event) => handleLinkChange(event.target.value)}
                placeholder="https://..."
                required
              />
            </Field>

            <div className="grid sm:gap-4 gap-2 md:grid-cols-2">
              <Field label="Link type" required>
                <select
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={linkType}
                  onChange={(event) => setLinkType(event.target.value as ContentFilter)}
                >
                  {linkTypes.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Content type" required>
                <select
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value as NewContentPayload["type"])
                  }
                >
                  {contentTypes.map((value) => (
                    <option key={value} value={value}>
                      {value[0].toUpperCase() + value.slice(1)}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Description">
              <Textarea
                className="min-h-8 pb-0 sm:min-h-24 "
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Short summary or note"
              />
            </Field>

            <Field label="Tags">
              <Input
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                placeholder="design, react, notes"
              />
            </Field>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving || !title.trim() || !link.trim()}>
                {isSaving ? "Saving..." : "Save content"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  children,
  label,
  required,
}: {
  children: ReactNode;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}

function normalizeTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((tag) => (tag.startsWith("#") ? tag : `#${tag.replace(/\s+/g, "")}`));
}
