import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import ErrorHandler from "./utils/errorHandler.js";
import userRoutes from  "./routes/userRoute.js";
import productRoutes from  "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js"

const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/carts", cartRoute);

// Port
const PORT = process.env.PORT || 5000;

// Route not found
app.use((req, res, next) => {
  return next(new ErrorHandler(`Route ${req.originalUrl} not found`, 404));
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
