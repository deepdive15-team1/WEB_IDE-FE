import { Link } from "react-router-dom";
import { Button } from "../common/Button/Button";

import styled from "styled-components";
import plusIcon from "../../assets/plus.svg";

export default function PostListHeader() {
  return (
    <Container>
      <TitleWrapper>
        <Title>게시글 목록</Title>
        <Descript>코드 리뷰를 요청하고 함께 개선해나가세요.</Descript>
      </TitleWrapper>

      <PostCreateBtn to={`/post-create`}>
        <Button size="md" startIcon={plusIcon}>새 게시글</Button>
      </PostCreateBtn>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  color: var(--color-text);
  font-size: 24px;
`;

const Descript = styled.p`
  color: var(--color-gray-600);
  font-size: 16px;
`;

const PostCreateBtn = styled(Link)`
    text-decoration: none;
`;
