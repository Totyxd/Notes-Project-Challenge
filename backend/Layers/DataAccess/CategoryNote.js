import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/index.js";
import Note from "./Note.js";
import Category from "./Category.js";

class CategoryNote extends Model { }

CategoryNote.init({
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    noteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE"
    }
},
    {
        sequelize,
        modelName: "CategoryNote",
        timestamps: false
    }
);


export default CategoryNote;