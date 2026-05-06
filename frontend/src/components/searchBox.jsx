import { useState } from "react";

export default function SearchBox({ onSearch, onReport }) {
    const [phone, setPhone] = useState("");

    return (
        <div className="searchBox">
            <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number..."
            />

            <button onClick={() => onSearch(phone)} className="btn">
                Check
            </button>

            <button onClick={() => onReport(phone)} className="btn red">
                Report
            </button>
        </div>
    );
}