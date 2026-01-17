import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button/Button";

import styled from "styled-components";
import backIcon from "../../assets/back.svg";
import storeIcon from "../../assets/store.svg";

export default function PostCreateHeaderContent() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <BackIcon onClick={handleBack}>
        <img src={backIcon} alt="뒤로 가기" />
      </BackIcon>

      <Wrapper>
        <Content>
          <Title>새 게시글 작성</Title>
          <Descript>코드 리뷰를 받고 싶은 코드를 공유하세요.</Descript>
        </Content>

        {/* 추후 게시글 생성 api와 연결 */}
        <Button variant="primary" size="md" startIcon={storeIcon}>
          게시글 생성
        </Button>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0 16px;
  background-color: var(--color-bg);
  border-top: 2px solid var(--color-gray-200);
  border-bottom: 2px solid var(--color-gray-200);
`;

const BackIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  color: var(--color-text);
  font-size: 18px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 1;
`;
const Descript = styled.div`
  color: var(--color-gray-600);
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
