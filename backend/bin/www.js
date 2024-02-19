import sequelize from "../config/index.js";
import app from "../app.js";
import User from "../Layers/DataAccess/User.js";
import Note from "../Layers/DataAccess/Note.js";
import Category from "../Layers/DataAccess/Category.js";
import CategoryNote from "../Layers/DataAccess/CategoryNote.js";
import associate from "./associate.js";
import seeds from "./seeds.js";


(async () => {
    try {
        associate();
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        await Category.bulkCreate(seeds.categories, { ignoreDuplicates: true });
        await User.findOrCreate({ where: { username: "superuser", password: "abc123" } });

        console.log("Models synchronized and ready to use! Sequelize is active ...");

        app.listen(3000, () => console.log("App listening on port 3000..."));
    } catch (err) {
        console.log('Database connection was refused or failed.');
        console.error(err);
    }
})();