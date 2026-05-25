import { model, Schema, Types } from "mongoose";
import "./userModel.js"
export interface INotes extends Document {
  title: string;
  content: Record<string, any>;
  tags?: string[];
  userId: Types.ObjectId;
  isArchived?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface createNoteDTO {
  title: string;
  content: Record<string, any>;
  tags?: string[];
}
export interface updateNoteDTO {
  title?: string;
  content?: Record<string, any>;
  tags?: string[];
  isArchived?: boolean;
}
const NotesSchema = new Schema<INotes>(
  {
    title: { type: String, required: true, maxLength: 200, minLength: 1 },
    content: { type: Schema.Types.Mixed, required: true },
    userId: { type: Schema.Types.ObjectId, ref:'users',required: true },
    isArchived: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  },
);

NotesSchema.index({ userId: 1, createdAt: -1 });
NotesSchema.index({ tags: 1 });
export const notesModel = model<INotes>("notes", NotesSchema);
