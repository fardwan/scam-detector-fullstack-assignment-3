export default function ResultCard({ data }) {
    const color =
        data.status === "HIGH_RISK"
            ? "red"
            : data.status === "SUSPICIOUS"
                ? "orange"
                : "green";

    return (
        <div className="card" style={{ borderLeft: `6px solid ${color}` }}>
            <h2>{data.phone}</h2>

            <h3 style={{ color }}>{data.status}</h3>

            <p>Score: {data.score}/100</p>

            <h4>Reasons:</h4>
            <ul>
                {data.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                ))}
            </ul>
        </div>
    );
}