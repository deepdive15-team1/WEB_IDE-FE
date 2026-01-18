import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../common/Button/Button";
import usePostCreateStore from "../../stores/postCreateStore";
import { updatePostCode } from "../../api/postApi.index";

import styled from "styled-components";
import backIcon from "../../assets/back.svg";
import checkIcon from "../../assets/check.svg";

export default function PostEditHeaderContent({ postId }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    // getState()로 최신 상태 가져오기 (리렌더링 없음)
    const state = usePostCreateStore.getState();
    let { codeText } = state;

    // PostCodeEditor에서 최신 값을 가져오기 (debounce로 인해 스토어에 저장되지 않았을 수 있음)
    const latestCodeText = state.getLatestCodeText();
    if (latestCodeText !== codeText) {
      state.setCodeTextImmediate(latestCodeText);
      codeText = latestCodeText;
    }

    // 유효성 검사
    if (!codeText.trim()) {
      alert("코드를 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 코드 수정 API 호출
      await updatePostCode(postId, { codeText });
      
      // 성공 시 상세 페이지로 이동
      navigate(`/post-detail/${postId}`);
    } catch (error) {
      alert("코드 수정에 실패했습니다. 다시 시도해주세요.");
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
          <Title>코드 수정</Title>
          <Descript>코드를 수정하세요.</Descript>
        </Content>

        <Button 
          variant="primary" 
          size="md" 
          startIcon={checkIcon}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "수정 중..." : "수정 완료"}
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
