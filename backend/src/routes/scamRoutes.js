import express from "express";
import {
    checkScam,
    reportNumber,
} from "../controllers/scamController.js";
import { getHistory } from "../controllers/historyController.js";

const router = express.Router();

router.post("/check", checkScam);
router.post("/report", reportNumber);
router.get("/history", getHistory);

export default router;