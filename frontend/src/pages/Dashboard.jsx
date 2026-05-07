import { useEffect, useState } from "react";
import api from "../api/api";

import SearchBox from "../components/searchBox.jsx";
import ResultCard from "../components/ResultCard";
import StatsCard from "../components/StatsCard";
import HistoryList from "../components/HistoryList";

export default function Dashboard() {
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scanText, setScanText] = useState("");

    const scanMessages = [
        "Scanning number...",
        "Checking global blacklist...",
        "Analyzing scam patterns...",
        "Cross-referencing reports...",
        "Finalizing AI verdict..."
    ];

    const checkNumber = async (phone) => {
        try {
            setLoading(true);
            setResult(null);

            for (let msg of scanMessages) {
                setScanText(msg);
                await new Promise((r) => setTimeout(r, 500));
            }

            const res = await api.post("/check", { phoneNumber: phone });
            setResult(res.data);
            loadHistory();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setScanText("");
        }
    };

    const reportNumber = async (phone) => {
        await api.post("/report", { phoneNumber: phone });
        alert("⚠️ Report submitted to AI system");
    };

    const loadHistory = async () => {
        try {
            const res = await api.get("/history");
            setHistory(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadHistory();
    }, []);

    return (
        <div className="container">

            {/* HEADER */}
            <div className="title">
                🛡️ SCAM DETECTOR AI SYSTEM
            </div>

            {/* SEARCH BOX */}
            <div className="card">
                <SearchBox
                    onSearch={checkNumber}
                    onReport={reportNumber}
                />

                {/* LOADING ANIMATION */}
                {loading && (
                    <div className="scanBox">
                        <div className="scanner"></div>
                        <p className="scanText">{scanText}</p>
                    </div>
                )}
            </div>

            {/* RESULT SECTION */}
            {result && (
                <div className="card aiResult">

                    <div className="aiHeader">
                        <h2>🧠 AI Security Analysis</h2>

                        <div
                            className={`statusBadge ${
                                result.scam ? "danger" : "safe"
                            }`}
                        >
                            {result.scam
                                ? "⚠ SCAM DETECTED"
                                : "✔ SAFE NUMBER"}
                        </div>
                    </div>

                    {/* SCAM SCORE GAUGE */}
                    <div className="gaugeWrapper">
                        <div
                            className="gauge"
                            style={{ "--value": result.riskScore || 0 }}
                        >
                            <div className="gaugeText">
                                {result.riskScore || 0}%
                            </div>
                        </div>
                    </div>

                    <StatsCard data={result} />
                    <ResultCard data={result} />
                </div>
            )}

            {/* HISTORY */}
            <div className="card">
                <HistoryList data={history} />
            </div>

        </div>
    );
}