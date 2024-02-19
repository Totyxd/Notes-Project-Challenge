import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/index.js";
import Note from "./Note.js";
import CategoryNote from "./CategoryNote.js";

class Category extends Model { }

Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
},
    {
        sequelize
    }
);

export default Category;

