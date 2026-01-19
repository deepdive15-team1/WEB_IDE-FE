import { useState } from "react";
import { Button } from "../../common/Button/Button";
import { Input } from "../../common/Input/Input";
import ResetPasswordLogo from "../../../assets/icons/ResetPasswordLogo.svg";
import AccountRecoveryLayout from "./components/AccountRecoveryLayout";
import Back from "../../../assets/back.svg";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../api/auth/authApi.index";

const PasswordResetVerifyPage = () => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState("");
  const [isEmailCodeSent, setIsEmailCodeSent] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setVerificationCodeError("");

    try{

    if(!isEmailCodeSent){
      if(!email.trim()){
      setEmailError("이메일을 입력해주세요");
      return;
      }

      await authApi.sendPasswordResetCode(email);
      alert("인증번호가 발송 되었습니다.");
      setIsEmailCodeSent(true);
    } 
    else {
      if (!verificationCode.trim()) {
           setVerificationCodeError("인증번호를 입력해주세요.");
           return;
        }
        
        await authApi.verifyPasswordResetCode(email, verificationCode);

        alert("인증번호가 인증 되었습니다.");
        navigate('/reset-password/update', { state: { email } });
    }
  } catch (err) {
    console.error(err);

    const errorMessage = err.response?.data?.message || "오류가 발생했습니다.";

    if(!isEmailCodeSent) {
      setEmailError(errorMessage);
    } else {
      setVerificationCodeError(errorMessage);
    }
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
      errorMessage={emailError}
      value={email}
      onChange={(e) => {
        setEmail(e.target.value)
        setEmailError("");
      }}
      disabled={isEmailCodeSent}
    />

    {isEmailCodeSent && (
        <Input 
          label="인증번호" 
          placeholder="인증번호 6자리"
          value={verificationCode}
          onChange={(e) => {
            setVerificationCode(e.target.value)
            setVerificationCodeError("");
          }}
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