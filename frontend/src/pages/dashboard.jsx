import { useEffect, useState } from "react";
import api from "../api/api";

import SearchBox from "../components/searchBox.jsx";
import ResultCard from "../components/ResultCard";
import StatsCard from "../components/StatsCard";
import HistoryList from "../components/HistoryList";

export default function Dashboard() {
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    const checkNumber = async (phone) => {
        const res = await api.post("/check", { phoneNumber: phone });
        setResult(res.data);
        loadHistory();
    };

    const reportNumber = async (phone) => {
        await api.post("/report", { phoneNumber: phone });
        alert("Reported successfully");
    };

    const loadHistory = async () => {
        const res = await api.get("/history");
        setHistory(res.data);
    };

    useEffect(() => {
        loadHistory();
    }, []);

    return (
        <div className="container">
            <h1 className="title">🛡️ Scam Detector Dashboard</h1>

            <SearchBox onSearch={checkNumber} onReport={reportNumber} />

            {result && (
                <>
                    <StatsCard data={result} />
                    <ResultCard data={result} />
                </>
            )}

            <HistoryList data={history} />
        </div>
    );
}