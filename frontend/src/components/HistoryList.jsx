export default function HistoryList({ data }) {
    return (
        <div className="history">
            <h2>📜 Scan History</h2>

            {data.map((item) => (
                <div key={item._id} className="historyItem">
                    <p><b>{item.phone}</b></p>
                    <p>Status: {item.status}</p>
                    <p>Score: {item.score}</p>
                </div>
            ))}
        </div>
    );
}