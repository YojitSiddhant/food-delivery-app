import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://food-delivery-backend-y4e1.onrender.com/api",
});

API.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;

  const raw = localStorage.getItem("userInfo");
  if (!raw) return config;

  try {
    const token = JSON.parse(raw)?.token;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore malformed localStorage
  }

  return config;
});

export default API;
