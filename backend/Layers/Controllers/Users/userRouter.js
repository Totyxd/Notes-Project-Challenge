import express from "express";
import handlers from "./handlers.js";
const userRouter = express.Router();

userRouter.post("/login", handlers.handleUserLogin);

export default userRouter;