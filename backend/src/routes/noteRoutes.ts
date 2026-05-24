import { Router } from "express";
import { UserAuth } from "../middlewares/userMiddleware.js";
import { notesController } from "../controllers/notes.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createNoteSchema,
  updateNoteSchema,
} from "../validations/note.validation.js";

const router = Router();

router.post(
  "/create",
  UserAuth,
  validate(createNoteSchema),
  notesController.createNote,
);
router.patch(
  "/update/:noteId",
  UserAuth,
  validate(updateNoteSchema),
  notesController.updateNote,
);
router.delete("/delete/:noteId", UserAuth, notesController.deleteNote);
router.get("/my-note/:noteId", UserAuth, notesController.getMyNote);
router.get("/my-note-bulk", UserAuth, notesController.getMynotesBulk);

export default router;
