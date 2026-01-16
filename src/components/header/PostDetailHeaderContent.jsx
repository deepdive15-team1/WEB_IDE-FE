import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button/Button";
import Chip from "../common/Chip/Chip";

import styled from "styled-components";
import backIcon from "../../assets/back.svg";
import profileIcon from "../../assets/profile.svg";
import calendarIcon from "../../assets/calendar.svg";
import checkIcon from "../../assets/check.svg";

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
          <TitleContainer>
            <Title>게시글 제목ooooooooooo</Title>
            <Chip variant="completed">진행중</Chip>
            <Chip variant="language">JavaScript</Chip>
          </TitleContainer>

          <PostInfoContainer>
            <Chip
              icon={profileIcon}
              bgColor="var(--color-bg)"
              textColor="var(--color-gray-600)"
            >
              사용자 이름
            </Chip>
            <Chip
              icon={calendarIcon}
              bgColor="var(--color-bg)"
              textColor="var(--color-gray-600)"
            >
              2025.01.03.(추후 api)
            </Chip>
          </PostInfoContainer>

          <Descript>
            처음 React를 배우고 있는데, useState를 사용하는 제 코드가 맞는지
            확인 부탁드립니다. 특히 상태 업데이트 부분이 궁금합니다.
          </Descript>
        </Content>

        {/* 추후 게시글 생성 api와 연결 */}
        <Button variant="primary" size="md" startIcon={<img src={checkIcon} />}>
          리뷰 완료
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
  margin: 10px;
  min-width: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  flex-wrap: nowrap;
  min-width: 0;
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
  min-width: 0;
`;
const Descript = styled.div`
  color: var(--color-gray-600);
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;


const PostInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  overflow: hidden;
  flex-wrap: wrap;
`;
