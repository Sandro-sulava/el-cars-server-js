// lib/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL || "https://el-car-server-test.onrender.com"
    : `http://localhost:${PORT}`;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "El-Car API",
      version: "1.0.0",
      description:
        "API documentation for the Electric and Luxury Car management system (Auth, Cars, etc.)",
      contact: {
        name: "El-Car Developers",
        email: "support@elcar.dev",
      },
    },
    servers: [
      {
        url: BASE_URL,
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
module.exports = swaggerSpec;
