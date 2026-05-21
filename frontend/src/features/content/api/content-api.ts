import axios from "axios";

import { DATABASE_URL } from "@/config";
import type {
  ContentFilter,
  ContentItem,
  NewContentPayload,
} from "@/features/content/types";

const api = axios.create({
  baseURL: DATABASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchContentItems(
  website: ContentFilter,
): Promise<ContentItem[]> {
  if (website !== "all") {
    const response = await api.get("/content/websitetype", {
      params: { websiteType: website },
    });

    return response.data?.data?.content ?? [];
  }

  const response = await api.get("/content/my");

  return response.data?.data?.content ?? [];
}

export async function createContentItem(payload: NewContentPayload) {
  await api.post("/content/add", payload);
}

export async function deleteContentItem(contentId: string) {
  await api.delete("/content/My", {
    data: { contentId },
  });
}

export async function fetchContentItemBySlug(slug: string): Promise<ContentItem> {
  const response = await axios.get(`${DATABASE_URL}/content/${slug}`);
  return response.data.data as ContentItem;
}
