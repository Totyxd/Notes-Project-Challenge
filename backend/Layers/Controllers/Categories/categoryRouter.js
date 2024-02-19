import express from "express";
import handlers from "./handlers.js";
const categoryRouter = express.Router();

categoryRouter.get("/", handlers.getAllCategories);

categoryRouter.get("/:id/notes", handlers.getNotesByCategory);

categoryRouter.get("/:id/archived", handlers.getArchivedNotesByCategory);

export default categoryRouter;
