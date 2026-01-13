export const validateEmail = (email) => {
  // 이메일 형식 체크: @ 포함, . 뒤에 2글자 이상
  const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (pwd) => {
  // 8자 이상, 영문/숫자/특수문자(!@#$%^&*) 각각 최소 1개 이상 포함
  const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return pwdRegex.test(pwd);
};