// 인증번호 전송 Mock
export const sendVerificationCode = async (email) => {
  console.log(`[Mock] 회원가입 인증번호 전송: ${email}`);
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true, message: "인증번호가 전송되었습니다." };
};

// 인증번호 검증 Mock
export const verifyEmailCode = async (email, code) => {
  console.log(`[Mock] 회원가입 인증번호 확인: ${email} / 코드: ${code}`);
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  if (code === "123456") {
    return { success: true };
  } else {
    // Axios 에러 구조 흉내
    throw { response: { status: 400, data: { message: "인증번호가 틀렸습니다." } } };
  }
};

// 회원가입 Mock
export const signup = async (userData) => {
  console.log("[Mock] 회원가입 요청:", userData);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: "회원가입 성공" };
};

// 로그인 Mock
export const login = async ({ email, password }) => {
  console.log(`[Mock] 로그인 요청: ${email} / ${password}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockData = {
    accessToken: "mock-access-token-" + Date.now(),
    refreshToken: "mock-refresh-token-" + Date.now(),
  };

  // Mock 환경에서도 토큰이 있어야 앱이 동작하므로 저장
  localStorage.setItem("accessToken", mockData.accessToken);
  localStorage.setItem("refreshToken", mockData.refreshToken);

  return mockData;
};


// 로그아웃 Mock
export const logout = async () => {
  console.log("[Mock] 로그아웃 요청");
  await new Promise((resolve) => setTimeout(resolve, 500));
};

// 내 정보 조회 Mock
export const getMe = async () => {
  console.log("[Mock] 내 정보 조회 요청");
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: 1,
    email: "mock@example.com",
    nickname: "MockUser",
  };
};

// 비밀번호 재설정 코드 전송 Mock
export const sendPasswordResetCode = async (email) => {
  console.log(`[Mock] 비밀번호 재설정 코드 전송: ${email}`);
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true };
};

// 비밀번호 재설정 코드 검증 Mock
export const verifyPasswordResetCode = async (email, code) => {
  console.log(`[Mock] 비밀번호 재설정 코드 확인: ${email} / ${code}`);
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (code === "123456") {
    return { success: true, message: "인증 성공" };
  } else {
    throw { response: { status: 400, data: { message: "인증번호가 올바르지 않습니다" } } };
  }
};

// 비밀번호 변경 Mock
export const resetPassword = async (email, newPassword) => {
  console.log(`[Mock] 비밀번호 변경 요청: ${email} -> ${newPassword}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true };
};