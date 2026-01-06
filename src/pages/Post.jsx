import styled from 'styled-components';

const Post = () => {
  return (
    <PostContainer>
      <div>포스트 페이지입니다.</div>
    </PostContainer>
  );
};

export default Post;

const PostContainer = styled.div`
  padding: 20px;
  background-color: var(--color-bg);
`;
