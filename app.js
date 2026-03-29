import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

export default app;
