import { useState, type FormEvent, type ReactNode } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";

import { detectLinkType, isImageUrl } from "@/features/content/lib/url-detector";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { createContentItem } from "@/features/content/api/content-api";
import type {
  ContentType,
  ContentWebsite,
} from "@/features/content/types";
import { contentSaved, setOpen } from "@/features/content/store/content-dialog-slice";

const contentTypes: ContentType[] = ["image", "video", "article", "audio"];
const websiteTypes: ContentWebsite[] = ["other", "twitter", "youtube", "linkedin"];

export function AddContentDialog() {
  const isOpen = useAppSelector((state) => state.ui.isOpen);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [website, setWebsite] = useState<ContentWebsite>("other");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState<ContentType>("article");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const closeDialog = () => {
    dispatch(setOpen(false));
  };

  const resetForm = () => {
    setTitle("");
    setLink("");
    setWebsite("other");
    setSlug("");
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
    setWebsite(detected.website);
    setType(isImageUrl(value) ? "image" : detected.type);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await createContentItem({
        title: title.trim(),
        link: link.trim(),
        website,
        slug: normalizeSlug(slug),
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
          <Button type="button" variant="ghost" size="icon" onClick={closeDialog}>
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
              <Field label="Website" required>
                <select
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value as ContentWebsite)}
                >
                  {websiteTypes.map((value) => (
                    <option key={value} value={value}>
                      {formatLabel(value)}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Content type" required>
                <select
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={type}
                  onChange={(event) => setType(event.target.value as ContentType)}
                >
                  {contentTypes.map((value) => (
                    <option key={value} value={value}>
                      {value[0].toUpperCase() + value.slice(1)}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Custom share slug">
              <Input
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="optional-custom-link"
              />
            </Field>

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
              <Button type="button" variant="outline" onClick={closeDialog}>
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

function normalizeSlug(value: string) {
  const normalized = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || undefined;
}

function formatLabel(value: string) {
  return value === "other" ? "Other" : value[0].toUpperCase() + value.slice(1);
}

