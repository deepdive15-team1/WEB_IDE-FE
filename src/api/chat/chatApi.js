import { axiosInstance } from "../axiosInstance";

/**
 * 채팅방 참여하기 API
 * @param {number} roomId - 채팅방 ID
 * @returns {Promise<void>} 성공 시 204 No Content 응답 (응답 본문 없음)
 */
export const joinChatRoom = async (roomId) => {
  await axiosInstance.post(`/chat/rooms/${roomId}/participants`);
  console.log(`[API] 채팅방 참여 성공 - roomId: ${roomId}`);
  // 204 No Content 응답이므로 응답 본문이 없음
};

/**
 * 채팅 히스토리 불러오기 API
 * @param {number} roomId - 채팅방 ID
 * @returns {Promise<Array>} 채팅 메시지 배열
 * @returns {Promise<Array>} response[].roomId - 채팅방 ID
 * @returns {Promise<Array>} response[].senderName - 발신자 이름
 * @returns {Promise<Array>} response[].message - 메시지 내용
 * @returns {Promise<Array>} response[].sendTime - 전송 시간 (ISO 8601 형식)
 */
export const getChatMessages = async (roomId) => {
  const response = await axiosInstance.get(`/chat/rooms/${roomId}/messages`);
  // console.log(`[API] 채팅 히스토리 조회 성공 - roomId: ${roomId}, 메시지 수: ${response.data.length}`);
  return response.data;
};
