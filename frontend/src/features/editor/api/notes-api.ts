import axios from "axios";

import { DATABASE_URL } from "@/config";
import type { NoteDetail, NotesListResponse } from "@/features/editor/types";

const api = axios.create({
  baseURL: DATABASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchNotes(
  page = 1,
  limit = 20,
): Promise<NotesListResponse> {
  const response = await api.get("/note/my-note-bulk", {
    params: { page, limit },
  });
  return response.data?.data as NotesListResponse;
}

export async function fetchNote(id: string): Promise<NoteDetail> {
  const response = await api.get(`/note/my-note/${id}`);
  return response.data?.data as NoteDetail;
}

export async function createNote(
  title: string,
  content: Record<string, any>,
  tags?: string[],
): Promise<NoteDetail> {
  const response = await api.post("/note/create", { title, content, tags });
  return response.data?.data as NoteDetail;
}

export async function updateNote(
  id: string,
  data: {
    title?: string;
    content?: Record<string, any>;
    tags?: string[];
    isArchived?: boolean;
  },
): Promise<NoteDetail> {
  const response = await api.patch(`/note/update/${id}`, data);
  return response.data?.data as NoteDetail;
}

export async function deleteNote(id: string): Promise<void> {
  await api.delete(`/note/delete/${id}`);
}
