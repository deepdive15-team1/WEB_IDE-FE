const isMock = import.meta.env.VITE_USE_MOCK === "true";

// 채팅방 참여하기 API
import { joinChatRoom as mockJoinChatRoom } from "./chatApi.mock";
import { joinChatRoom as realJoinChatRoom } from "./chatApi";
export const joinChatRoom = isMock ? mockJoinChatRoom : realJoinChatRoom;

// 채팅 히스토리 불러오기 API
import { getChatMessages as mockGetChatMessages } from "./chatApi.mock";
import { getChatMessages as realGetChatMessages } from "./chatApi";
export const getChatMessages = isMock ? mockGetChatMessages : realGetChatMessages;
