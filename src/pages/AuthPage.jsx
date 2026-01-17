import { useState } from "react";
import LoginForm from "../components/auth/login/LoginForm";
import SignupForm from "../components/auth//signup/SignupForm";
import styled from "styled-components";
import logo from "../assets/logo.svg"
import LoginIcon from "../assets/icons/LoginIcon.svg";
import SignupIcon from "../assets/icons/SignupIcon.svg";
import { PageContainer, AuthCard,LogoSection } from "../components/auth/styles/AuthLayout";

const TabGroup = styled.div`
  background-color: var(--color-gray-200);
  border-radius: 15px;
  padding: 4px;
  display: flex;
  margin-bottom: 10px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px 0;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
  color: var(--color-black);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background-color: ${(props) => (props.$active ? "var(--color-white)" : "transparent")};
  box-shadow: ${(props) => (props.$active ? "0 2px 4px rgba(0,0,0,0.1)" : "none")};
`;

function AuthPage() {
  const [mode, setMode] = useState("login");

  //회원가입 성공 시 로그인으로 변경
  const handleSignupSuccess = () => {
    setMode("login");
  };

  return (
    <PageContainer>
      <AuthCard>
        <LogoSection>
          <img src={logo} alt="메인로고" width="56" height="56"/>
          <h2>Code Review IDE</h2>
          <div>코드 리뷰를 위한 협업 플랫폼</div>
        </LogoSection>
        <TabGroup>
          <TabButton $active={mode === "login"} onClick={() => setMode("login")}>
            <img src={LoginIcon} alt="로그인 아이콘" />
            로그인
          </TabButton>
          <TabButton $active={mode === "signup"} onClick={() => setMode("signup")}>
            <img src={SignupIcon} alt="회원가입 아이콘" />
            회원가입
          </TabButton>
        </TabGroup>
        {mode === "login" ? <LoginForm /> : <SignupForm onSignupSuccess={handleSignupSuccess} />}
      </AuthCard>
    </PageContainer>
  );
}

export default AuthPage;
