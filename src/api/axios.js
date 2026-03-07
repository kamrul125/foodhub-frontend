import axios from "axios";

const api = axios.create({
  // localhost পরিবর্তন করে আপনার ব্যাকএন্ডের Vercel লিঙ্কটি এখানে দিন
  baseURL: "https://foodhub-backend.vercel.app/api", 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;