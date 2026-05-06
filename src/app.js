const express = require("express");
const cors = require("cors");

const scamRoutes = require("./routes/scamRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.json({ message: "Scam Detector API Running 🚀" });
});

// API route
app.use("/api/scam", scamRoutes);

module.exports = app;