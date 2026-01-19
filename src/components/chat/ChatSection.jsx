import { useState, useEffect } from "react";
import styled from "styled-components";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import { getChatMessages } from "../../api/chat/chatApi.index";

export default function ChatSection({ postId, roomId, selectedLineNumber: externalSelectedLine, onLineClick }) {
  const [messages, setMessages] = useState([]);
  const [selectedLineNumber, setSelectedLineNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  // 외부에서 전달된 selectedLineNumber와 동기화
  useEffect(() => {
    if (externalSelectedLine !== undefined) {
      setSelectedLineNumber(externalSelectedLine);
    }
  }, [externalSelectedLine]);

  // 채팅 히스토리 불러오기
  useEffect(() => {
    const loadChatHistory = async () => {
      // console.log("[ChatSection] roomId:", roomId);
      
      // roomId가 없으면 채팅 히스토리를 불러오지 않음
      if (!roomId) {
        // console.log("[ChatSection] roomId가 없어서 채팅 히스토리를 불러오지 않습니다.");
        setMessages([]);
        return;
      }

      try {
        setLoading(true);
        const chatMessages = await getChatMessages(roomId);
        // console.log("[ChatSection] 채팅 히스토리 조회 성공:", chatMessages);
        
        // API 응답에는 lineNumber가 없을 수 있으므로 null로 설정
        const formattedMessages = chatMessages.map((msg) => ({
          ...msg,
          lineNumber: msg.lineNumber || null,
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error("[ChatSection] 채팅 히스토리 조회 실패:", error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    loadChatHistory();
  }, [roomId]);

  const handleSendMessage = (messageText, lineNumber) => {
    const newMessage = {
      roomId: roomId || 1,
      senderName: "현재 사용자", // 실제로는 로그인한 사용자 정보 사용
      message: messageText,
      lineNumber: lineNumber || selectedLineNumber,
      sendTime: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setSelectedLineNumber(null);
    // 부모 컴포넌트에도 알림
    if (onLineClick) {
      onLineClick(null);
    }
  };

  const handleClearSelectedLine = () => {
    setSelectedLineNumber(null);
    // 부모 컴포넌트에도 알림
    if (onLineClick) {
      onLineClick(null);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingMessage>채팅을 불러오는 중...</LoadingMessage>
      </Container>
    );
  }

  return (
    <Container>
      <ChatMessageList messages={messages} />
      <ChatInput 
        onSend={handleSendMessage} 
        selectedLineNumber={selectedLineNumber}
        onClearSelectedLine={handleClearSelectedLine}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background-color: var(--color-bg);
  border-radius: 8px;
  overflow: hidden;
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-gray-600);
  font-size: 14px;
`;
