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
 * @returns {Promise<Object>} response.content[].language - 프로그래밍 언어 (예: "JAVA", "JAVASCRIPT", "PYTHON" 등)
 * @returns {Promise<Object>} response.content[].status - 포스트 상태 ("OPEN" | "COMPLETED")
 * @returns {Promise<Object>} response.content[].authorId - 작성자 ID
 * @returns {Promise<Object>} response.content[].authorNickname - 작성자 닉네임
 * @returns {Promise<Object>} response.content[].createdAt - 생성 일시 (ISO 8601 형식)
 * @returns {Promise<Object>} response.content[].updatedAt - 수정 일시 (ISO 8601 형식)
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
