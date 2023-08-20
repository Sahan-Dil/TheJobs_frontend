// src/utils/api.js
import axios from "axios";
import { getToken } from "./Auth";

const instance = axios.create({
  baseURL: "YOUR_API_BASE_URL",
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
