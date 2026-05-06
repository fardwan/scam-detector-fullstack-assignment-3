import {
    analyzeNumberService,
    reportNumberService,
} from "../services/scamService.js";

export const checkScam = async (req, res) => {
    try {
        const result = await analyzeNumberService(req.body.phoneNumber);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const reportNumber = async (req, res) => {
    try {
        const result = await reportNumberService(req.body.phoneNumber);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};