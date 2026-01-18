import styled from "styled-components";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../common/Button/Button";
import { Input } from "../../common/Input/Input";
import { authApi } from "../../../api/auth";
import { validateEmail, validatePassword } from "../../../utils/validators";
import { useAuthStore } from "../../../stores/useAuthStore";

const AuthLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 15px;
`;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.setLogin);

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if(!email){
      setEmailError("이메일을 입력해주세요");
      isValid = false;
    }

    
    if(!password){
      setPasswordError("비밀번호를 입력해주세요");
      isValid = false;
    }
    
    if(!isValid) return;


    if(!validateEmail(email)) {
      setEmailError("올바른 형식의 이메일이 아닙니다");
      return;
    }
    
    if (!validatePassword(password)) {
      setPasswordError("영문, 숫자, 특수문자를 조합하여 8자 이상 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      await authApi.login({ email, password });
      const userData = await authApi.getMe();

      setLogin(userData);
      
      navigate("/post-list");
    
    } catch (err) {
      const errorMessage = err.response?.data?.message || '로그인에 실패하였습니다';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <Input 
          label="아이디" 
          type="text" 
          placeholder="이메일을 입력하세요"
          errorMessage={emailError} 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          size="md"
          errorMessage={passwordError}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button 
          fullWidth type="submit" 
          disabled={isSubmitting} 
          style={{marginTop: '15px'}}
        >
          {isSubmitting ? "로그인 중" : "로그인"}
        </Button>
      </form>

      <AuthLinkContainer>
        <Button variant="text" size="md" onClick={() => navigate("/reset-password")}>
          비밀번호 재설정
        </Button>
      </AuthLinkContainer>
    </>
  );
}