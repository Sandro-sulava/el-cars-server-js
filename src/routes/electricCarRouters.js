const express = require("express");
const {
  GetAllElectricCar,
  GetElectricCarById,
  UpdateElectricCar,
  CreateElectricCar,
  DeleteElectricCar,
} = require("../controllers/electricCarController");
const protect = require("../middlewares/authMiddleware");

const electircCarRouters = express.Router();

/**
 * @swagger
 * tags:
 *   name: ElectricCar
 *   description: Electric car management
 */

/**
 * @swagger
 * /api/electricCar:
 *   get:
 *     tags: [ElectricCar]
 *     summary: Get all electric cars
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of electric cars
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 {
 *                   "id": 1,
 *                   "name": "Tesla Model S",
 *                   "model": "Plaid 2025",
 *                   "topSpeed": "322 km/h",
 *                   "engineType": "Electric Dual Motor",
 *                   "zeroToHundred": 2,
 *                   "price": 89999,
 *                   "image": "https://example.com/tesla.png",
 *                   "createdAt": "2025-10-27T12:00:00Z",
 *                   "updatedAt": "2025-10-27T12:00:00Z"
 *                 }
 *               ]
 */
electircCarRouters.get("/", GetAllElectricCar);

/**
 * @swagger
 * /api/electricCar/{id}:
 *   get:
 *     tags: [ElectricCar]
 *     summary: Get an electric car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Electric car ID
 *     responses:
 *       200:
 *         description: Electric car object
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "id": 1,
 *                 "name": "Tesla Model S",
 *                 "model": "Plaid 2025",
 *                 "topSpeed": "322 km/h",
 *                 "engineType": "Electric Dual Motor",
 *                 "zeroToHundred": 2,
 *                 "price": 89999,
 *                 "image": "https://example.com/tesla.png",
 *                 "createdAt": "2025-10-27T12:00:00Z",
 *                 "updatedAt": "2025-10-27T12:00:00Z"
 *               }
 */
electircCarRouters.get("/:id", GetElectricCarById);

/**
 * @swagger
 * /api/electricCar/createElectricCar:
 *   post:
 *     tags: [ElectricCar]
 *     summary: Create a new electric car
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - model
 *               - topSpeed
 *               - engineType
 *               - zeroToHundred
 *               - price
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tesla Model S"
 *               model:
 *                 type: string
 *                 example: "Plaid 2025"
 *               topSpeed:
 *                 type: string
 *                 example: "322 km/h"
 *               engineType:
 *                 type: string
 *                 example: "Electric Dual Motor"
 *               zeroToHundred:
 *                 type: integer
 *                 example: 2
 *               price:
 *                 type: integer
 *                 example: 89999
 *               image:
 *                 type: string
 *                 description: Base64 or URL of the car image
 *                 example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 *     responses:
 *       201:
 *         description: Electric car created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Electric car created successfully"
 *               car:
 *                 id: 10
 *                 name: "Tesla Model S"
 *                 model: "Plaid 2025"
 *                 price: 89999
 *       401:
 *         description: Unauthorized - JWT required
 */
electircCarRouters.post("/createElectricCar", protect, CreateElectricCar);

/**
 * @swagger
 * /api/electricCar/{id}:
 *   patch:
 *     tags: [ElectricCar]
 *     summary: Update an electric car
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Electric car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Tesla Model S"
 *               topSpeed:
 *                 type: string
 *                 example: "330 km/h"
 *               price:
 *                 type: integer
 *                 example: 92000
 *     responses:
 *       200:
 *         description: Electric car updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Electric car updated successfully"
 *               updatedCar:
 *                 id: 1
 *                 name: "Updated Tesla Model S"
 *                 model: "Plaid 2025"
 *                 topSpeed: "330 km/h"
 *                 price: 92000
 *       401:
 *         description: Unauthorized - JWT required
 */
electircCarRouters.patch("/:id", protect, UpdateElectricCar);

/**
 * @swagger
 * /api/electricCar/{id}:
 *   delete:
 *     tags: [ElectricCar]
 *     summary: Delete an electric car
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Electric car ID
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Electric car deleted successfully"
 *       404:
 *         description: Car not found
 *       401:
 *         description: Unauthorized - JWT required
 */
electircCarRouters.delete("/:id", protect, DeleteElectricCar);

module.exports = electircCarRouters;
