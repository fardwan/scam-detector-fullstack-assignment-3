import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "https://YOUR_BACKEND_URL/api/auth/login",
                { email, password }
            );

            // SAVE TOKEN
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            alert("Login successful");

            // redirect to dashboard
            window.location.href = "/";
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Login</h2>

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <br /><br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}