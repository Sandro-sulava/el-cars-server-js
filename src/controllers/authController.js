const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("../lib/utils");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const signUp = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "username,email and password is required",
    });
  }
  const existedUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (existedUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "this user already exist",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  if (newUser) {
    generateToken(newUser.id, res);
  }

  res.status(StatusCodes.CREATED).json({
    username,
    email,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "user not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    return res.status(400).json({ message: "Invalid credentials" });

  generateToken(user.id, res);

  res.status(StatusCodes.OK).json({
    username: user.username,
    email: user.email,
  });
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true, // ✅ Must match
    secure: true, // ✅ Must match
    sameSite: "none", // ✅ Must match
    expires: new Date(0), // ✅ Clears the cookie
    path: "/", // ✅ Must match
  });

  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = { signUp, login, logout };
