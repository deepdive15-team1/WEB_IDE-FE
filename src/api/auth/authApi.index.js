import * as realApi from "./authApi.js";
import * as mockApi from "./authApi.mock.js";

// 환경 변수 체크
const isMock = import.meta.env.VITE_USE_MOCK === "true";

// 개별 함수로 내보내기
export const sendVerificationCode = isMock ? mockApi.sendVerificationCode : realApi.sendVerificationCode;
export const verifyEmailCode = isMock ? mockApi.verifyEmailCode : realApi.verifyEmailCode;
export const signup = isMock ? mockApi.signup : realApi.signup;
export const login = isMock ? mockApi.login : realApi.login;
export const logout = isMock ? mockApi.logout : realApi.logout;
export const getMe = isMock ? mockApi.getMe : realApi.getMe;
export const sendPasswordResetCode = isMock ? mockApi.sendPasswordResetCode : realApi.sendPasswordResetCode;
export const verifyPasswordResetCode = isMock ? mockApi.verifyPasswordResetCode : realApi.verifyPasswordResetCode;
export const resetPassword = isMock ? mockApi.resetPassword : realApi.resetPassword;

// 객체로 묶어서 내보내기
export const authApi = {
  sendVerificationCode,
  verifyEmailCode,
  signup,
  login,
  logout,
  getMe,
  sendPasswordResetCode,
  verifyPasswordResetCode,
  resetPassword,
};