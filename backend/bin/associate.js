import Category from "../Layers/DataAccess/Category.js";
import CategoryNote from "../Layers/DataAccess/CategoryNote.js";
import Note from "../Layers/DataAccess/Note.js";
import User from "../Layers/DataAccess/User.js";


export default function associate() {
    User.hasMany(Note, {
        foreignKey: "UserId"
    });

    Note.belongsTo(User);
    Note.belongsToMany(Category, {
        through: CategoryNote,
        foreignKey: "noteId",
        onDelete: "CASCADE"
    });


    Category.belongsToMany(Note, {
        through: CategoryNote,
        foreignKey: "categoryId"
    });

};