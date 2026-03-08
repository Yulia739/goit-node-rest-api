const express = require("express");
const contactsRouter = require("./routes/contactsRouter");
const authRouter = require("./routes/authRouter");

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

module.exports = app;
