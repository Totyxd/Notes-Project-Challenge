import express from "express";
import userRouter from "./Layers/Controllers/Users/userRouter.js";
import categoryRouter from "./Layers/Controllers/Categories/categoryRouter.js";
import notesRouter from "./Layers/Controllers/Notes/notesRouter.js";
import cors from "cors";

const app = express();
app.use(cors({
    origin: "http://localhost:4200"
}));
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.url, req.query);
    next();
});

app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/notes", notesRouter);


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.json({ error: err.message });
});

app.use((_req, res) => {
    res.status(404);
    res.json({
        error: 'not found'
    });
});

export default app;