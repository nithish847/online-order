// Top
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./utils/db.js";

import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";
import contactRoutes from "./routes/contact.route.js";

// Load .env
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// CORS (temporary: allow all origins for testing)
app.use(cors({ origin: true, credentials: true }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/contact", contactRoutes);

// Error handler (must be last)
app.use((err, req, res, next) => {
  console.error("🔥 Backend Error:", err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// Start server
app.listen(PORT, () => {
  connectDb();
  console.log(`🚀 Server running at port ${PORT}`);
});