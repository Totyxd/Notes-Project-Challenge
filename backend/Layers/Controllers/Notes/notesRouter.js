import express from "express";
import handlers from "./handlers.js";
const notesRouter = express.Router();

notesRouter.get("/user/:id", handlers.getUserNotes)

notesRouter.get("/user/:id/archived", handlers.getArchivedUserNotes)

notesRouter.get("/:id", handlers.getById)

notesRouter.post("/", handlers.createNote)

notesRouter.patch("/:id", handlers.updateNote)

notesRouter.delete("/:id", handlers.deleteNote)

notesRouter.post("/categories/add", handlers.addNoteCategory)

notesRouter.delete("/categories/remove", handlers.removeNoteCategory)

export default notesRouter;