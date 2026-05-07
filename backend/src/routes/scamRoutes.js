import express from "express";
import {
    checkScam,
    reportNumber,
} from "../controllers/scamController.js";

import { getHistory } from "../controllers/historyController.js";

// NEW: auth middleware
import { authMiddleware, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// PUBLIC (no change)
router.post("/check", checkScam);
router.post("/report", reportNumber);

// 🔐 PROTECTED (ADMIN ONLY)
router.get("/history", authMiddleware, isAdmin, getHistory);

export default router;