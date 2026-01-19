import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../common/Button/Button";
import Chip from "../common/Chip/Chip";
import { formatDate } from "../../utils/formatDate";
import { useAuthStore } from "../../stores/useAuthStore";
import { completePost } from "../../api/postApi.index";

import styled from "styled-components";
import backIcon from "../../assets/back.svg";
import profileIcon from "../../assets/profile.svg";
import calendarIcon from "../../assets/calendar.svg";
import checkIcon from "../../assets/check.svg";

export default function PostDetailHeaderContent({ post, onPostUpdate }) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleComplete = async () => {
    if (!post || post.status === "COMPLETED") {
      return;
    }

    try {
      setIsCompleting(true);
      await completePost(post.id || post.postId);
      
      // 부모 컴포넌트에 업데이트 알림 (상태 새로고침)
      if (onPostUpdate) {
        onPostUpdate();
      } else {
        // onPostUpdate가 없으면 페이지 새로고침
        window.location.reload();
      }
    } catch (error) {
      alert("리뷰 완료 처리에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsCompleting(false);
    }
  };

  if (!post) {
    return null;
  }

  // 로그인한 사용자가 포스트 작성자인지 확인
  // const isAuthor = user && post.authorId === user.id;
  const isAuthor = true;

  return (
    <Container>
      <BackIcon onClick={handleBack}>
        <img src={backIcon} alt="뒤로 가기" />
      </BackIcon>

      <Wrapper>
        <Content>
          <TitleContainer>
            <Title>{post.title}</Title>
            <Chip variant={post.status === "OPEN" ? "ongoing" : "completed"}>
              {post.status === "OPEN" ? "진행중" : "완료"}
            </Chip>
            {post.language && <Chip variant="language">{post.language}</Chip>}
          </TitleContainer>

          <PostInfoContainer>
            <Chip
              icon={profileIcon}
              bgColor="var(--color-bg)"
              textColor="var(--color-gray-600)"
            >
              {post.authorNickname}
            </Chip>
            <Chip
              icon={calendarIcon}
              bgColor="var(--color-bg)"
              textColor="var(--color-gray-600)"
            >
              {formatDate(post.createdAt)}
            </Chip>
          </PostInfoContainer>

          {post.description && <Descript>{post.description}</Descript>}
        </Content>

        <ButtonContainer>
          {isAuthor ? (
            /* 작성자일 때: 진행중 상태일 때만 버튼 표시 */
            post.status === "OPEN" && (
              <>
                {/* 코드 수정 버튼 */}
                <Button 
                  variant="outline" 
                  size="md"
                  onClick={() => navigate(`/post-edit/${post.id || post.postId}`)}
                >
                  코드 수정
                </Button>
                {/* 리뷰 완료 버튼 */}
                <Button 
                  variant="primary" 
                  size="md" 
                  startIcon={checkIcon}
                  onClick={handleComplete}
                  disabled={isCompleting}
                >
                  {isCompleting ? "처리 중..." : "리뷰 완료"}
                </Button>
              </>
            )
          ) : (
            /* 작성자가 아닐 때: 실시간 연결 버튼 */
            <Button variant="primary" size="md">
              실시간 연결
            </Button>
          )}
        </ButtonContainer>
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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
