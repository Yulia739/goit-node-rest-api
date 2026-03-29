import express from "express";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

export default app;
