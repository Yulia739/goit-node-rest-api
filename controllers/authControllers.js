import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import {
  registerUser,
  loginUser,
  logoutUser,
  findUserByEmail,
  updateUserAvatar,
} from "../services/authServices.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const avatarsDir = path.join(__dirname, "../public/avatars");

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { email, password } = req.body;

  const existing = await findUserByEmail(email);
  if (existing) {
    return res.status(409).json({ message: "Email in use" });
  }

  const user = await registerUser(email, password);
  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { email, password } = req.body;
  const user = await loginUser(email, password);

  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  res.status(200).json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  await logoutUser(req.user.id);
  res.status(204).send();
};

const getCurrent = (req, res) => {
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const ext = path.extname(originalname);
  const filename = `${req.user.id}${ext}`;
  const destPath = path.join(avatarsDir, filename);

  await fs.rename(tempPath, destPath);

  const avatarURL = `/avatars/${filename}`;
  await updateUserAvatar(req.user.id, avatarURL);

  res.status(200).json({ avatarURL });
};

export { register, login, logout, getCurrent, updateAvatar };
