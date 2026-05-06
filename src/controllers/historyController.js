let history = [];

// GET HISTORY
exports.getHistory = (req, res) => {
    try {
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ADD HISTORY (called internally)
exports.addHistory = (record) => {
    try {
        history.unshift(record); // newest first
    } catch (error) {
        console.log("History add error:", error.message);
    }
};