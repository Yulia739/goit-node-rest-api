import jwt from "jsonwebtoken";
import { getUserById } from "../services/authServices.js";

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ message: "Not authorized" });
  }

  const user = await getUserById(payload.id);

  if (!user || user.token !== token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  req.user = user;
  next();
};

export default authenticate;
