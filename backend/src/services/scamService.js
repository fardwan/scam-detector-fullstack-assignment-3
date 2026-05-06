import NumberModel from "../models/number.js";
import ScanModel from "../models/Scan.js";

/**
 * AI SCORING ENGINE
 */
export const calculateScamScore = (phone, reportCount = 0) => {
    let score = 0;

    if (phone.includes("000")) score += 40;
    if (phone.includes("123")) score += 20;
    if (phone.includes("999")) score += 25;
    if (phone.startsWith("011")) score += 10;

    score += reportCount * 15;

    return Math.min(score, 100);
};

/**
 * RISK ENGINE
 */
export const getRiskLevel = (score) => {
    if (score >= 70) return "HIGH_RISK";
    if (score >= 30) return "SUSPICIOUS";
    return "SAFE";
};

/**
 * EXPLAINABLE AI (reasons)
 */
export const generateReasons = (phone, reportCount) => {
    const reasons = [];

    if (phone.includes("000")) reasons.push("Repeated digits detected");
    if (phone.includes("123")) reasons.push("Sequential pattern detected");
    if (reportCount > 0) reasons.push(`Reported ${reportCount} times`);

    if (reasons.length === 0) reasons.push("No suspicious pattern found");

    return reasons;
};

/**
 * MAIN ANALYSIS FUNCTION
 */
export const analyzeNumberService = async (phone) => {
    let record = await NumberModel.findOne({ phoneNumber: phone });

    if (!record) {
        record = new NumberModel({ phoneNumber: phone });
    }

    // update stats
    record.searchCount += 1;

    const score = calculateScamScore(phone, record.reportCount);
    const status = getRiskLevel(score);
    const reasons = generateReasons(phone, record.reportCount);

    record.scamScore = score;

    await record.save();

    // save history log
    await ScanModel.create({
        phone,
        status,
        score,
        reasons,
    });

    return {
        phone,
        score,
        status,
        reasons,
        searchCount: record.searchCount,
    };
};

/**
 * REPORT SYSTEM
 */
export const reportNumberService = async (phone) => {
    let record = await NumberModel.findOne({ phoneNumber: phone });

    if (!record) {
        record = new NumberModel({ phoneNumber: phone });
    }

    record.reportCount += 1;

    record.scamScore = calculateScamScore(phone, record.reportCount);

    await record.save();

    return {
        message: "Reported successfully",
        phone,
        reportCount: record.reportCount,
        newScore: record.scamScore,
    };
};

/**
 * HISTORY FETCH
 */
export const getHistoryService = async () => {
    return await ScanModel.find().sort({ createdAt: -1 }).limit(100);
};