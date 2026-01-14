// TODO: 실제 서버 연동 시 교체 필요

const DELAY = 1000;

export const authApi = {
  // 1. 이메일 중복 체크
  checkEmailDuplicate: async (email) => {
    console.log(`[API] 이메일 중복 체크 요청: ${email}`);

    await new Promise((resolve) => setTimeout(resolve, DELAY));

    // 테스트 시나리오: "admin@test.com"은 이미 있다고 가정
    if (email === "admin@test.com") {
      return { isDuplicate: true };
    }
    
    return { isDuplicate: false };
  },

  // 2. 인증번호 전송
  sendVerificationCode: async (email) => {
    console.log(`[API] 인증번호 전송 요청: ${email}`);
    await new Promise((resolve) => setTimeout(resolve, DELAY));
    
    // 무조건 성공한다고 가정
    return { success: true };
  },

  // 3. 인증번호 검증
  verifyEmailCode: async (email, code) => {
    console.log(`[API] 인증번호 확인 요청: 이메일(${email}), 코드(${code})`);
    await new Promise((resolve) => setTimeout(resolve, DELAY));

    // 테스트 시나리오: 인증번호가 "123456"일 때만 성공
    if (code === "123456") {
      return { success: true };
    } else {
      return { success: false };
    }
  },

  // 4. 회원가입 완료
  signup: async (userData) => {
    console.log(`[API] 회원가입 요청 데이터:`, userData);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 무조건 성공
    return { success: true, message: "회원가입 성공" };
  },

  // 5. 로그인
  login: async ({ email, password }) => {
    console.log(`[API] 로그인 요청: ${email} / ${password}`);
    await new Promise((resolve) => setTimeout(resolve, DELAY));

    // [테스트 시나리오] 
    // 아이디: test@test.com
    // 비번: 12341234!
    if (email === "test@test.com" && password === "12341234!") {
      return {
        success: true,
        token: "mock-jwt-token-xyz-123", // 가짜 토큰
        user: {
          id: 1,
          email: "test@test.com",
          nickname: "테스트유저",
          profileImage: "https://via.placeholder.com/150"
        }
      };
    } else {
      throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  }
};