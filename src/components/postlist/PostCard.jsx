import Chip from "../common/Chip";
import { formatDate } from "../../utils/formatDate";

import styled from "styled-components";
import calendarIcon from "../../assets/calendar.svg";
import profileIcon from "../../assets/profile.svg";

export default function PostCard({ post, onClick }) {
  return (
    <Container onClick={() => onClick?.(post.id)}>
      <CardHeader>
        <TitleContainer>
          <Title>{post.title}</Title>
          <Chip variant={post.status === "OPEN" ? "ongoing" : "completed"}>
            {post.status === "OPEN" ? "진행중" : "완료"}
          </Chip>
        </TitleContainer>

        {post.language && <Chip variant="language">{post.language}</Chip>}
      </CardHeader>

      {post.description && <Descript>{post.description}</Descript>}

      <CardFooter>
        <Chip
          bgColor="var(--color-bg)"
          textColor="var(--color-gray-600)"
          icon={profileIcon}
        >
          {post.authorNickname}
        </Chip>
        <Chip
          bgColor="var(--color-bg)"
          textColor="var(--color-gray-600)"
          icon={calendarIcon}
        >
          {formatDate(post.createdAt)}
        </Chip>
      </CardFooter>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  //   justify-content: space-between;
  //   align-items: center;
  padding: 12px;
  border: 2px solid var(--color-gray-200);
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    border-color: var(--color-main);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  min-width: 0;
  margin-left: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  flex: 1;
  min-width: 0;
`;

const Title = styled.div`
  color: var(--color-text);
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
`;

const Descript = styled.p`
  color: var(--color-gray-600);
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  margin-left: 10px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
