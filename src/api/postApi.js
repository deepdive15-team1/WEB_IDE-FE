import { axiosInstance } from "./axiosInstance";

/**
 * 포스트 목록 조회 API
 * @param {number} page - 페이지 번호 (0부터 시작)
 * @param {number} size - 페이지당 항목 수
 * @returns {Promise<Object>} 포스트 목록 응답 데이터
 * @returns {Promise<Object>} response.content - 포스트 배열
 * @returns {Promise<Object>} response.content[].postId - 포스트 ID
 * @returns {Promise<Object>} response.content[].title - 게시글 제목
 * @returns {Promise<Object>} response.content[].description - 게시글 설명
 * @returns {Promise<Object>} response.content[].nickname - 작성자 닉네임
 * @returns {Promise<Object>} response.content[].language - 프로그래밍 언어 (예: "JAVA", "JAVASCRIPT", "PYTHON" 등)
 * @returns {Promise<Object>} response.content[].status - 포스트 상태 ("OPEN" | "COMPLETED")
 * @returns {Promise<Object>} response.content[].createdAt - 생성 일시 (ISO 8601 형식)
 * @returns {Promise<Object>} response.page - 현재 페이지 번호
 * @returns {Promise<Object>} response.size - 페이지 크기
 * @returns {Promise<Object>} response.totalElements - 전체 항목 수
 * @returns {Promise<Object>} response.totalPages - 전체 페이지 수
 */
export const getOpenPosts = async (page, size) => {
  const response = await axiosInstance.get(
    `/posts/open?page=${page}&size=${size}`
  );

  return response.data;
};

/**
 * 포스트 생성 API
 * @param {Object} requestBody - 포스트 생성 요청 데이터
 * @param {string} requestBody.title - 게시글 제목
 * @param {string} requestBody.description - 게시글 설명
 * @param {string} requestBody.language - 프로그래밍 언어 (예: "java", "javascript", "python" 등)
 * @param {string} requestBody.codeText - 코드 내용
 * @returns {Promise<Object>} 생성된 포스트 정보
 */
export const createPost = async (requestBody) => {
  const response = await axiosInstance.post("/posts", requestBody);

  return response.data;
};

/**
 * 내 게시글 목록 조회 API
 * GET /posts/my?page={page}&size={size}
 * * @param {number} page - 페이지 번호
 * @param {number} size - 페이지 크기
 * @returns {Promise<Object>} response.content - 게시글 목록
 * @returns {Promise<number>} response.content[].postId - 게시글 ID
 * @returns {Promise<string>} response.content[].title - 제목
 * @returns {Promise<string>} response.content[].description - 본문/설명
 * @returns {Promise<string>} response.content[].language - 프로그래밍 언어 (예: "JAVA", "JAVASCRIPT", "PYTHON" 등)
 * @returns {Promise<number>} response.content[].authorId - 작성자 ID
 * @returns {Promise<string>} response.content[].authorNickname - 작성자 닉네임
 * @returns {Promise<string>} response.content[].status - 상태 (OPEN/COMPLETED)
 * @returns {Promise<string>} response.content[].createdAt - 생성일
 * @returns {Promise<string>} response.content[].updatedAt - 수정일
 */

export const getMyPosts = async (page = 0, size = 20) => {
  const response = await axiosInstance.get(
    `/posts/my?page=${page}&size=${size}`
  );
  return response.data;
};

/**
 * 내 게시글 상세 조회 API
 * GET /posts/me/{postId}
 * @param {number} postId - 조회할 게시글 ID
 * @returns {Promise<Object>} 게시글 상세 정보
 * @returns {Promise<number>} response.postId - 게시글 ID
 * @returns {Promise<string>} response.title - 게시글 제목
 * @returns {Promise<number>} response.authorId - 작성자 ID
 * @returns {Promise<string>} response.authorNickname - 작성자 닉네임
 * @returns {Promise<string>} response.description - 게시글 설명
 * @returns {Promise<string>} response.language - 프로그래밍 언어
 * @returns {Promise<string>} response.status - 게시글 상태 ("OPEN" | "COMPLETED")
 * @returns {Promise<string>} response.codeText - 코드 내용
 * @returns {Promise<string>} response.createdAt - 생성 일시
 * @returns {Promise<string|null>} response.completedAt - 완료 일시 (없으면 null)
 * @returns {Promise<number|null>} response.roomId - 채팅방 ID (없으면 null)
 */
export const getMyPost = async (postId) => {
  const response = await axiosInstance.get(`/posts/me/${postId}`);
  return response.data;
};