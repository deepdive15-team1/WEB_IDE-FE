import { useState } from "react";
import LoginForm from "../components/auth/login/LoginForm";
import SignupForm from "../components/auth//signup/SignupForm";
import styled from "styled-components";
import { MainLogo } from "../assets/icons/MainLogo"
import { LoginIcon } from "../assets/icons/LoginIcon";
import { SignupIcon } from "../assets/icons/SignupIcon";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f5fa;
`;

const AuthCard = styled.div`
  width: 448px;
  background-color: var(--color-white);
  padding: 40px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const TabGroup = styled.div`
  background-color: var(--color-gray-200);
  border-radius: 15px;
  padding: 4px;
  display: flex;
  margin-bottom: 30px;
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
          <MainLogo />
          <h2>Code Review IDE</h2>
          <div>코드 리뷰를 위한 협업 플랫폼</div>
        </LogoSection>
        <TabGroup>
          <TabButton $active={mode === "login"} onClick={() => setMode("login")}>
            <LoginIcon />
            로그인
          </TabButton>
          <TabButton $active={mode === "signup"} onClick={() => setMode("signup")}>
            <SignupIcon />
            회원가입
          </TabButton>
        </TabGroup>
        {mode === "login" ? <LoginForm /> : <SignupForm onSignupSuccess={handleSignupSuccess} />}
      </AuthCard>
    </PageContainer>
  );
}

export default AuthPage;
