import Category from "../DataAccess/Category.js";
import Note from "../DataAccess/Note.js";

export default {

    getAll: async () => {
        const cats = await Category.findAll({ attributes: ["id", "name"] });
        return cats;
    },

    getNotes: async (categoryId, archived = false) => {
        try {
            const cat = await Category.findOne(
                {
                    where: { id: categoryId },
                    include: {
                        model: Note,
                        through: { attributes: [] },
                        where: { archived },
                        order: [["updatedAt", "DESC"]],
                        include: {
                            model: Category,
                            attributes: ["id", "name"],
                            through: { attributes: [] }
                        }
                    }
                }
            );

            return cat.Notes;
        } catch {
            return null;
        }
    }
};