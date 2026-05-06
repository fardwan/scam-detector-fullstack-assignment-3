const { addHistory } = require("./historyController");

// SIMPLE SCAM LOGIC (safe demo version)
const checkScamLogic = (phone) => {
    let score = 0;
    let reasons = [];

    // rule 1: length check
    if (phone.length < 10) {
        score += 40;
        reasons.push("Phone number too short");
    }

    // rule 2: suspicious patterns
    if (phone.includes("000") || phone.includes("123")) {
        score += 30;
        reasons.push("Suspicious number pattern detected");
    }

    // rule 3: random simulation (demo logic)
    if (Math.random() > 0.7) {
        score += 30;
        reasons.push("Number flagged in database simulation");
    }

    let status = score >= 50 ? "SCAM" : "SAFE";

    return { status, score, reasons };
};

// MAIN CHECK API
exports.checkScam = (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Phone number is required"
            });
        }

        const result = checkScamLogic(phone);

        // create record
        const record = {
            phone,
            status: result.status,
            score: result.score,
            reasons: result.reasons,
            time: new Date()
        };

        // save to history
        addHistory(record);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.log("Check scam error:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};