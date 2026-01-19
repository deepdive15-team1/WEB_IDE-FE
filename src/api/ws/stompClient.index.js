import * as RealClient from "./stompClient";
import * as MockClient from "./stompClient.mock";

const isMock = import.meta.env.VITE_USE_MOCK === "true";

export const createStompClient = isMock ? MockClient.createStompClient : RealClient.createStompClient;