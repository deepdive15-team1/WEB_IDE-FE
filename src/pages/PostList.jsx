import { getOpenPosts } from "../api/postApi.index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryHeader from "../components/header/PrimaryHeader";
import PostListHeader from "../components/postlist/PostListHeader";
import PostListFilter from "../components/postlist/PostListFilter";
import PostListContent from "../components/postlist/PostListContent";

import styled from "styled-components";

export default function PostList() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("ALL"); // "ALL" | "OPEN" | "COMPLETED"
  const [content, setContent] = useState([]);

  const filteredContent =
    filter === "ALL"
      ? content
      : content.filter((post) => post.status === filter);

  useEffect(() => {
    getOpenPosts(0, 50).then((data) => {
      console.log(data.content);
      setContent(data.content ?? []);
    });
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/post-detail/${postId}`);
  };

  return (
    <Container>
      <PrimaryHeader />

      <MainContainer>
        <PostListHeader />

        <PostListFilter activeFilter={filter} onFilterChange={setFilter}/>

        <PostListContent posts={filteredContent} onPostClick={handlePostClick} />
      </MainContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--color-bg);
  overflow: hidden;
`;

const MainContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 20px;
  gap: 20px;
  overflow-y: auto;
  min-height: 0;
`;


