import UserService from "../../Services/UserService.js";

export default {

    handleUserLogin: async (req, res) => {
        const credentials = req.body;
        const result = await UserService.login(credentials);

        if (result) {
            return res.status(200).json({ user: result });
        } else return res.status(400).json({ user: false });
    }
};