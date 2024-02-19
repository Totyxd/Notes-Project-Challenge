import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/index.js";
import User from "./User.js";
import Category from "./Category.js";
import CategoryNote from "./CategoryNote.js";

class Note extends Model { }

Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(50)
    },
    content: {
        type: DataTypes.TEXT
    },
    UserId: {
        type: DataTypes.INTEGER
    },
    archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
},
    {
        sequelize
    }
);


export default Note;