import { QueryTypes } from "sequelize";
import Category from "../DataAccess/Category.js";
import CategoryNote from "../DataAccess/CategoryNote.js";
import Note from "../DataAccess/Note.js";
import sequelize from "../../config/index.js";

export default {

    myNotes: async (UserId, archived = false) => {
        const notes = await Note.findAll({
            where: {
                UserId,
                archived
            },
            order: [["updatedAt", "DESC"]],
            include: {
                model: Category,
                attributes: ["id", "name"],
                through: { attributes: [] }
            }
        });

        return notes;
    },

    getById: async (noteId) => {
        const note = await Note.findByPk(noteId);
        return note;
    },

    create: async (newNote) => {
        try {
            const note = await Note.create({
                title: newNote.title,
                content: newNote.content,
                UserId: newNote.UserId
            });
            return note;
        } catch {
            return null;
        }
    },

    update: async (noteId, newNote) => {
        try {
            let noteUpdate = {};

            if (newNote.title) noteUpdate.title = newNote.title;
            if (newNote.content) noteUpdate.content = newNote.content;
            if (newNote.archived === true || newNote.archived === false) noteUpdate.archived = newNote.archived;

            const [rowsUpdated, [updatedNote]] = await Note.update(noteUpdate, { where: { id: noteId }, returning: true });
            return updatedNote;
        } catch {
            return null;
        }
    },

    delete: async (noteId) => {
        try {
            await Note.destroy({ where: { id: noteId } });
            return true;
        } catch {
            return false;
        }
    },

    addCategory: async (categoryId, noteId) => {
        try {
            const relationship = await CategoryNote.create({ categoryId, noteId });
            return relationship;
        } catch {
            return null;
        }
    },

    removeCategory: async (categoryId, noteId) => {
        try {
            console.log(categoryId, noteId);
            await sequelize.query(
                "DELETE FROM \"CategoryNotes\" WHERE \"categoryId\" = ? AND \"noteId\" = ?;",
                {
                    replacements: [categoryId, noteId],
                    type: QueryTypes.DELETE
                }
            );
            return true;
        } catch {
            return null;
        }
    }
};