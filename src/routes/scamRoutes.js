const express = require("express");
const router = express.Router();

// controllers
const { checkScam } = require("../controllers/scamController");
const { getHistory } = require("../controllers/historyController");

// ======================
// SCAM CHECK ROUTE
// ======================
router.post("/check", checkScam);

// ======================
// HISTORY ROUTE
// ======================
router.get("/history", getHistory);

module.exports = router;