const {
  registerUser,
  loginUser,
  logoutUser,
  findUserByEmail,
} = require("../services/authServices");
const { registerSchema, loginSchema } = require("../schemas/authSchemas");

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

module.exports = { register, login, logout, getCurrent };
