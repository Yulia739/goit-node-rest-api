import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../db/sequelize.js";

async function registerUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ email, password: hashedPassword });
}

async function loginUser(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;

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

export { registerUser, loginUser, logoutUser, getUserById, findUserByEmail };
