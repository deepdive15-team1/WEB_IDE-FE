import { useState } from "react";
import { Button } from "../../common/Button/Button";
import { Input } from "../../common/Input/Input";
import ResetPasswordLogo from "../../../assets/icons/ResetPasswordLogo.svg";
import AccountRecoveryLayout from "./components/AccountRecoveryLayout";
import Back from "../../../assets/Back.svg";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth";

const PasswordResetVerifyPage = () => {

  const [email, setEmail] = useState("");
  const [findEmailError, setFindEmailError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState("");
  const [isEmailCodeSent, setIsEmailCodeSent] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFindEmailError("");
    setVerificationCodeError("");

    try{

    if(!isEmailCodeSent){
      if(!email.trim()){
      setFindEmailError("이메일을 입력해주세요");
      return;
      }

      await authApi.sendVerificationCode(email);
      alert("인증번호가 발송 되었습니다.");
      setIsEmailCodeSent(true);
    } 
    else {
      // TODO: 인증번호 확인 로직
      const response = await authApi.verifyEmailCode(email, verificationCode);

      if(response.success) {
        alert("인증번호가 인증 되었습니다.");
        navigate('/reset-password/update');
      } else {
          setVerificationCodeError("인증번호가 올바르지 않습니다.");
      }
    }
  } catch (err) {
    console.error(err);
    setFindEmailError(err.message || "오류가 발생했습니다");
  }
}

  const handleBack = () => {
    navigate(-1);
  }
  


  return (
    <AccountRecoveryLayout 
      onSubmit={handleSubmit} 
      title="비밀번호 재설정"
      subtitle="가입하실 때 사용하신 이메일을 입력해주세요"
      icon={ResetPasswordLogo}
    >
    <Input
      label="이메일"
      type="text"
      placeholder="이메일을 입력하세요"
      errorMessage={findEmailError}
      value={email}
      onChange={(e) => {
        setEmail(e.target.value)
        setFindEmailError("");
      }}
      disabled={isEmailCodeSent}
    />

    {isEmailCodeSent && (
        <Input 
          label="인증번호" 
          placeholder="인증번호 6자리"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          errorMessage={verificationCodeError}
        />
    )}

    <Button fullWidth type="submit">
      {isEmailCodeSent ? "인증번호 확인" : "이메일 확인"}
    </Button>

    <Button fullWidth variant="outline" startIcon={Back} onClick={handleBack}>
      로그인으로 돌아가기
    </Button>
    </AccountRecoveryLayout>
  )
}

export default PasswordResetVerifyPage;