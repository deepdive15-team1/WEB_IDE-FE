import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 추후 .env 설정
  timeout: 10000,
  headers: {
    "Content-type": "application/json"
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = "임시적 토큰"; // 추후 엑세스 토큰 상태관리 올린 다음 수정

    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }

);