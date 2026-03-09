const express = require("express");
const { PrismaClient } = require("@prisma/client");
const electircCarRouters = require("./routes/electricCarRouters");
const luxuryCar = require("./routes/luxuryCarRouters");
const auth = require("./routes/authRouters");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./lib/swagger");

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";
const BASE_URL =
  NODE_ENV === "production"
    ? process.env.BASE_URL || "https://el-car-server-test.onrender.com"
    : `http://localhost:${PORT}`;

// === Middleware ===
app.use(express.json());
app.use(cookieParser());

// now a single allowed origin, driven by an environment variable
// `ALLOWED_ORIGIN` should be set in your .env file (see docs).
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
// === Swagger Docs ===
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// === Routes ===
app.use("/api/electricCar", electircCarRouters);
app.use("/api/luxuryCar", luxuryCar);
app.use("/api/auth", auth);

// === Server ===
app.listen(PORT, () => {
  console.log(`🚗 El-Car API running in ${NODE_ENV} mode`);
  console.log(`✅ Base URL: ${BASE_URL}`);
  console.log(`📘 Swagger Docs: ${BASE_URL}/api-docs`);
});
