import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // Django REST APIのURL
});

// 毎回 Authorization ヘッダーを自動追加
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
