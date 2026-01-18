import { useState } from "react";
import { authApi } from "../../../api/auth";
import { validateEmail, validatePassword } from "../../../utils/validators";

export const useSignup = (onSignupSuccess) => {
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    verificationCode: "", // 사용자가 입력한 인증 코드
  });

  const [status, setStatus] = useState({
    isEmailSent: false, // 이메일 전송 여부
    isEmailVerified: false, // 이메일 인증 완료 여부
    isSubmitting: false, //제출 상태
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    verification: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "nickname":
        break;

      case "email":
        if (status.isEmailVerified || status.isEmailSent) {
          setStatus((prev) => ({
            ...prev,
            isEmailSent: false,
            isEmailVerified: false,
          }));
          setForm((prev) => ({ ...prev, verificationCode: "" }));
          setErrors((prev) => ({ ...prev, email: "" }));
        }
        break;

      case "verificationCode":
        if (errors.verification) {
          setErrors((prev) => ({ ...prev, verification: "" }));
        }
        break;

      case "password":
        if (value.length > 0 && !validatePassword(value)) {
          setErrors((prev) => ({
            ...prev,
            password: "영문, 숫자, 특수문자를 조합하여 8자 이상 입력해주세요.",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            password: "",
          }));
        }
        // 비밀번호를 바꾸면, 비밀번호 확인란도 다시 검사
        if (form.confirmPassword.length > 0) {
          if (value !== form.confirmPassword) {
            setErrors((prev) => ({
              ...prev,
              confirmPassword: "비밀번호가 일치하지 않습니다",
            }));
          } else {
            setErrors((prev) => ({ ...prev, confirmPassword: "" }));
          }
        }
        break;

      case "confirmPassword":
        if (value.length > 0 && form.password !== value) {
          setErrors((prev) => ({ ...prev, confirmPassword: "비밀번호가 일치하지 않습니다" }));
        } else {
          setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }
        break;

      default:
        break;
    }
  };

  // 인증번호 전송
  const handleSendVerification = async () => {
    if (!validateEmail(form.email)) {
      setErrors((prev) => ({ ...prev, email: "올바른 이메일 형식이 아닙니다" }));
      return;
    }

    try {
      await authApi.sendVerificationCode(form.email);
      setStatus((prev) => ({ ...prev, isEmailSent: true }));
      alert("인증번호가 전송되었습니다. 이메일을 확인해주세요.");
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "인증번호 전송에 실패하였습니다";
      setErrors((prev) => ({ ...prev, email: errorMessage }));
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    if (!form.verificationCode) return;

    setErrors((prev) => ({ ...prev, verification: "" }));

    try {
      await authApi.verifyEmailCode(form.email, form.verificationCode);

      setStatus((prev) => ({ ...prev, isEmailVerified: true }));
      alert("이메일 인증이 완료되었습니다.");

    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "인증번호가 올바르지 않습니다.";
      setErrors((prev) => ({ ...prev, verification: errorMessage }));
    }
  };

  //회원가입
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!status.isEmailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
    // 에러가 하나라도 있으면 제출 불가
    if (errors.email || errors.password || errors.confirmPassword || !form.email || !form.password || !form.nickname) {
      alert("입력 정보를 다시 확인해주세요.");
      return;
    }

    setStatus((prev) => ({ ...prev, isSubmitting: true }));

    try {
      // 회원가입 요청
      await authApi.signup({
        email: form.email,
        nickname: form.nickname,
        password: form.password,
      });
      alert(form.nickname + "님 가입을 축하합니다");

      if (onSignupSuccess) {
        onSignupSuccess();
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "회원가입 중 오류가 발생하였습니다"
      alert(errorMessage);
    } finally {
      setStatus((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  return {
    form,
    status,
    errors,
    handlers: {
      handleInputChange,
      handleSendVerification,
      handleVerifyCode,
      handleSignup,
    },
  };
};
