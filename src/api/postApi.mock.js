export const getOpenPosts = async (page, size) => {
  return {
    content: [
      {
        postId: 10,
        title: "이 코드 리뷰 부탁해요",
        description: "리팩토링 방향이 맞는지 봐주세요",
        language: "JAVA",
        status: "OPEN",
        authorId: 3,
        authorNickname: "backend_master",
        createdAt: "2026-01-14T15:30:12.123+09:00",
        updatedAt: "2026-01-18T09:30:00",
      },
      {
        postId: 9,
        title: "리액트 상태 관리 질문",
        description: "Context API와 Zustand 중 어떤 선택이 더 나을지 고민입니다.",
        language: "JAVASCRIPT",
        status: "OPEN",
        authorId: 1,
        authorNickname: "frontend_dev",
        createdAt: "2026-01-14T14:10:45.456+09:00",
        updatedAt: "2026-01-14T14:10:45.456+09:00",
      },
      {
        postId: 8,
        title: "Spring Security 설정 관련 문의",
        description: "JWT 기반 인증 설정 중 막히는 부분이 있습니다.",
        language: "JAVA",
        status: "COMPLETED",
        authorId: 3,
        authorNickname: "backend_master",
        createdAt: "2026-01-13T22:05:10.789+09:00",
        updatedAt: "2026-01-15T10:20:30.123+09:00",
      },
      {
        postId: 7,
        title: "비동기 처리 구조가 맞는지 봐주세요",
        description: "Promise 체이닝 구조가 올바른지 리뷰 요청드립니다.",
        language: "JAVASCRIPT",
        status: "OPEN",
        authorId: 2,
        authorNickname: "async_ninja",
        createdAt: "2026-01-13T18:42:33.111+09:00",
        updatedAt: "2026-01-13T18:42:33.111+09:00",
      },
      {
        postId: 6,
        title: "JPA 연관관계 설계 질문",
        description: "일대다 관계 매핑 시 주의할 점을 알고 싶습니다.",
        language: "JAVA",
        status: "OPEN",
        authorId: 4,
        authorNickname: "jpa_expert",
        createdAt: "2026-01-12T21:15:00.000+09:00",
        updatedAt: "2026-01-12T21:15:00.000+09:00",
      },
      {
        postId: 5,
        title: "TypeScript 타입 설계 고민",
        description: "유니온 타입과 제네릭 중 어떤 방식이 적합할까요?",
        language: "TYPESCRIPT",
        status: "OPEN",
        authorId: 5,
        authorNickname: "ts_lover",
        createdAt: "2026-01-12T16:55:48.222+09:00",
        updatedAt: "2026-01-12T16:55:48.222+09:00",
      },
      {
        postId: 4,
        title: "코드 에디터 성능 이슈",
        description: "대용량 코드 입력 시 렌더링이 느려집니다.",
        language: "JAVASCRIPT",
        status: "OPEN",
        authorId: 6,
        authorNickname: "performance_hunter",
        createdAt: "2026-01-11T20:30:19.333+09:00",
        updatedAt: "2026-01-11T20:30:19.333+09:00",
      },
      {
        postId: 3,
        title: "REST API 설계 피드백 요청",
        description: "RESTful한 엔드포인트 설계인지 검토 부탁드립니다.",
        language: "JAVA",
        status: "OPEN",
        authorId: 7,
        authorNickname: "api_architect",
        createdAt: "2026-01-11T13:12:59.444+09:00",
        updatedAt: "2026-01-11T13:12:59.444+09:00",
      },
      {
        postId: 2,
        title: "리스트 페이징 처리 질문",
        description: "무한 스크롤과 페이지네이션 중 어떤 방식이 좋을까요?",
        language: "JAVASCRIPT",
        status: "OPEN",
        authorId: 8,
        authorNickname: "ui_dev",
        createdAt: "2026-01-10T19:08:07.555+09:00",
        updatedAt: "2026-01-10T19:08:07.555+09:00",
      },
      {
        postId: 1,
        title: "초기 프로젝트 구조 리뷰 요청",
        description: "프론트엔드 프로젝트 구조에 대한 조언을 구합니다.",
        language: "JAVA",
        status: "OPEN",
        authorId: 9,
        authorNickname: "newbie_dev",
        createdAt: "2026-01-10T09:40:00.666+09:00",
        updatedAt: "2026-01-10T09:40:00.666+09:00",
      },
    ],
    page,
    size,
    totalElements: 10,
    totalPages: 1,
  };
};

// 목데이터를 메모리에 저장하여 수정 시 반영되도록 함
const mockPostData = {
    1: {
      postId: 1,
      authorId: 3,
      authorNickname: "backend_master",
      title: "이 코드 리뷰 부탁해요",
      description: "리팩토링 방향이 맞는지 봐주세요",
      language: "JAVA",
      status: "OPEN",
      codeText: "public class A {\n    private String name;\n    \n    public A(String name) {\n        this.name = name;\n    }\n    \n    public String getName() {\n        return name;\n    }\n}",
      createdAt: "2026-01-14T15:30:12.123+09:00",
      completedAt: null,
      roomId: 1,
    },
    9: {
      postId: 9,
      authorId: 1,
      authorNickname: "frontend_dev",
      title: "리액트 상태 관리 질문",
      description: "Context API와 Zustand 중 어떤 선택이 더 나을지 고민입니다.",
      language: "JAVASCRIPT",
      status: "OPEN",
      codeText: "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}",
      createdAt: "2026-01-14T14:10:45.456+09:00",
      completedAt: null,
      roomId: null,
    },
    8: {
      postId: 8,
      authorId: 3,
      authorNickname: "backend_master",
      title: "Spring Security 설정 관련 문의",
      description: "JWT 기반 인증 설정 중 막히는 부분이 있습니다.",
      language: "JAVA",
      status: "COMPLETED",
      codeText: "@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n    // Security configuration code here\n}",
      createdAt: "2026-01-13T22:05:10.789+09:00",
      completedAt: "2026-01-15T10:20:30.123+09:00",
      roomId: 1,
    },
  };

export const getPost = async (postId) => {
  // 개발용 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 해당 postId의 데이터가 있으면 반환, 없으면 기본값 반환
  return (
    mockPostData[postId] || {
      postId: postId,
      authorId: 1,
      authorNickname: "default_user",
      title: "기본 게시글",
      description: "기본 설명",
      language: "JAVASCRIPT",
      status: "OPEN",
      codeText: "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}",
      createdAt: new Date().toISOString(),
      completedAt: null,
      roomId: null,
    }
  );
};

export const createPost = async (requestBody) => {
  // 개발용 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // console.log("[Mock API] 포스트 생성 요청:", requestBody);

  // 성공 응답 반환
  return {
    postId: Math.floor(Math.random() * 1000) + 1,
    status: "OPEN",
    createdAt: new Date().toISOString(),
  };
};

export const completePost = async (postId) => {
  // 개발용 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 목데이터 업데이트 (다음 getPost 호출 시 완료 상태가 반영됨)
  if (mockPostData[postId]) {
    mockPostData[postId].status = "COMPLETED";
    mockPostData[postId].completedAt = new Date().toISOString();
  }

  // 성공 응답 반환
  return {
    postId: Number(postId),
    status: "COMPLETED",
    completedAt: new Date().toISOString(),
  };
};

export const updatePostCode = async (postId, requestBody) => {
  // 개발용 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 성공 응답 반환
  return {
    postId: Number(postId),
    codeText: requestBody.codeText || "",
    codeUpdatedAt: new Date().toISOString(),
  };
};