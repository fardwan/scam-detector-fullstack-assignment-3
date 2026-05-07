import axios from "axios";

const api = axios.create({
    baseURL: "https://scam-detector-fullstack-assignment-3-2.onrender.com/api/scam",
});

export default api;