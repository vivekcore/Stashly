import { useEffect, useState } from "react";
import { ChevronRight, FileText, LoaderCircle, Plus } from "lucide-react";

import { fetchNotes } from "@/features/editor/api/notes-api";
import type { NoteItem } from "@/features/editor/types";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

interface NotesListProps {
  onSelectNote: (noteId: string) => void;
  onCreateNote: () => void;
  refreshKey: number;
}

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  const diffMonth = Math.floor(diffDay / 30);
  return `${diffMonth}mo ago`;
}

export function NotesList({
  onSelectNote,
  onCreateNote,
  refreshKey,
}: NotesListProps) {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadNotes() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchNotes(1, 50);
        if (isMounted) {
          setNotes(response.notes);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load your notes.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadNotes();

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoaderCircle className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>Could not load notes</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (notes.length === 0) {
    return (
      <Card className="mx-auto max-w-2xl border-dashed">
        <CardHeader className="items-center text-center">
          <div className="mx-auto rounded-2xl bg-primary/10 p-4 text-primary">
            <FileText size={24} />
          </div>
          <CardTitle>No notes yet</CardTitle>
          <CardDescription>
            Create your first note to start writing. Your notes are saved
            automatically as you type.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={onCreateNote}>
            <Plus size={16} />
            Create your first note
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </p>
        <Button onClick={onCreateNote} size="sm">
          <Plus size={16} />
          New Note
        </Button>
      </div>

      <div className="divide-y divide-border/50 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        {notes.map((note) => (
          <button
            key={note.id}
            type="button"
            onClick={() => onSelectNote(note.id)}
            className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-accent/50"
          >
            <FileText size={18} className="mt-0.5 shrink-0 text-muted-foreground" />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {note.title}
              </p>
              {note.tags && note.tags.length > 0 && note.tags[0] !== "" && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {note.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                  {note.tags.length > 3 && (
                    <span className="text-[10px] text-muted-foreground">
                      +{note.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            <span className="shrink-0 text-xs text-muted-foreground">
              {relativeTime(note.updatedAt)}
            </span>

            <ChevronRight
              size={16}
              className="shrink-0 text-muted-foreground"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
