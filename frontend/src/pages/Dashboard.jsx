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

    /**
     * 🔓 LOGOUT
     */
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    /**
     * 🗑️ DELETE ACCOUNT (FIXED)
     */
    const handleDeleteAccount = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");

            const userId = user.id || user._id;

            if (!userId) {
                alert("User session not found");
                return;
            }

            const confirmDelete = window.confirm(
                "⚠️ This action is permanent. Delete account?"
            );

            if (!confirmDelete) return;

            // ✅ FIXED: removed /api duplication
            await api.delete("/auth/delete", {
                data: { userId }
            });

            alert("Account deleted successfully");

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/login";

        } catch (err) {
            console.log("DELETE ERROR:", err.response?.data || err.message);
            alert("Failed to delete account");
        }
    };

    /**
     * 🔍 SCAN NUMBER
     */
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
            console.error("Check error:", err);
        } finally {
            setLoading(false);
            setScanText("");
        }
    };

    /**
     * ⚠️ REPORT NUMBER
     */
    const reportNumber = async (phone) => {
        try {
            await api.post("/report", { phoneNumber: phone });
            alert("Report submitted");
        } catch (err) {
            alert("Failed to report");
        }
    };

    /**
     * 📜 LOAD HISTORY
     */
    const loadHistory = async () => {
        try {
            const res = await api.get("/history");
            setHistory(res.data);
        } catch (err) {
            console.error("History error:", err);
        }
    };

    useEffect(() => {
        loadHistory();
    }, []);

    return (
        <div className="container">

            {/* HEADER */}
            <div className="aiHeader" style={{ marginBottom: "20px" }}>
                <div className="title">
                    🛡️ SCAM DETECTOR AI SYSTEM
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button className="btn red" onClick={handleLogout}>
                        Logout
                    </button>

                    <button
                        className="btn"
                        onClick={handleDeleteAccount}
                        style={{
                            background: "linear-gradient(135deg,#ff3b3b,#990000)"
                        }}
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {/* SEARCH */}
            <div className="card">
                <SearchBox
                    onSearch={checkNumber}
                    onReport={reportNumber}
                />

                {loading && (
                    <div className="scanBox">
                        <div className="scanner"></div>
                        <p className="scanText">{scanText}</p>
                    </div>
                )}
            </div>

            {/* RESULT */}
            {result && (
                <div className="card aiResult">

                    <div className="aiHeader">
                        <h2>🧠 AI Security Analysis</h2>

                        <div className={`statusBadge ${result.scam ? "danger" : "safe"}`}>
                            {result.scam ? "⚠ SCAM DETECTED" : "✔ SAFE NUMBER"}
                        </div>
                    </div>

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