import NoteService from "../../Services/NoteService.js";

export default {
    //Bodies and params validations will also be skipped for simplicity. Could easily be added with express-validator.
    getUserNotes: async (req, res) => {
        const notes = await NoteService.myNotes(req.params.id);
        if (notes) return res.status(200).json(notes);
        else return res.status(200).json([]);
    },

    getArchivedUserNotes: async (req, res) => {
        const notes = await NoteService.myNotes(req.params.id, true);
        if (notes) return res.status(200).json(notes);
        else return res.status(200).json([]);
    },

    getById: async (req, res) => {
        const note = await NoteService.getById(req.params.id);
        if (note) return res.status(200).json(note);
        else return res.status(200).json({});
    },

    createNote: async (req, res) => {
        const newNote = req.body;
        const result = await NoteService.create(newNote);
        if (result) return res.status(201).json(result);
        else return res.status(400).json({ succes: "failed" });
    },

    updateNote: async (req, res) => {
        const newProps = req.body;
        const result = await NoteService.update(req.params.id, newProps);
        if (result) return res.status(200).json(result);
        else return res.status(400).json({ succes: "failed" });
    },

    deleteNote: async (req, res) => {
        const result = await NoteService.delete(req.params.id);
        if (result) return res.status(200).json({ succes: true });
        else return res.status(400).json({ succes: "failed" });
    },

    addNoteCategory: async (req, res) => {
        const result = await NoteService.addCategory(req.body.categoryId, req.body.noteId);
        if (result) return res.status(201).json({ succes: true });
        else return res.status(400).json({ succes: "failed" });
    },

    removeNoteCategory: async (req, res) => {
        const result = await NoteService.removeCategory(req.query.categoryId, req.query.noteId);
        if (result) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ success: false, message: "Failed to remove category from note." });
        }

    }
};