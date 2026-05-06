import mongoose from "mongoose";

const numberSchema = new mongoose.Schema(
    {
        phoneNumber: { type: String, unique: true },

        scamScore: { type: Number, default: 0 },

        searchCount: { type: Number, default: 0 },

        reportCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model("Number", numberSchema);