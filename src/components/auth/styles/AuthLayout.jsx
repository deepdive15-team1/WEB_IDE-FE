import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f5fa;
`;

export const AuthCard = styled.div`
  width: 448px;
  background-color: var(--color-white);
  padding: 40px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;