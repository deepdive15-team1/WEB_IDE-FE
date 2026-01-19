import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { getMyPosts } from "../api/postApi.index";
import { useAuthStore } from "../stores/useAuthStore";

import PrimaryHeader from "../components/header/PrimaryHeader";
import ProfileSection from "../components/mypage/ProfileSection";
import StatsSection from "../components/mypage/StatsSection";
import TabMenu from "../components/mypage/TabMenu";
import PostItem from "../components/mypage/PostItem";

const LayoutContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: var(--color-gray-600);
  background-color: var(--color-gray-50);
  border-radius: 12px;
  font-size: 15px;
  border: 1px dashed var(--color-gray-200);
`;

export default function MyPage() {
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      setError(null);
      try {
        // API 호출
        const data = await getMyPosts(0, 20);
        const rawPosts = data.items || [];

        const mappedPosts = rawPosts.map((post) => ({
          ...post,
          postId: post.id,
        }));

        setPosts(mappedPosts);
      } catch (err) {
        console.error("내 게시글 조회 실패:", err);
        setError("게시글을 불러오는데 실패했습니다.");
      }
    };
    fetchPosts();
  }, [user]);

  const filteredPosts = activeTab === "ALL" ? posts : posts.filter((post) => post.status === activeTab);

  const stats = {
    total: posts.length,
    ongoing: posts.filter((p) => p.status === "OPEN").length,
    completed: posts.filter((p) => p.status === "COMPLETED").length,
  };

  // 상세 페이지 이동 핸들러
  const handlePostClick = (postId) => {
    navigate(`/post-detail/me/${postId}`);
  };

  const userInfo = user || { nickname: "알 수 없음", email: "" };

  return (
    <>
      <PrimaryHeader />

      <LayoutContainer>
        <ProfileSection nickName={userInfo.nickname} email={userInfo.email} />
        <StatsSection stats={stats} />

        <TabMenu activeTab={activeTab} onTabChange={setActiveTab} stats={stats} />
        <PostList>
          {error ? (
            <EmptyState>{error}</EmptyState>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <PostItem key={post.postId} post={post} onClick={handlePostClick} />)
          ) : (
            <EmptyState>
              {activeTab === "ALL" ? "작성한 게시글이 없습니다." : activeTab === "OPEN" ? "진행 중인 리뷰가 없습니다." : "완료된 리뷰가 없습니다."}
            </EmptyState>
          )}
        </PostList>
      </LayoutContainer>
    </>
  );
}
