import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import { User } from "../db/sequelize.js";
import { sendVerificationEmail } from "./emailService.js";

async function registerUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "200", d: "retro" }, true);
  const verificationToken = nanoid();
  const user = await User.create({ email, password: hashedPassword, avatarURL, verificationToken });
  await sendVerificationEmail(email, verificationToken);
  return user;
}

async function loginUser(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;

  if (!user.verify) return { unverified: true };

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "23h",
  });

  await user.update({ token });
  return user;
}

async function logoutUser(userId) {
  const user = await User.findByPk(userId);
  if (!user) return null;
  await user.update({ token: null });
  return user;
}

async function getUserById(userId) {
  return User.findByPk(userId);
}

async function findUserByEmail(email) {
  return User.findOne({ where: { email } });
}

async function updateUserAvatar(userId, avatarURL) {
  const user = await User.findByPk(userId);
  if (!user) return null;
  return user.update({ avatarURL });
}

async function verifyUserToken(verificationToken) {
  const user = await User.findOne({ where: { verificationToken } });
  if (!user) return null;
  await user.update({ verify: true, verificationToken: null });
  return user;
}

async function resendVerification(email) {
  const user = await User.findOne({ where: { email } });
  if (!user) return { notFound: true };
  if (user.verify) return { alreadyVerified: true };
  await sendVerificationEmail(email, user.verificationToken);
  return { sent: true };
}

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserById,
  findUserByEmail,
  updateUserAvatar,
  verifyUserToken,
  resendVerification,
};
