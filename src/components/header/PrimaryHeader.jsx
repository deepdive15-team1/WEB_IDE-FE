import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button/Button";
import Chip from '../common/Chip';

import styled from "styled-components";
import logoIcon from "../../assets/logo.svg";
import postIcon from "../../assets/post.svg";
import profileIcon from "../../assets/profile.svg";
import logoutIcon from "../../assets/logout.svg";
export default function PrimaryHeader() {
  const navigate = useNavigate();

  return (
    <Container>
      {/* 추후 auth 또는 포스트 리스트 페이지로 이동하도록 수정 */}
      <LogoNav>
        <img src={logoIcon} />
        <p>Code Review IDE</p>
      </LogoNav>

      <PageNav>
        <Button
          variant="text"
          size="sm"
          startIcon={<img src={postIcon} />}
          // 추후 포스트 리스트 페이지로 이동하도록 수정
          onClick={() => navigate("/")} 
        >
          게시글 목록
        </Button>
        <Button 
          variant="text" 
          size="sm" 
          startIcon={<img src={profileIcon} />}
          // 추후 포스트 리스트 페이지로 이동하도록 수정
          onClick={() => navigate("/")} 
        >
          마이페이지
        </Button>
      </PageNav>

      <Auth>
        {/* 임시 사용자 부분을 실제 사용자 이름으로 수정할 것 */}
        <Chip>
          임시 사용자
        </Chip>
        <Button 
          variant="text" 
          size="sm" 
          startIcon={<img src={logoutIcon} />}
          // 추후 로그아웃 로직으로 수정
          onClick={() => navigate("/")} 
        >
          로그아웃
        </Button>
      </Auth>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 16px;
  background-color: var(--color-bg);
`;

const LogoNav = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 10px;
  text-decoration: none;
  font-weight: 600;
  color: var(--color-text);

  img {
    with: 36px;
    height: 36px;
  }
`;

const PageNav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  color: var(--color-text);
`;

const Auth = styled.div`
  display: flex;
  align-items: center;
`;

