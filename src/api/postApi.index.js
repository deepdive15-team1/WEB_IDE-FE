const isMock = import.meta.env.VITE_USE_MOCK === "true";

// 포스트 상세 조회 API
import { getPost as mockGetPost } from "./../api/postApi.mock";
import { getPost as realGetPost } from "./../api/postApi";
export const getPost = isMock ? mockGetPost : realGetPost;

// 포스트 생성 API
import { createPost as mockCreatePost } from "./../api/postApi.mock";
import { createPost as realCreatePost } from "./../api/postApi";
export const createPost = isMock ? mockCreatePost : realCreatePost;

// 포스트 리스트 조회 API
import { getOpenPosts as mockGetPosts } from "./../api/postApi.mock";
import { getOpenPosts as realGetPosts } from "./../api/postApi";
export const getOpenPosts = isMock ? mockGetPosts : realGetPosts;