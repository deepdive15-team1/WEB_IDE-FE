import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "../api/auth/authApi.index";

export const useAuthStore = create(
  persist((set) => ({
    user: null,
    isLoggedIn: false,

    Login: (userData) => {
      set({ user: userData, isLoggedIn: true });
    },

    Logout: async () => {
      try {
        await authApi.logout();
      } catch (err) {
        console.error("서버 로그아웃 요청 실패:", err);
      } finally {
        set({ user: null, isLoggedIn: false });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    },
  }),{
    name: 'auth-storage',
}),
);
