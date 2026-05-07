import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <div className="app-bg">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}