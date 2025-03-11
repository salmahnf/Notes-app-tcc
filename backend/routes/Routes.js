import express from "express";
import {
  getNotes,
  createNote,
  updateNotes,
  deleteNotes,
} from "../controller/NotesController.js";

const router = express.Router();

router.get("/notes", getNotes);
router.post("/tambahNotes", createNote);
router.put("/edit-notes/:id", updateNotes);
router.delete("/delete-notes/:id", deleteNotes);

export default router;
