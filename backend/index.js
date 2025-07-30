import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./utils/db.js";

import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";
import contactRoutes from "./routes/contact.route.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://online-order-b.onrender.com"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/contact", contactRoutes);

// Start Server
app.listen(PORT, () => {
  connectDb();
  console.log(`🚀 Server running at port ${PORT}`);
});
