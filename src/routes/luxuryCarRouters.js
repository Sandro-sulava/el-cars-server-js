const express = require("express");
const {
  getAllLuxuryCar,
  CreateLuxuryCar,
  GetLuxuryCarById,
  DeleteLuxuryCar,
  UpdateLuxuryCar,
} = require("../controllers/luxuryCarController");
const protect = require("../middlewares/authMiddleware");

const luxuryCar = express.Router();

/**
 * @swagger
 * tags:
 *   name: LuxuryCar
 *   description: Luxury Car management
 */

/**
 * @swagger
 * /api/luxuryCar:
 *   get:
 *     tags: [LuxuryCar]
 *     summary: Get all luxury cars
 *     parameters:
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter by brand
 *     responses:
 *       200:
 *         description: List of luxury cars
 *       404:
 *         description: No luxury cars found
 */
luxuryCar.get("/", getAllLuxuryCar);

/**
 * @swagger
 * /api/luxuryCar/{id}:
 *   get:
 *     tags: [LuxuryCar]
 *     summary: Get luxury car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Luxury car ID
 *     responses:
 *       200:
 *         description: Luxury car details
 *       404:
 *         description: Car not found
 */
luxuryCar.get("/:id", GetLuxuryCarById);

/**
 * @swagger
 * /api/luxuryCar/createLuxuryCar:
 *   post:
 *     tags: [LuxuryCar]
 *     summary: Create a new luxury car
 *     description: |
 *       Upload a new luxury car entry.
 *       The `image` field should contain a **Base64-encoded image string** (e.g., `data:image/png;base64,...`).
 *       The image will be automatically uploaded to **Cloudinary** and replaced with its secure URL in the database.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brand
 *               - name
 *               - model
 *               - image
 *               - price
 *             properties:
 *               brand:
 *                 type: string
 *                 example: "Mercedes-Benz"
 *               name:
 *                 type: string
 *                 example: "S-Class"
 *               model:
 *                 type: string
 *                 example: "S580 4MATIC 2025"
 *               image:
 *                 type: string
 *                 description: Base64 image string (data URI)
 *                 example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 *               price:
 *                 type: number
 *                 example: 115000
 *     responses:
 *       201:
 *         description: Luxury car created successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized - JWT required
 */
luxuryCar.post("/createLuxuryCar", protect, CreateLuxuryCar);

/**
 * @swagger
 * /api/luxuryCar/{id}:
 *   delete:
 *     tags: [LuxuryCar]
 *     summary: Delete a luxury car by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Luxury car ID
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 *       401:
 *         description: Unauthorized - JWT required
 */
luxuryCar.delete("/:id", protect, DeleteLuxuryCar);

/**
 * @swagger
 * /api/luxuryCar/{id}:
 *   patch:
 *     tags: [LuxuryCar]
 *     summary: Update a luxury car by ID
 *     description: |
 *       You can update any field.
 *       If you include a new Base64 image, it will be uploaded to Cloudinary automatically.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Luxury car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *               name:
 *                 type: string
 *               model:
 *                 type: string
 *               image:
 *                 type: string
 *                 description: Base64 image string (data URI)
 *                 example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Luxury car updated successfully
 *       404:
 *         description: Car not found
 *       401:
 *         description: Unauthorized - JWT required
 */
luxuryCar.patch("/:id", protect, UpdateLuxuryCar);

module.exports = luxuryCar;
