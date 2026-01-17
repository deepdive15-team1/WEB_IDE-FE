import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../common/Button/Button";
import { Input } from "../../common/Input/Input";
import AccountRecoveryLayout from "./components/AccountRecoveryLayout";
import ResetPasswordLogo from "../../../assets/icons/ResetPasswordLogo.svg"

const PasswordResetFormPage = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setErrorMessage("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("비밀번호 변경 요청:", password);
    
    alert("비밀번호가 성공적으로 변경되었습니다.");
    navigate("/"); 
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
        placeholder="8자 이상 입력해주세요"
        value={password}
        onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
        }}
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
        errorMessage={errorMessage}
      />

      <Button fullWidth type="submit">
        비밀번호 변경
      </Button>
    </AccountRecoveryLayout>
  );
};

export default PasswordResetFormPage;