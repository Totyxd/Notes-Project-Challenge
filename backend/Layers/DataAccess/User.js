import { DataTypes, Model } from "sequelize";
import sequelize from "./../../config/index.js";
import Note from "./Note.js";


class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: [4, 50]
        },
        unique: true
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: [4, 50],
            isAlphanumeric: true
        }
    }
},
    {
        sequelize
    }
);

export default User;