import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../common/Button/Button";
import { Input } from "../../common/Input/Input";
import AccountRecoveryLayout from "./components/AccountRecoveryLayout";
import ResetPasswordLogo from "../../../assets/icons/ResetPasswordLogo.svg"
import { validatePassword } from "../../../utils/validators";
import { authApi } from "../../../api/auth";

const PasswordResetFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!email) {
      alert("잘못된 접근입니다. 이메일 인증을 먼저 진행해주세요.");
      navigate("/reset-password"); // 인증 페이지로 이동
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email) return;

    if (!validatePassword(password)) {
      setErrorMessage("영문, 숫자, 특수문자를 조합하여 8자 이상 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);
    try {
      await authApi.resetPassword(email, password);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/"); 
    } catch (err) {
      const errmsg = err.response?.data?.message || "비밀번호 변경 실패";
      setErrorMessage(errmsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AccountRecoveryLayout
      onSubmit={handleSubmit}
      title="새 비밀번호 설정"
      subtitle="새로 사용할 비밀번호를 입력해주세요"
      icon={ResetPasswordLogo}
    >
      <Input
        label="새 비밀번호"
        type="password"
        placeholder="영문, 숫자, 특수문자 포함 8자 이상 입력해주세요"
        value={password}
        onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
        }}
        errorMessage={errorMessage && errorMessage !== "비밀번호가 일치하지 않습니다." ? errorMessage : ""}
      />
      
      <Input
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 한 번 더 입력해주세요"
        value={confirmPassword}
        onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrorMessage("");
        }}
        errorMessage={errorMessage === "비밀번호가 일치하지 않습니다." ? errorMessage : ""}
      />

      <Button fullWidth type="submit" disabled={isSubmitting}>
        비밀번호 변경
      </Button>
    </AccountRecoveryLayout>
  );
};

export default PasswordResetFormPage;