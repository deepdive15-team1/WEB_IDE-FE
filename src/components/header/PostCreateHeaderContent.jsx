import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../common/Button/Button";
import usePostCreateStore from "../../stores/postCreateStore";
import { createPost } from "../../api/postApi.index";

import styled from "styled-components";
import backIcon from "../../assets/back.svg";
import storeIcon from "../../assets/store.svg";

export default function PostCreateHeaderContent() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // getState()를 사용하여 리렌더링 없이 최신 상태 가져오기
  // 버튼 클릭 시에만 호출되므로 성능 최적화
  const handleSubmit = async () => {
    // getState()로 최신 상태 가져오기 (리렌더링 없음)
    const state = usePostCreateStore.getState();
    let { title, description, language, codeText } = state;

    // PostCodeEditor에서 최신 값을 가져오기 (debounce로 인해 스토어에 저장되지 않았을 수 있음)
    const latestCodeText = state.getLatestCodeText();
    if (latestCodeText !== codeText) {
      // console.log("⚠️ [PostCreateHeader] 에디터 값과 스토어 값이 다름, 즉시 저장");
      state.setCodeTextImmediate(latestCodeText);
      codeText = latestCodeText;
    }

    // console.log("📋 [PostCreateHeader] 현재 상태:", {
    //   title,
    //   description,
    //   language,
    //   codeTextLength: codeText.length,
    // });

    // 유효성 검사
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!codeText.trim()) {
      alert("코드를 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      // console.log("📤 [PostCreateHeader] createPost API 호출:", {
      //   title,
      //   description,
      //   language,
      //   codeTextLength: codeText.length,
      // });

      const response = await createPost({
        title,
        description,
        language,
        codeText,
      });

      // 성공 시 스토어 초기화 및 페이지 이동
      usePostCreateStore.getState().reset();
      navigate(`/post-detail/${response.postId}`);
    } catch (error) {
      alert("게시글 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <BackIcon onClick={handleBack}>
        <img src={backIcon} alt="뒤로 가기" />
      </BackIcon>

      <Wrapper>
        <Content>
          <Title>새 게시글 작성</Title>
          <Descript>코드 리뷰를 받고 싶은 코드를 공유하세요.</Descript>
        </Content>

        <Button 
          variant="primary" 
          size="md" 
          startIcon={storeIcon}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "생성 중..." : "게시글 생성"}
        </Button>
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
  margin: 16px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
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
`;
const Descript = styled.div`
  color: var(--color-gray-600);
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
