export interface NoteItem {
  id: string;
  title: string;
  tags: string[];
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoteDetail extends NoteItem {
  content: Record<string, any>;
}

export interface NotesListResponse {
  notes: NoteItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
