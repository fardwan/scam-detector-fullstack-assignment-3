function analyzePhone(phone) {
    let score = 0;
    let reasons = [];

    const scamCountries = ["+92", "+234", "+252", "+91"];

    if (scamCountries.some(c => phone.startsWith(c))) {
        score += 50;
        reasons.push("High-risk country code");
    }

    if (/(.)\1{3,}/.test(phone)) {
        score += 30;
        reasons.push("Repeated number pattern detected");
    }

    if (phone.length < 10) {
        score += 20;
        reasons.push("Invalid number length");
    }

    let status = score >= 50 ? "SCAM" : "SAFE";

    return {
        status,
        score,
        reasons
    };
}

module.exports = { analyzePhone };