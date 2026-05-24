import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { createNoteDTO, updateNoteDTO } from "../models/notesMode.js";
import { notesServices } from "../services/notes.services.js";
import { stringify } from "node:querystring";

export const notesController = {
  createNote: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data: createNoteDTO = req.body;
      const userId = req.userId;
      const response = await notesServices.createNote(userId, data);
      res.status(200).json({
        status: "success",
        message: "note created sucessfully",
        data: response,
      });
    },
  ),
  updateNote: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data: updateNoteDTO = req.body;
      const userId = req.userId;
      const noteId = (req.params.noteId) as string;
      const response = await notesServices.updateNote(userId, noteId, data);
      res.status(200).json({
        status: "success",
        message: "note updated sucessfully",
        data: response,
      });
    },
  ),
  deleteNote: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.userId;
      const noteId = req.params.noteId as string;
      const response = await notesServices.deleteNote(userId, noteId);
      res.status(200).json({
        status: "success",
        message: "note deleted sucessfully",
        data: response,
      });
    },
  ),
  getMyNote: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const noteId = req.params.noteId as string;
      const userId = req.userId;
      const response = await notesServices.getMyNote(userId, noteId);
      res.status(200).json({
        status: "success",
        message: "my note",
        data: response,
      });
    },
  ),
  getMynotesBulk: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.userId;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const response = await notesServices.getMynotesBulk(userId, page, limit);
      res.status(200).json({
        status: "success",
        message: "Bulk notes",
        data: response,
      });
    },
  ),
};
