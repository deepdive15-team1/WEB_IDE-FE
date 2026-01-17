import styled from "styled-components";
import Chip from "../common/Chip";
import calendar from "../../assets/calendar.svg";

const PostCard = styled.div`
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  &:hover {
    border-color: #d1d5db;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--color-text);
`;

const CardContent = styled.p`
  margin: 0;
  color: var(--color-gray-600);
  font-size: 15px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
  color: var(--color-gray-600);
  font-size: 13px;
`;

const FooterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default function PostItem({ post, onClick }) {
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
  };

  return (
    <PostCard onClick={() => onClick(post.postId)}>
      <CardHeader>
        <TitleGroup>
          <CardTitle>{post.title}</CardTitle>
          <Chip variant={post.status === "OPEN" ? "ongoing" : "completed"}>
            {post.status === "OPEN" ? "진행중" : "완료"}
          </Chip>
        </TitleGroup>
        {post.language && <Chip variant="language">{post.language}</Chip>}
      </CardHeader>
      <CardContent>{post.description}</CardContent>
      <CardFooter>
        <FooterItem>
          <img src={calendar} alt={calendar} /> {formatDate(post.createdAt)}
        </FooterItem>
      </CardFooter>
    </PostCard>
  );
}