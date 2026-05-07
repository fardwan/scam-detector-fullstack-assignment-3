import express from "express";

import {
    checkScam,
    reportNumber,
} from "../controllers/scamController.js";

import { getHistory } from "../controllers/historyController.js";

// 🔐 AUTH MIDDLEWARE
import { authMiddleware, isAdmin } from "../middleware/auth.js";

const router = express.Router();

/**
 * 🌐 PUBLIC ROUTES
 * (no login required)
 */
router.post("/check", checkScam);
router.post("/report", reportNumber);

/**
 * 🔐 PROTECTED ROUTES
 * (ADMIN ONLY)
 */
router.get("/history", authMiddleware, getHistory);

export default router;