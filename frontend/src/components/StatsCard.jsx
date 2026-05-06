export default function StatsCard({ data }) {
    return (
        <div className="stats">
            <div className="statBox">
                <h3>Score</h3>
                <p>{data.score}</p>
            </div>

            <div className="statBox">
                <h3>Status</h3>
                <p>{data.status}</p>
            </div>

            <div className="statBox">
                <h3>Search Count</h3>
                <p>{data.searchCount}</p>
            </div>
        </div>
    );
}