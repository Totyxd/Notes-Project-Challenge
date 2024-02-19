import CategoryService from "./../../Services/CategoryService.js";

export default {

    getAllCategories: async (_req, res) => {
        const cats = await CategoryService.getAll();
        return res.status(200).json(cats);
    },

    getNotesByCategory: async (req, res) => {
        const result = await CategoryService.getNotes(req.params.id);
        if (result) return res.status(200).json(result);
        else return res.status(200).json([]);
    },

    getArchivedNotesByCategory: async (req, res) => {
        const result = await CategoryService.getNotes(req.params.id, true);
        if (result) return res.status(200).json(result);
        else return res.status(200).json([]);
    }
};