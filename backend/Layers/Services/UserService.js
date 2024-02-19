import { Op } from "sequelize";
import User from "./../DataAccess/User.js";

export default {

    login: async (credentials) => {
        const { username, password } = credentials;

        try {
            const user = await User.findOne({
                where: {
                    [Op.and]: [
                        { username }, { password }
                    ]
                },
                attributes: ["id", "username"]
            });

            if (user) {
                return user;
            } else return null;
        } catch {
            return null;
        };
    }
    //No hashing or further authentication will be used for the sake of simplicity. Just a plain simple login for the superuser.
};