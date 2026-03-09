const express = require("express");
const { signUp, login, logout } = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware");
const auth = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/auth/signUp:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     security: []   # 👈 No auth required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: mindiaTester
 *               email:
 *                 type: string
 *                 example: mindia@gmail.com
 *               password:
 *                 type: string
 *                 example: asdasdasd
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User created successfully"
 *               user:
 *                 id: "123abc"
 *                 username: "mindiaTester"
 *                 email: "mindia@gmail.com"
 */
auth.post("/signup", signUp);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     security: []   # 👈 No auth required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: mindia@gmail.com
 *               password:
 *                 type: string
 *                 example: asdasdasd
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               message: "Login successful"
 *               token: "your-jwt-token"
 *               user:
 *                 id: "123abc"
 *                 username: "mindiaTester"
 *                 email: "mindia@gmail.com"
 */
auth.post("/login", login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout user
 *     security: []   # 👈 No auth required
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             example:
 *               message: "Logout successful"
 */
auth.post("/logout", logout);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get authenticated user info
 *     description: Returns the currently authenticated user's information
 *     security:
 *       - bearerAuth: []  # 👈 This one requires JWT auth
 *     responses:
 *       200:
 *         description: Authenticated user info
 *         content:
 *           application/json:
 *             example:
 *               message: "Authenticated"
 *               user:
 *                 id: "123abc"
 *                 username: "mindiaTester"
 *                 email: "mindia@gmail.com"
 *       401:
 *         description: Unauthorized
 */
auth.get("/me", protect, (req, res) => {
  res.status(200).json({
    user: req.user,
    message: "Authenticated",
  });
});

module.exports = auth;
