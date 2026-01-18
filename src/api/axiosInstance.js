import axios from "axios";

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

    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("refreshToken이 없습니다.");
        }

        const { data } = await axios.post(`${BASE_URL}/auth/token`, {
          refreshToken: refreshToken,
        });

        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        console.error("토큰 재발급 실패:", refreshError);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/";

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err);
  },
);
