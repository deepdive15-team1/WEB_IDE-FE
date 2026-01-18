export const getOpenPosts = async (page, size) => {
  return {
    content: [
      {
        postId: 10,
        title: "이 코드 리뷰 부탁해요",
        description: "서비스 로직 전반에 대해 코드 리뷰를 받고 싶습니다.",
        nickname: "deepdive15",
        language: "JAVA",
        status: "COMPLETED",
        createdAt: "2026-01-14T15:30:12.123+09:00",
      },
      {
        postId: 9,
        title: "리액트 상태 관리 질문",
        description: "Context API와 Zustand 중 어떤 선택이 더 나을지 고민입니다.",
        nickname: "frontend_dev",
        language: "JAVASCRIPT",
        status: "OPEN",
        createdAt: "2026-01-14T14:10:45.456+09:00",
      },
      {
        postId: 8,
        title: "Spring Security 설정 관련 문의",
        description: "JWT 기반 인증 설정 중 막히는 부분이 있습니다.",
        nickname: "backend_master",
        language: "JAVA",
        status: "COMPLETED",
        createdAt: "2026-01-13T22:05:10.789+09:00",
      },
      {
        postId: 7,
        title: "비동기 처리 구조가 맞는지 봐주세요",
        description: "Promise 체이닝 구조가 올바른지 리뷰 요청드립니다.",
        nickname: "async_ninja",
        language: "JAVASCRIPT",
        status: "OPEN",
        createdAt: "2026-01-13T18:42:33.111+09:00",
      },
      {
        postId: 6,
        title: "JPA 연관관계 설계 질문",
        description: "일대다 관계 매핑 시 주의할 점을 알고 싶습니다.",
        nickname: "jpa_expert",
        language: "JAVA",
        status: "OPEN",
        createdAt: "2026-01-12T21:15:00.000+09:00",
      },
      {
        postId: 5,
        title: "TypeScript 타입 설계 고민",
        description: "유니온 타입과 제네릭 중 어떤 방식이 적합할까요?",
        nickname: "ts_lover",
        language: "TYPESCRIPT",
        status: "OPEN",
        createdAt: "2026-01-12T16:55:48.222+09:00",
      },
      {
        postId: 4,
        title: "코드 에디터 성능 이슈",
        description: "대용량 코드 입력 시 렌더링이 느려집니다.",
        nickname: "performance_hunter",
        language: "JAVASCRIPT",
        status: "OPEN",
        createdAt: "2026-01-11T20:30:19.333+09:00",
      },
      {
        postId: 3,
        title: "REST API 설계 피드백 요청",
        description: "RESTful한 엔드포인트 설계인지 검토 부탁드립니다.",
        nickname: "api_architect",
        language: "JAVA",
        status: "OPEN",
        createdAt: "2026-01-11T13:12:59.444+09:00",
      },
      {
        postId: 2,
        title: "리스트 페이징 처리 질문",
        description: "무한 스크롤과 페이지네이션 중 어떤 방식이 좋을까요?",
        nickname: "ui_dev",
        language: "JAVASCRIPT",
        status: "OPEN",
        createdAt: "2026-01-10T19:08:07.555+09:00",
      },
      {
        postId: 1,
        title: "초기 프로젝트 구조 리뷰 요청",
        description: "프론트엔드 프로젝트 구조에 대한 조언을 구합니다.",
        nickname: "newbie_dev",
        language: "JAVA",
        status: "OPEN",
        createdAt: "2026-01-10T09:40:00.666+09:00",
      },
    ],
    page,
    size,
    totalElements: 10,
    totalPages: 1,
  };
};

// postApi.mock.js에 추가할 코드
export const createPost = async (requestBody) => {
  // 개발용 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  console.log("[Mock API] 포스트 생성 요청:", requestBody);
  
  // 성공 응답 반환
  return {
    postId: Math.floor(Math.random() * 1000) + 1,
    status: "OPEN",
    createdAt: new Date().toISOString(),
  };
};