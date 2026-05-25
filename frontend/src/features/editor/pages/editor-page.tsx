import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";

import { SimpleEditor } from "@/features/editor/components/tiptap-templates/simple/simple-editor";
import { NotesList } from "@/features/editor/components/notes-list";
import {
  createNote,
  fetchNote,
  updateNote,
} from "@/features/editor/api/notes-api";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";

type View = "list" | "editor";
type EditorContentPayload = { type?: string; [key: string]: unknown };

export default function EditorPage() {
  const [view, setView] = useState<View>("list");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState<EditorContentPayload | null>(
    null,
  );
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoadingNote, setIsLoadingNote] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const noteTitleRef = useRef(noteTitle);
  const noteContentRef = useRef<EditorContentPayload | null>(noteContent);
  const selectedNoteIdRef = useRef(selectedNoteId);
  noteTitleRef.current = noteTitle;
  noteContentRef.current = noteContent;
  selectedNoteIdRef.current = selectedNoteId;

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const doSave = useCallback(async () => {
    const title = noteTitleRef.current || "Untitled";
    const content = noteContentRef.current;
    if (!content) return;

    try {
      setSaveStatus("saving");
      if (selectedNoteIdRef.current) {
        await updateNote(selectedNoteIdRef.current, { title, content });
      } else {
        const created = await createNote(title, content);
        setSelectedNoteId(created.id);
      }
      setSaveStatus("saved");
    } catch {
      setSaveStatus("saving");
    }
  }, []);

  const scheduleSave = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSaveStatus("saving");
    debounceRef.current = setTimeout(doSave, 2000);
  }, [doSave]);

  const handleContentChange = useCallback(
    (content: EditorContentPayload) => {
      noteContentRef.current = content;
      scheduleSave();
    },
    [scheduleSave],
  );

  const handleTitleChange = (title: string) => {
    noteTitleRef.current = title;
    setNoteTitle(title);
    scheduleSave();
  };

  const handleSelectNote = async (noteId: string) => {
    setIsLoadingNote(true);
    setSaveStatus("idle");
    try {
      const note = await fetchNote(noteId);
      setSelectedNoteId(noteId);
      setNoteTitle(note.title);
      setNoteContent(note.content as EditorContentPayload);
      noteTitleRef.current = note.title;
      noteContentRef.current = note.content as EditorContentPayload;
      setView("editor");
    } catch {
      setSaveStatus("saving");
    } finally {
      setIsLoadingNote(false);
    }
  };

  const handleCreateNote = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSelectedNoteId(null);
    selectedNoteIdRef.current = null;
    setNoteTitle("");
    noteTitleRef.current = "";
    setNoteContent(null);
    noteContentRef.current = null;
    setSaveStatus("idle");
    setView("editor");
  };

  const handleBackToList = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setView("list");
    setRefreshKey((k) => k + 1);
  };

  if (view === "list") {
    return (
      <div className="space-y-6">
        <Card className="border-border/60 from-card to-card/70 bg-linear-to-r">
          <CardHeader>
            <CardTitle>Text editor</CardTitle>
            <CardDescription>
              Capture longer notes without mixing editor UI into the dashboard
              shell.
            </CardDescription>
          </CardHeader>
        </Card>

        <NotesList
          onSelectNote={handleSelectNote}
          onCreateNote={handleCreateNote}
          refreshKey={refreshKey}
        />
      </div>
    );
  }

  if (isLoadingNote) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoaderCircle className="text-muted-foreground animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/60 from-card to-card/70 bg-linear-to-r">
        <CardHeader className="flex-row items-center gap-4 space-y-0">
          <Button variant="ghost" size="icon" onClick={handleBackToList}>
            <ArrowLeft size={20} />
          </Button>

          <div className="flex-1">
            <Input
              value={noteTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Note title..."
              className="border-none bg-transparent p-0 text-xl leading-none font-semibold tracking-tight shadow-none focus-visible:ring-0"
            />
          </div>

          <span className="text-muted-foreground shrink-0 text-xs">
            {saveStatus === "saving"
              ? "Saving..."
              : saveStatus === "saved"
                ? "Saved"
                : ""}
          </span>
        </CardHeader>
        <CardDescription className="px-6 pb-4">
          Edit your note. Changes are saved automatically.
        </CardDescription>
      </Card>

      <Card className="border-border/60 overflow-hidden">
        <CardContent className="p-0">
          <SimpleEditor
            initialContent={
              noteContent as unknown as { type: string; [key: string]: unknown }
            }
            onContentChange={handleContentChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
