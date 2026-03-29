import express from "express";
import { register, login, logout, getCurrent } from "../controllers/authControllers.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, getCurrent);

export default router;
