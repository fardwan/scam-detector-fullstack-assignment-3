import axios from "axios";

const api = axios.create({
    baseURL: "https://scam-detector-fullstack-assignment-3-2.onrender.com/api/scam",
});

// attach token automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;