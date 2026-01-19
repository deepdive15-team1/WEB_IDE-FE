import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import { getChatMessages, joinChatRoom } from "../../api/chat/chatApi.index";
import { createStompClient } from "../../api/ws/stompClient.index";
import { useAuthStore } from "../../stores/useAuthStore";

export default function ChatSection({ postId, roomId, selectedLineNumber: externalSelectedLine, onLineClick }) {
  const [messages, setMessages] = useState([]);
  const [selectedLineNumber, setSelectedLineNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  // 소켓 연결 상태를 관리하는 State
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const user = useAuthStore((state) => state.user);

  // STOMP 클라이언트 참조 유지 (리렌더링 시 재연결 방지)
  const stompClientRef = useRef(null);

  // 외부에서 전달된 selectedLineNumber와 동기화
  useEffect(() => {
    if (externalSelectedLine !== undefined) {
      setSelectedLineNumber(externalSelectedLine);
    }
  }, [externalSelectedLine]);

  // 초기 데이터 로드 및 웹소켓 연결
  useEffect(() => {
    if (!roomId) {
      // console.log("[ChatSection] roomId가 없어서 채팅 히스토리를 불러오지 않습니다.");
      setMessages([]);
      return;
    }

    let client = null;

    const initChatSystem = async () => {
      try {
        setLoading(true);
        setIsSocketConnected(false);

        //채팅방 참여하기
        await joinChatRoom(roomId);
        // console.log(`[ChatSection] 채팅방 ${roomId} 참여 완료`);

        //채팅 히스토리 불러오기
        const chatMessages = await getChatMessages(roomId);
        // console.log("[ChatSection] 채팅 히스토리 조회 성공:", chatMessages);

        // API 응답에는 lineNumber가 없을 수 있으므로 null로 설정
        const formattedMessages = chatMessages.map((msg) => ({
          ...msg,
          lineNumber: msg.lineNumber || null,
        }));
        setMessages(formattedMessages);

        // 웹소켓 연결 및 구독 - 참여와 조회가 모두 성공해야 소켓 연결
        client = createStompClient({
          roomId: roomId,
          onConnect: () => {
            console.log(`[ChatSection] 채팅방 ${roomId} 연결 성공`);
            setIsSocketConnected(true);
          },
          onMessage: (newMessage) => {
            // 수신된 메시지를 상태에 추가
            // API 명세의 필드명(codeLineNumbers)을 UI용(lineNumber)으로 변환
            const formattedMessage = {
              ...newMessage,
              lineNumber: newMessage.codeLineNumbers || null,
            };

            setMessages((prev) => [...prev, formattedMessage]);
          },
        });

        client.activate(); // 연결 시작
        stompClientRef.current = client;
      } catch (error) {
        console.error("[ChatSection] 채팅 초기화 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    initChatSystem();

    // cleanup: 컴포넌트 언마운트 시 연결 종료
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        console.log("[ChatSection] 채팅방 연결 종료");
      }
      setIsSocketConnected(false);
    };
  }, [roomId]);

  const handleSendMessage = (messageText, lineNumber) => {
    if (!isSocketConnected) {
      alert("채팅 서버와 연결되어 있지 않습니다.");
      return;
    }

    //로그인 체크
    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    const newMessage = {
      roomId: roomId || 1,
      senderName: user.nickname || "현재 사용자", // 실제로는 로그인한 사용자 정보 사용
      message: messageText,
      lineNumber: lineNumber || selectedLineNumber,
      sendTime: new Date().toISOString(),
    };

    try {
      stompClientRef.current.publish({
        destination: `/publish/rooms/${roomId}`,
        body: JSON.stringify(newMessage),
      });

      // 입력창 상태 초기화
      setSelectedLineNumber(null);
      if (onLineClick) {
        onLineClick(null);
      }
    } catch (err) {
      console.error("메시지 전송 실패:", err);
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
      <ChatInput onSend={handleSendMessage} selectedLineNumber={selectedLineNumber} onClearSelectedLine={handleClearSelectedLine} disabled={!isSocketConnected}/>
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
