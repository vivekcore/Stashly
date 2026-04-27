import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export default function EditorPage() {
  return (
    <div className="space-y-6">
      <Card className="border-border/60 bg-linear-to-r from-card to-card/70">
        <CardHeader>
          <CardTitle>Text editor</CardTitle>
          <CardDescription>
            Capture longer notes without mixing editor UI into the dashboard shell.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="overflow-hidden border-border/60">
        <CardContent className="p-0">
          <SimpleEditor />
        </CardContent>
      </Card>
    </div>
  );
}
