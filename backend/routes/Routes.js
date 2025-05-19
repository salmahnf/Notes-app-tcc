import express from "express";
import {
  getNotes,
  createNote,
  updateNotes,
  deleteNotes,
} from "../controller/NotesController.js";
import {
  login,
  createUser,
  refreshToken,
  logout,
} from "../controller/UserController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// User Routes
router.post("/register", createUser);
router.post("/login", login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

// Notes Routes (all protected)
router.get("/notes", verifyToken, getNotes);
router.post("/tambahNotes", verifyToken, createNote);
router.put("/edit-notes/:id", verifyToken, updateNotes);
router.delete("/delete-notes/:id", verifyToken, deleteNotes);

router.all("*", (req, res) => {
  res.status(404).json({ message: "Tolong pilih service." });
});

export default router;