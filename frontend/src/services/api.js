import axios from "axios";

import { getAuthToken } from "../utils/auth";

const normalizeBaseUrl = (value) => {
  if (!value) return null;
  const trimmed = value.replace(/\/+$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
};

const API = axios.create({
  baseURL:
    normalizeBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL) ||
    "https://food-delivery-backend-y4e1.onrender.com/api",
});

API.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;

  try {
    const token = getAuthToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore auth parsing issues
  }

  return config;
});

export default API;
