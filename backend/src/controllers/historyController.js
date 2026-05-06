import { getHistoryService } from "../services/scamService.js";

export const getHistory = async (req, res) => {
    try {
        const data = await getHistoryService();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};