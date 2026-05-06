import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import scamRoutes from "./routes/scamRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// connect database FIRST
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/scam", scamRoutes);
app.use("/api/auth", authRoutes);

// health check route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "🚀 Scam Detector API Running",
        status: "OK",
    });
});

const PORT = process.env.PORT || 5000;

// important for Render / cloud deployment
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});