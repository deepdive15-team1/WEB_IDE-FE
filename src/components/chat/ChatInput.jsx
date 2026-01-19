import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Chip from "../common/Chip/Chip";
import { Button } from "../common/Button/Button";

import sendIcon from "../../assets/send.svg";

export default function ChatInput({
  onSend,
  selectedLineNumber = null,
  onClearSelectedLine,
}) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  // Textarea 높이 자동 조절 (최대 3줄)
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // 초기 높이로 리셋
    textarea.style.height = "auto";
    
    // 스크롤 높이 계산
    const scrollHeight = textarea.scrollHeight;
    const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 21;
    const paddingTop = parseFloat(getComputedStyle(textarea).paddingTop) || 10;
    const paddingBottom = parseFloat(getComputedStyle(textarea).paddingBottom) || 10;
    const maxHeight = lineHeight * 3 + paddingTop + paddingBottom; // 최대 3줄 + 패딩
    
    // 최대 높이 제한
    if (scrollHeight <= maxHeight) {
      textarea.style.height = `${scrollHeight}px`;
    } else {
      textarea.style.height = `${maxHeight}px`;
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // message 변경 시 높이 조절
  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!message.trim()) return;

    onSend(message.trim(), selectedLineNumber);
    setMessage("");
    if (onClearSelectedLine) {
      onClearSelectedLine();
    }
    
    // Textarea 높이 리셋
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      }, 0);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const handleKeyDown = (e) => {
    // Enter만 누르면 전송
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Container>
      {selectedLineNumber && (
        <LineChipContainer>
          <Chip variant="tagging">#{selectedLineNumber}번 줄</Chip>
          {onClearSelectedLine && (
            <ClearButton onClick={onClearSelectedLine}>×</ClearButton>
          )}
        </LineChipContainer>
      )}
      <Form onSubmit={handleFormSubmit}>
        <ChatTextarea
          ref={textareaRef}
          placeholder="메시지를 입력하세요..."
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <Button 
          type="submit" 
          disabled={!message.trim()} 
          endIcon={sendIcon} 
          size="lg" 
          iconOnly 
        />
      </Form>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 10px;
  border-top: 1px solid var(--color-gray-200);
  background-color: var(--color-bg);
  display: flex;
  flex-direction: column;
  gap: 8px;
  // border: 2px solid red;
`;

const LineChipContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: var(--color-gray-600);
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &:hover {
    color: var(--color-text);
  }
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
`;

const ChatTextarea = styled.textarea`
  flex: 1;
  padding: 10px 14px;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  background-color: var(--color-gray-50);
  color: var(--color-text);
  border-radius: 8px;
  resize: none;
  overflow-y: auto;
  min-height: 44px;
  box-sizing: border-box;
  height: auto;
  max-height: none;
  
  &::placeholder {
    color: var(--color-gray-600);
  }

  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-gray-300);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-gray-400);
  }
`;

