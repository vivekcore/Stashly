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
  linkType: ContentFilter,
): Promise<ContentItem[]> {
  if (linkType !== "Other") {
    const response = await axios.get(`${DATABASE_URL}/user/content/linktype`, {
      params: { linkType },
      headers: getAuthHeaders(token),
    });

    return Array.isArray(response.data.msg) ? response.data.msg : response.data;
  }

  const response = await axios.get(`${DATABASE_URL}/user/content`, {
    headers: getAuthHeaders(token),
  });

  return Array.isArray(response.data.msg) ? response.data.msg : response.data;
}

export async function createContentItem(token: string, payload: NewContentPayload) {
  await axios.post(`${DATABASE_URL}/user/content`, payload, {
    headers: getAuthHeaders(token),
  });
}

export async function deleteContentItem(token: string, contentId: string) {
  await axios.delete(`${DATABASE_URL}/user/content`, {
    headers: getAuthHeaders(token),
    data: { contentId },
  });
}
