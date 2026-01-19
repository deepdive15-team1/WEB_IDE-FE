const isMock = import.meta.env.VITE_USE_MOCK === "true";

// 포스트 상세 조회 API
import { getPost as mockGetPost } from "./../api/postApi.mock";
import { getPost as realGetPost } from "./../api/postApi";
export const getPost = isMock ? mockGetPost : realGetPost;

// 포스트 생성 API
import { createPost as mockCreatePost } from "./../api/postApi.mock";
import { createPost as realCreatePost } from "./../api/postApi";
export const createPost = isMock ? mockCreatePost : realCreatePost;

// 포스트 리뷰 완료 처리 API
import { completePost as mockCompletePost } from "./../api/postApi.mock";
import { completePost as realCompletePost } from "./../api/postApi";
export const completePost = isMock ? mockCompletePost : realCompletePost;

// 포스트 코드 수정 API
import { updatePostCode as mockUpdatePostCode } from "./../api/postApi.mock";
import { updatePostCode as realUpdatePostCode } from "./../api/postApi";
export const updatePostCode = isMock ? mockUpdatePostCode : realUpdatePostCode;

// 포스트 리스트 조회 API
import { getOpenPosts as mockGetPosts } from "./../api/postApi.mock";
import { getOpenPosts as realGetPosts } from "./../api/postApi";
export const getOpenPosts = isMock ? mockGetPosts : realGetPosts;

// 내 게시글 목록 조회 API (마이페이지 리스트)
import { getMyPosts as mockGetMyPosts } from "./../api/postApi.mock";
import { getMyPosts as realGetMyPosts } from "./../api/postApi";
export const getMyPosts = isMock ? mockGetMyPosts : realGetMyPosts;

// 내 게시글 상세 조회 API
import { getMyPost as mockGetMyPost } from "./../api/postApi.mock";
import { getMyPost as realGetMyPost } from "./../api/postApi";
export const getMyPost = isMock ? mockGetMyPost : realGetMyPost;