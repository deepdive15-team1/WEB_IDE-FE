/**
 * 채팅방 참여하기 API (목데이터)
 * @param {number} roomId - 채팅방 ID
 * @returns {Promise<void>} 성공 시 204 No Content 응답 (응답 본문 없음)
 */
export const joinChatRoom = async (roomId) => {
  // 개발용 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 500));

  // console.log(`[Mock API] 채팅방 참여 성공 - roomId: ${roomId}`);

  // 204 No Content 응답이므로 응답 본문 없이 성공만 반환
  return;
};

/**
 * 채팅 히스토리 불러오기 API (목데이터)
 * @param {number} roomId - 채팅방 ID
 * @returns {Promise<Array>} 채팅 메시지 배열
 * @returns {Promise<Array>} response[].roomId - 채팅방 ID
 * @returns {Promise<Array>} response[].senderName - 발신자 이름
 * @returns {Promise<Array>} response[].message - 메시지 내용
 * @returns {Promise<Array>} response[].sendTime - 전송 시간 (ISO 8601 형식)
 * @returns {Promise<Array>} response[].codeLineNumbers - 코드 줄 번호 (선택적)
 */
export const getChatMessages = async (roomId) => {
  // 개발용 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 목데이터: roomId에 따라 다른 메시지 반환
  const mockMessages = {
    1: [
      {
        roomId: 1,
        senderName: "백엔드마스터",
        message: "전체적으로 잘 작성하셨네요! 다만 몇 가지 개선할 점이 있습니다.",
        sendTime: "2025-07-17T20:00:00",
      },
      {
        roomId: 1,
        senderName: "백엔드",
        message: "여기서 이전 상태값을 사용하는 것보다 함수형 업데이트를 사용하는 것이 좋습니다. setCount(prevCount => prevCount + 1) 이렇게요!",
        sendTime: "2025-07-17T20:02:00",
        codeLineNumbers: 4,
      },
      {
        roomId: 1,
        senderName: "코드리뷰어",
        message: "맞습니다! 특히 여러 번 연속으로 업데이트가 일어날 때 함수형 업데이트가 안전합니다.",
        sendTime: "2025-07-17T20:15:00",
        codeLineNumbers: 5,
      },
      {
        roomId: 1,
        senderName: "프론트엔드개발자",
        message: "오! 그런 방법이 있었군요. 감사합니다! 수정해보겠습니다.",
        sendTime: "2025-07-17T20:20:00",
      },
    ],
  };

  const messages = mockMessages[roomId] || [];
  console.log(`[Mock API] 채팅 히스토리 조회 성공 - roomId: ${roomId}, 메시지 수: ${messages.length}`);

  return messages;
};
