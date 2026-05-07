import express from "express";

import {
    login,
    register,
    deleteAccount,
} from "../controllers/authController.js";

const router = express.Router();

/**
 * AUTH ROUTES
 */

// Register new user
router.post("/register", register);

// Login user
router.post("/login", login);

// 🗑️ DELETE ACCOUNT
// NOTE: frontend must send userId in body
router.delete("/delete", deleteAccount);

export default router;