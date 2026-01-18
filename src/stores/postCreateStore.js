import { create } from "zustand";
import { persist } from "zustand/middleware";
// 자주 변경되는 codeText의 경우 debounce 적용
// loadash 사용하거나 아래 처럼 debounce 함수를 직접 구현
// import {debounce} from "loadash";

// debounce 함수(lodash 없이 구현)
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

// create()로 store 생성
const usePostCreateStore = create(
  persist(
    (set, get) => ({
      // 상태 정의
      title: "",
      description: "",
      language: "javascript",
      codeText: "",

      // 상태 변경하는 함수 정의
      // 제목, 설명, 언어는 즉시 반영
      // 코드는 내부적으로 debounce 처리
      setTitle: (title) => {
        console.log("📝 [Store] title 변경:", title);
        set({ title });
      },
      setDescription: (description) => {
        console.log("📝 [Store] description 변경:", description);
        set({ description });
      },
      setLanguage: (language) => {
        console.log("📝 [Store] language 변경:", language);
        set({ language });
      },

      setCodeTextDebounced: debounce((codeText) => {
        console.log("💻 [Store] codeText 변경 (debounced):", codeText.substring(0, 50) + (codeText.length > 50 ? "..." : ""));
        set({ codeText });
      }, 3000),

      // 모든 상태를 한 번에 초기화하는 함수
      reset: () => {
        console.log("🔄 [Store] 모든 상태 초기화");
        set({
          title: "",
          description: "",
          language: "javascript",
          codeText: "",
        });
      },
    }),
    {
        name: "post-create-store", // localStorage 키 이름
        // persist할 필드 선택
        partialize: (state) => ({
            title: state.title,
            description: state.description,
            language: state.language,
            codeText: state.codeText,
        }),
    }
  )
);

export default usePostCreateStore;
