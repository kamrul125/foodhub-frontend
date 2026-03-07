import axios from "axios";

const api = axios.create({
  // এটি অটোমেটিক চেক করবে আপনি লোকালহোস্টে আছেন কি না
  baseURL: window.location.hostname === "localhost" 
    ? "http://localhost:5000/api" 
    : "https://foodhub-backend.vercel.app/api", 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;