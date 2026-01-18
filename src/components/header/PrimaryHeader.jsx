import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button/Button";
import Chip from "../common/Chip";

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
          startIcon={postIcon}
          // 추후 포스트 리스트 페이지로 이동하도록 수정
          onClick={() => navigate("/")}
        >
          게시글 목록
        </Button>
        <Button
          variant="text"
          size="sm"
          startIcon={profileIcon}
          // 추후 포스트 리스트 페이지로 이동하도록 수정
          onClick={() => navigate("/")}
        >
          마이페이지
        </Button>
      </PageNav>

      <Auth>
        {/* 임시 사용자 부분을 실제 사용자 이름으로 수정할 것 */}
        <Chip>임시 사용자</Chip>
        <Button
          variant="text"
          size="sm"
          startIcon={logoutIcon}
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
  padding: 0px 16px;
  background-color: var(--color-bg);
  border-bottom: 2px solid var(--color-gray-200);
  min-width: 0;
  overflow: hidden;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 0px 8px;
  }
`;

const LogoNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  text-decoration: none;
  font-weight: 600;
  color: var(--color-text);
  min-width: 0;

  img {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
  }

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;

    @media (max-width: 480px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

const PageNav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  min-width: 0;
  gap: 4px;
  color: var(--color-text);
  overflow: hidden;

  button {
    flex-shrink: 0;
    min-width: 0;

    .button-text {
      @media (max-width: 480px) {
        display: none;
      }
    }
  }

  @media (max-width: 768px) {
    gap: 2px;
  }
`;

const Auth = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  min-width: 0;
  overflow: hidden;

  button {
    flex-shrink: 0;
    min-width: 0;

    .button-text {
      @media (max-width: 480px) {
        display: none;
      }
    }
  }

  /* Chip 컴포넌트에 대한 반응형 처리 */
  span {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-shrink: 0;

    @media (max-width: 480px) {
      max-width: 80px;
    }
  }

  @media (max-width: 768px) {
    gap: 4px;
  }

  @media (max-width: 480px) {
    gap: 2px;
  }
`;
