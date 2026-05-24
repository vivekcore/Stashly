import mongoose from "mongoose";
import {
  createNoteDTO,
  notesModel,
  updateNoteDTO,
} from "../models/notesMode.js";
import ApiError from "../utils/apiError.js";

export interface IResponse {
  id: string;
  title: string;
  content: Record<string, any>;
  tags?: string[];
  isArchived?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
type TResponse = Omit<IResponse, "content">;
interface IResponseList {
  notes: TResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    tototal: number;
  };
}
class NotesServices {
  async createNote(
    userId: mongoose.Types.ObjectId,
    dto: createNoteDTO,
  ): Promise<IResponse> {
    const note = await notesModel.create({
      ...dto,
      userId,
    });
    if (!note) {
      throw new ApiError(400, "failed to create note");
    }

    const noteResponse = this.toResponse(note);
    return noteResponse;
  }
  async updateNote(
    userId: mongoose.Types.ObjectId,
    noteId: string,
    dto: updateNoteDTO,
  ): Promise<IResponse> {
    const note = await notesModel.findOneAndUpdate(
      { _id:new mongoose.Types.ObjectId(noteId),userId},
      { ...dto },
      { returnDocument: "after", runValidators: true },
    );
    if (!note) {
      throw new ApiError(400, "Note not found");
    }
    const response = this.toResponse(note);
    return response;
  }

  async deleteNote(userId: mongoose.Types.ObjectId, noteId: string) {
    const note = await notesModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(noteId),
      userId,
    });
    if (!note) {
      throw new ApiError(400, "failed to delete note");
    }
    return {
      noteId: noteId,
    };
  }
  async getMyNote(
    userId: mongoose.Types.ObjectId,
    notId: string,
  ): Promise<IResponse> {
    const note = await notesModel.findOne({
      _id: new mongoose.Types.ObjectId(notId),
      userId,
    });
    if (!note) {
      throw new ApiError(400, "Note not found");
    }
    const response = this.toResponse(note);
    return response;
  }
  async getMynotesBulk(
    userId: mongoose.Types.ObjectId,
    page: number,
    limit: number,
  ):Promise<IResponseList> {
    const skip = (page - 1) * limit;
    const [notes, total] = await Promise.all([
      notesModel
        .find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      notesModel.countDocuments({ userId }),
    ]);
    const response = notes.map((n) => this.toResponseList(n));
    return{
        notes: response,
        pagination:{
            total,
            page,
            limit,
            tototal: Math.ceil(total/limit)
        }
    }
  }

  private toResponse(note: any): IResponse {
    return {
      id: note._id.toString(),
      title: note.title,
      content: note.content,
      tags: note.tags || [""],
      isArchived: note.isArchived,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }
  private toResponseList(note: any): TResponse{
    return{
        id: note._id.toString(),
        title:note.title,
        tags:note.tags || [""],
        isArchived:note.isArchived,
        createdAt:note.createdAt,
        updatedAt:note.updatedAt
    }
  }
}
export const notesServices = new NotesServices();
