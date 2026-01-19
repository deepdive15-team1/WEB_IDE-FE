import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getPost } from "../api/postApi.index";
import PostPageLayout from "../components/post/PostPageLayout";
import PostDetailHeaderContent from "../components/header/PostDetailHeaderContent";
import PostEditHeaderContent from "../components/header/PostEditHeaderContent";
import PostSection from "../components/post/PostSection";
import PostCodeEditor from "../components/post/PostCodeEditor";
import ChatSection from "../components/chat/ChatSection";
import Chip from "../components/common/Chip/Chip";
import usePostCreateStore from "../stores/postCreateStore";

import linkedIcon from "../assets/linked.svg";

export default function PostDetail() {
  const { postId } = useParams();
  const location = useLocation();
  const isEditMode = location.pathname.includes("/post-edit/");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLineNumber, setSelectedLineNumber] = useState(null);

  const fetchPost = useCallback(async () => {
    if (!postId) return;
    
    try {
      setLoading(true);
      const data = await getPost(Number(postId));
      setPost(data);
    } catch (err) {
      console.error("포스트 상세 조회 실패:", err);
      setError(err);
      alert("포스트를 불러오는데 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost, location.pathname]);

  // 편집 모드일 때 포스트 데이터를 스토어에 로드
  useEffect(() => {
    if (isEditMode && post) {
      const store = usePostCreateStore.getState();
      store.setLanguage(post.language?.toLowerCase() || "javascript");
      store.setCodeTextImmediate(post.codeText || "");
    }
  }, [isEditMode, post]);

  // 편집 모드에서 일반 모드로 전환될 때 데이터 다시 가져오기
  useEffect(() => {
    if (!isEditMode) {
      fetchPost();
    }
  }, [isEditMode, fetchPost]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error || !post) {
    return <div>포스트를 불러올 수 없습니다.</div>;
  }

  // language를 소문자로 변환 (Monaco Editor는 소문자 언어 코드를 사용)
  const editorLanguage = post.language?.toLowerCase() || "javascript";

  const handleLineClick = (lineNumber) => {
    setSelectedLineNumber(lineNumber);
  };

  return (
    <PostPageLayout 
      postHeader={
        isEditMode 
          ? <PostEditHeaderContent postId={Number(postId)} />
          : <PostDetailHeaderContent post={post} onPostUpdate={fetchPost} />
      }
    >
      <PostSection
        title="코드"
        descript={isEditMode ? "코드를 수정하세요." : "줄 번호를 클릭하여 해당 줄에 대한 댓글을 작성할 수 있습니다."}
      >
        <PostCodeEditor
          language={editorLanguage}
          codeText={isEditMode ? undefined : post.codeText}
          readOnly={isEditMode ? false : true}
          onLineClick={isEditMode ? undefined : handleLineClick}
        />
      </PostSection>

      {!isEditMode && (
        <PostSection
          title="채팅"
          descript="코드 라인을 선택하고 댓글을 달아보세요."
          statusChip={
            <Chip
              bgColor="var(--color-completed-bg)"
              textColor="var(--color-completed-text)"
              icon={linkedIcon}
            >
              실시간 연결됨
            </Chip>
          }
        >
          <ChatSection 
            postId={post.id || post.postId} 
            roomId={post.roomId}
            selectedLineNumber={selectedLineNumber}
            onLineClick={setSelectedLineNumber}
          />
        </PostSection>
      )}
    </PostPageLayout>
  );
}
