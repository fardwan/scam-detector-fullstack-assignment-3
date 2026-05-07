import express from "express";

import {
    login,
    register,
    deleteAccount,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// 🗑️ DELETE ACCOUNT ROUTE
router.delete("/delete", deleteAccount);

export default router;