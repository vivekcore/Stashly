import axios from "axios";

import { DATABASE_URL } from "@/config";
import type {
  ContentFilter,
  ContentItem,
  NewContentPayload,
} from "@/features/content/types";

function getAuthHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: token,
  };
}

export async function fetchContentItems(
  token: string,
  website: ContentFilter,
): Promise<ContentItem[]> {
  if (website !== "all") {
    const response = await axios.get(`${DATABASE_URL}/content/websitetype`, {
      params: { websiteType: website },
      headers: getAuthHeaders(token),
    });

    return response.data?.data?.content ?? [];
  }

  const response = await axios.get(`${DATABASE_URL}/content/my`, {
    headers: getAuthHeaders(token),
  });

  return response.data?.data?.content ?? [];
}

export async function createContentItem(token: string, payload: NewContentPayload) {
  await axios.post(`${DATABASE_URL}/content/add`, payload, {
    headers: getAuthHeaders(token),
  });
}

export async function deleteContentItem(token: string, contentId: string) {
  await axios.delete(`${DATABASE_URL}/content/My`, {
    headers: getAuthHeaders(token),
    data: { contentId },
  });
}

export async function fetchContentItemBySlug(slug: string): Promise<ContentItem> {
  const response = await axios.get(`${DATABASE_URL}/content/${slug}`);
  return response.data.data as ContentItem;
}
