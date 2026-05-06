import mongoose from "mongoose";

const scanSchema = new mongoose.Schema(
    {
        phone: String,
        status: String,
        score: Number,
        reasons: [String],
    },
    { timestamps: true }
);

export default mongoose.model("Scan", scanSchema);