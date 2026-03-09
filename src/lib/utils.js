const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true, // 🔥 Always true (your server is HTTPS on Render)
    sameSite: "none", // 🔥 Required for cross-origin cookies
    path: "/",
  });

  return token;
};

module.exports = { generateToken };
