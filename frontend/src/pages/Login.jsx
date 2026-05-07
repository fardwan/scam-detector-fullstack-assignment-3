import { useState } from "react";
import axios from "axios";

export default function Login() {

    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const submitHandler = async () => {

        try {

            const endpoint = isLogin
                ? "login"
                : "register";

            const res = await axios.post(
                "https://scam-detector-fullstack-assignment-3-2.onrender.com/api/auth/" + endpoint,
                {
                    name,
                    email,
                    password,
                }
            );

            // SAVE TOKEN
            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            alert(
                isLogin
                    ? "Login successful"
                    : "Account created successfully"
            );

            // redirect dashboard
            window.location.href = "/";

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Authentication failed"
            );
        }
    };

    return (

        <div className="authPage">

            <div className="authCard">

                <h1 className="authTitle">
                    🛡️ SCAM DETECTOR AI
                </h1>

                <p className="authSubtitle">
                    Cyber Intelligence Security System
                </p>

                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />
                )}

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button onClick={submitHandler}>
                    {isLogin
                        ? "LOGIN"
                        : "CREATE ACCOUNT"}
                </button>

                <div
                    className="switchAuth"
                    onClick={() =>
                        setIsLogin(!isLogin)
                    }
                >
                    {isLogin
                        ? "No account? Register"
                        : "Already have account? Login"}
                </div>

            </div>

        </div>
    );
}