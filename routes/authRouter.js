const express = require("express");
const { register, login, logout, getCurrent } = require("../controllers/authControllers");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, getCurrent);

module.exports = router;
