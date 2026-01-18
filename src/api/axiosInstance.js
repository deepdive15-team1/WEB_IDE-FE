import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL // 추후 .env 설정

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000
});

//요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config;

    //401 에러이고 아직 재시도하지 않은 요청일 때
    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("refreshToken이 없습니다.");
        }

        //토큰 재발급 요청
        const { data } = await axios.post(`${BASE_URL}/auth/token`, {
          refreshToken: refreshToken,
        });

        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // 실패했던 요청의 헤더를 새 토큰으로 교체 후 재요청
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        console.error("토큰 재발급 실패:", refreshError);

        useAuthStore.getState().Logout();

        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/";

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err);
  },
);
