"use client";

import { useEffect, useRef, useState } from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";

// --- UI Primitives ---
import { Button } from "@/features/editor/components/tiptap-ui-primitive/button";
import { Spacer } from "@/features/editor/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/features/editor/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/features/editor/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/features/editor/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/features/editor/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/features/editor/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/features/editor/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/features/editor/components/tiptap-node/list-node/list-node.scss";
import "@/features/editor/components/tiptap-node/image-node/image-node.scss";
import "@/features/editor/components/tiptap-node/heading-node/heading-node.scss";
import "@/features/editor/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/features/editor/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/features/editor/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/features/editor/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/features/editor/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/features/editor/components/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/features/editor/components/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/features/editor/components/tiptap-ui/link-popover";
import { MarkButton } from "@/features/editor/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/features/editor/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/features/editor/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/features/editor/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/features/editor/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/features/editor/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useIsBreakpoint } from "@/shared/hooks/use-is-breakpoint";
import { useWindowSize } from "@/shared/hooks/use-window-size";
import { useCursorVisibility } from "@/shared/hooks/use-cursor-visibility";

// --- Components ---

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/shared/lib/tiptap-utils";

// --- Styles ---
import "@/features/editor/components/tiptap-templates/simple/simple-editor.scss";

type EditorContent = {
  type: string;
  content?: Array<{ type: string; [key: string]: unknown }>;
  [key: string]: unknown;
};

interface SimpleEditorProps {
  initialContent?: EditorContent | null;
  onContentChange?: (content: EditorContent) => void;
}

const emptyDoc: EditorContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <ToolbarGroup>{/* <ThemeToggle /> */}</ToolbarGroup>
      <Spacer />
      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu
          types={["bulletList", "orderedList", "taskList"]}
          portal={isMobile}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

export function SimpleEditor({
  initialContent,
  onContentChange,
}: SimpleEditorProps = {}) {
  const isMobile = useIsBreakpoint();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main",
  );
  const toolbarRef = useRef<HTMLDivElement>(null);
  const suppressUpdateRef = useRef(false);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content: initialContent ?? emptyDoc,
  });

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      if (suppressUpdateRef.current) {
        suppressUpdateRef.current = false;
        return;
      }
      onContentChange?.(editor.getJSON());
    };

    editor.on("update", handleUpdate);
    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, onContentChange]);

  useEffect(() => {
    if (!editor) return;
    suppressUpdateRef.current = true;
    editor.commands.setContent(initialContent ?? emptyDoc);
  }, [editor, initialContent]);

  const [toolbarHeight, setToolbarHeight] = useState(0);

  useEffect(() => {
    const updateToolbarHeight = () => {
      setToolbarHeight(toolbarRef.current?.getBoundingClientRect().height ?? 0);
    };

    updateToolbarHeight();

    const observer = new ResizeObserver(updateToolbarHeight);
    if (toolbarRef.current) {
      observer.observe(toolbarRef.current);
    }

    window.addEventListener("resize", updateToolbarHeight);
    return () => {
      window.removeEventListener("resize", updateToolbarHeight);
      observer.disconnect();
    };
  }, [isMobile, mobileView, height]);

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarHeight,
  });

  const effectiveMobileView = isMobile ? mobileView : "main";

  return (
    <div>
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          variant="fixed"
          className="h-15 px-10"
          ref={toolbarRef}
          style={{
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px)`,
                }
              : {}),
          }}
        >
          {effectiveMobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={
                effectiveMobileView === "highlighter" ? "highlighter" : "link"
              }
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  );
}
