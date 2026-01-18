import { axiosInstance } from "./axiosInstance";

export const authApi = {
  // 인증번호 전송
  sendVerificationCode: async (email) => {
    const response = await axiosInstance.post(`/auth/email/verification/signup`, { email });
    return response.data;
  },

  // 인증번호 검증
  verifyEmailCode: async (email, code) => {
    const response = await axiosInstance.post(`/auth/email/verification/confirm`, { email, code });
    return response.data;
  },

  // 회원가입
  signup: async (userData) => {
    const response = await axiosInstance.post(`/auth/signup`, userData);
    return response.data;
  },

  // 로그인
  login: async ({ email, password }) => {
    const response = await axiosInstance.post(`/auth/login`, { email, password });

    const { accessToken, refreshToken } = response.data;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    return response.data;
  },

  // 비밀번호 재설정 발급
  sendPasswordResetCode: async (email) => {
    // [TODO] 명세 확정 시 주석 해제 및 Body 수정 필요
    /*
    const response = await axiosInstance.post(`/auth/password/reset`, { email });
    return response.data;
    */

    console.log(`[Mock] 비밀번호 재설정 인증번호 전송: ${email}`);
    await new Promise((resolve) => setTimeout(resolve, 800)); // 0.8초 지연
    return { success: true };
  },

  // 인증번호 검증
  verifyPasswordResetCode: async (email, code) => {
    // [TODO] 명세 확정 시 주석 해제 및 Body 수정 필요
    /*
    const response = await axiosInstance.post(`/auth/password/cofirm`, { email, code });
    return response.data;
    */

    console.log(`[Mock] 비밀번호 재설정 인증번호 확인: ${email} / 코드: ${code}`);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // UI 테스트를 위해 '123456'일 때만 성공하고, 나머지는 에러로 설정
    if (code === "123456") {
      return { success: true, message: "인증 성공" };
    } else {
      const error = new Error("Mock Error");
      error.response = {
        data: { message: "인증번호가 올바르지 않습니다" }
      };
      throw error;
    }
  },

  // 비밀번호 변경
  resetPassword: async (email, newPassword) => {
    // [TODO] 명세 확정 시 주석 해제 및 Body 수정 필요
    /* const response = await axiosInstance.patch(`/auth/password`, { 
      email,
      newPassword 
    });
    return response.data;
    */

    console.log(`[Mock] 비밀번호 변경 요청: ${email} -> ${newPassword}`);
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    return { success: true }; 
  },
};