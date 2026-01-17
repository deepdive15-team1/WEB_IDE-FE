import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PrimaryHeader from '../components/header/PrimaryHeader';
import ProfileSection from '../components/mypage/ProfileSection';
import StatsSection from '../components/mypage/StatsSection';
import TabMenu from '../components/mypage/TabMenu';
import PostItem from '../components/mypage/PostItem';

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

//Mock Data
const API_RESPONSE = {
  content: [
    {
      postId: 10,
      title: "이 코드 리뷰 부탁해요 (Java 스트림 처리)",
      description: "리스트를 필터링하고 변환하는 과정에서 스트림을 썼는데, 성능상 이슈가 없을지 봐주세요.",
      language: "JAVA",
      status: "OPEN",
      createdAt: "2026-01-14T15:30:12.123+09:00",
    },
    {
      postId: 9,
      title: "React useEffect 무한 루프 문제",
      description: "의존성 배열에 객체를 넣었더니 계속 리렌더링이 발생합니다. useMemo를 써야 할까요?",
      language: "JAVASCRIPT",
      status: "OPEN",
      createdAt: "2026-01-13T10:15:00.000+09:00",
    },
    {
      postId: 8,
      title: "Spring Boot JPA N+1 문제 해결 조언 구합니다",
      description: "Fetch Join을 적용했는데도 연관된 엔티티를 가져올 때 쿼리가 추가로 나갑니다.",
      language: "JAVA",
      status: "COMPLETED",
      createdAt: "2026-01-10T09:00:00.000+09:00",
    },
    {
      postId: 7,
      title: "TypeScript 제네릭 타입 추론 질문",
      description: "함수 파라미터로 들어오는 객체의 키값을 타입으로 제한하고 싶은데 잘 안되네요.",
      language: "TYPESCRIPT",
      status: "OPEN",
      createdAt: "2026-01-08T14:20:00.000+09:00",
    },
    {
      postId: 6,
      title: "파이썬 알고리즘 풀이 코드 리뷰 (DFS)",
      description: "백준 문제 풀이입니다. 재귀 깊이가 깊어져서 런타임 에러가 나는데 로직 문제일까요?",
      language: "PYTHON",
      status: "COMPLETED",
      createdAt: "2026-01-05T18:45:00.000+09:00",
    }
  ],
  totalElements: 5,
};

const USER_INFO = {
  "id": 1,
  "email": "test@example.com",
  "nickname": "test"
};

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('ALL');
  const navigate = useNavigate();
  const posts = API_RESPONSE.content || [];

  const filteredPosts = activeTab === 'ALL' 
    ? posts 
    : posts.filter(post => post.status === activeTab);

  const stats = {
    total: posts.length, 
    ongoing: posts.filter(p => p.status === 'OPEN').length,
    completed: posts.filter(p => p.status === 'COMPLETED').length,
  };

  // 상세 페이지 이동 핸들러
  const handlePostClick = (id) => {
    console.log(`게시물 상세 페이지 이동: ${id}`);
    navigate(`/posts/${id}`);
  };

  return (
    <>
      <PrimaryHeader />
      
      <LayoutContainer>
        <ProfileSection nickName={USER_INFO.nickname} email={USER_INFO.email} />
        <StatsSection stats={stats} />

        <TabMenu 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          stats={stats} 
        />
        <PostList>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <PostItem 
                key={post.postId} 
                post={post} 
                onClick={handlePostClick} 
              />
            ))
          ) : (
            <EmptyState>
              {activeTab === 'ALL' 
                ? '작성한 게시글이 없습니다.' 
                : activeTab === 'OPEN' 
                  ? '진행 중인 리뷰가 없습니다.' 
                  : '완료된 리뷰가 없습니다.'}
            </EmptyState>
          )}
        </PostList>
      </LayoutContainer>
    </>
  );
}