import { getOpenPosts as mock } from "./../api/postApi.mock";
import { getOpenPosts as real } from "./../api/postApi";

const isMock = import.meta.env.VITE_USE_MOCK === "true";

export const getOpenPosts = isMock ? mock : real;