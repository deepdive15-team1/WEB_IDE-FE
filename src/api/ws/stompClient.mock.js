/**
 * 채팅방 참여 Mock
 */
export const joinChatRoom = async (roomId) => {
  console.log(`[Mock API] 채팅방 ${roomId} 참여 요청중...`);
  // 0.5초 딜레이 후 성공 리턴
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(`[Mock API] 채팅방 ${roomId} 참여 성공!`);
  return;
};

/**
 * 채팅 내역 조회 Mock
 */
export const getChatMessages = async (roomId) => {
  console.log(`[Mock API] 채팅방 ${roomId} 내역 조회중...`);
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // 더미 데이터 반환
  return [
    {
      roomId: roomId,
      senderName: "MockUser",
      message: "이전 대화 내역입니다.",
      codeLineNumbers: null,
      sendTime: new Date().toISOString(),
    }
  ];
};

export const createStompClient = ({ onConnect, onMessage, roomId }) => {
  console.log(`[Mock WS] 클라이언트 생성됨 (Room: ${roomId})`);

  // 가짜 클라이언트 객체 반환
  return {
    connected: false, // 연결 상태 추적

    // 연결 시뮬레이션
    activate() {
      this.connected = true;
      console.log("[Mock WS] 연결 시도 중...");
      
      // 0.5초 뒤 연결 성공 처리
      setTimeout(() => {
        console.log("[Mock WS] 연결 성공!");
        if (onConnect) onConnect();
      }, 0);
    },

    // 연결 종료 시뮬레이션
    deactivate() {
      this.connected = false;
      console.log("[Mock WS] 연결 종료됨");
    },

    // 메시지 전송 시뮬레이션
    publish({ destination, body }) {
      console.log(`[Mock WS] 전송 요청: ${destination}`, body);
      
      // JSON 파싱해서 내용 확인
      const parsedBody = JSON.parse(body);

      // 내가 보낸 메시지를 서버가 브로드캐스팅 해준 것처럼 즉시 수신 처리
      setTimeout(() => {
        onMessage(parsedBody); 
      }, 100); // 약간의 네트워크 지연 느낌

      // 2초 뒤에 가짜 상대방이 답장하는 시뮬레이션
      setTimeout(() => {
        const replyMsg = {
          roomId,
          senderName: "AI 봇",
          message: `"${parsedBody.message}"라고 말씀하셨군요! 확인했습니다.`,
          codeLineNumbers: null,
          sendTime: new Date().toISOString(),
        };
        onMessage(replyMsg);
      }, 2000);
    }
  };
};