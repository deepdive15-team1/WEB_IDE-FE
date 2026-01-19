import { Client } from "@stomp/stompjs";

// HTTP URL에서 WS URL로 변환 (http -> ws, https -> wss)
const getWebSocketUrl = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // 1. https:// 로 시작하면 wss:// 로 변경
  if (baseUrl.startsWith("https")) {
    return `${baseUrl.replace("https", "wss")}/ws-stomp`;
  } 
  // 2. http:// 로 시작하면 ws:// 로 변경
  else {
    return `${baseUrl.replace("http", "ws")}/ws-stomp`;
  }
};

/**
 * STOMP 클라이언트 생성 및 설정
 * @param {object} options
 * @param {function} options.onConnect - 연결 성공 시 콜백
 * @param {function} options.onMessage - 메시지 수신 시 콜백
 * @param {string} options.roomId - 구독할 채팅방 ID
 * @returns {Client} 설정된 STOMP 클라이언트 인스턴스
 */

export const createStompClient = ({ onConnect, onMessage, roomId }) => {
  const accessToken = localStorage.getItem("accessToken");

  const client = new Client({
    brokerURL: getWebSocketUrl(),
    
    // 연결 헤더 설정
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },

    // 연결 재시도 딜레이 (ms)
    reconnectDelay: 5000, 
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
  });

  client.onConnect = () => {
    
    // 연결 성공 후 구독 (Subscribe)
    client.subscribe(`/subscribe/rooms/${roomId}`, (message) => {
      if (message.body) {
        const parsedMessage = JSON.parse(message.body);
        onMessage(parsedMessage);
      }
    });

    if (onConnect) onConnect();
  };

  client.onStompError = (frame) => {
    console.error("[STOMP] Broker error: " + frame.headers["message"]);
    console.error("[STOMP] Details: " + frame.body);
  };

  return client;
};