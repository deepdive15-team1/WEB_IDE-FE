import styled from "styled-components";
import PostCard from "./PostCard";

export default function PostListContent({ posts, onPostClick }) {
  if (posts.length === 0) {
    return (
      <Container>
        <Empty>게시글이 없습니다.</Empty>
      </Container>
    );
  }

  return (
    <Container>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onClick={onPostClick} />
      ))}
    </Container>
  );
}

const Container = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Empty = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  font-size: 15px;
  color: var(--color-gray-600);
  background: var(--color-gray-50);
  border-radius: 12px;
  border: 1px dashed var(--color-gray-200);
`;
