import { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import usePostCreateStore from "../../stores/postCreateStore";

// 전역 변수로 최신 에디터 값 저장 (debounce로 인해 스토어에 저장되지 않을 수 있음)
let latestCodeText = "";

// 전역 함수로 최신 값 가져오기
if (typeof window !== "undefined") {
  window.getLatestCodeTextFromEditor = () => latestCodeText;
}

export default function PostCodeEditor({ language, codeText: codeTextProp, readOnly, onLineClick }) {
  // readOnly를 boolean으로 변환 (문자열 "true"도 처리)
  const isReadOnly = readOnly === true || readOnly === "true";
  const editorRef = useRef(null);

  // codeText prop이 있으면 사용, 없으면 스토어에서 구독 (PostCreate 리렌더링 방지)
  const codeTextFromStore = usePostCreateStore((state) => state.codeText);
  const setCodeTextDebounced = usePostCreateStore((state) => state.setCodeTextDebounced);
  
  const codeText = codeTextProp ?? codeTextFromStore;

  // codeText가 변경되면 최신 값 업데이트 (PostCreate에서만)
  useEffect(() => {
    if (!codeTextProp) {
      latestCodeText = codeText;
    }
  }, [codeText, codeTextProp]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    defineCustomTheme(monaco);
    
    // 편집 모드일 때 초기 코드 값 설정 (스토어에서 가져온 값)
    if (!isReadOnly && !codeTextProp && codeTextFromStore) {
      editor.setValue(codeTextFromStore);
      latestCodeText = codeTextFromStore;
    }
    
    // 줄 클릭 이벤트 처리 (읽기 전용일 때만)
    if (onLineClick) {
      editor.onMouseDown((e) => {
        const target = e.target;
        if (target && target.type === monaco.editor.MouseTargetType.GUTTER_LINE_NUMBERS) {
          const position = editor.getPosition();
          if (position) {
            const lineNumber = position.lineNumber;
            onLineClick(lineNumber);
          }
        }
      });
    }
  };
  
  // readOnly prop이 변경될 때 에디터 옵션 업데이트
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({
        readOnly: isReadOnly,
        domReadOnly: isReadOnly,
      });
      
      // 읽기 전용일 때 키보드 입력 차단
      if (isReadOnly) {
        const keyDownHandler = (e) => {
          e.preventDefault();
          e.stopPropagation();
        };
        editorRef.current.onKeyDown(keyDownHandler);
        
        return () => {
          // 클린업은 Monaco Editor가 자동으로 처리
        };
      }
    }
  }, [isReadOnly]);
  
  // 편집 모드일 때 스토어의 코드 값이 변경되면 에디터에 반영
  useEffect(() => {
    if (!isReadOnly && !codeTextProp && editorRef.current && codeTextFromStore) {
      const currentValue = editorRef.current.getValue();
      if (currentValue !== codeTextFromStore) {
        editorRef.current.setValue(codeTextFromStore);
        latestCodeText = codeTextFromStore;
      }
    }
  }, [codeTextFromStore, isReadOnly, codeTextProp]);

  return (
    <EditorWrapper>
      <Editor
        height="100%"
        width="100%"
        language={language}
        value={codeText}
        theme="custom-light"
        onMount={handleEditorDidMount}
        onChange={(value) => {
          const codeValue = value || "";
          // 읽기 전용이 아니고 codeText prop이 없을 때만 저장 (PostCreate에서만)
          if (!isReadOnly && !codeTextProp) {
            // 최신 값을 전역 변수에 저장 (debounce로 인해 스토어에 저장되지 않을 수 있음)
            latestCodeText = codeValue;
            setCodeTextDebounced(codeValue);
          }
        }}
        options={{
          wordWrap: "off", // 자동 줄 바꿈 비활성화
          scrollBeyondLastLine: true, // 마지막 줄 이후로 스크롤 가능
          scrollBeyondLastColumn: 10, // 수평 스크롤 여유 공간 설정
          automaticLayout: true, // 에디터 컨테이너 크기 변경 시 자동 조정
          minimap: {
            enabled: false, // 미니맵 활성화 여부
          },
          fontSize: 14, // 글꼴 크기
          lineNumbers: "on", // 줄 번호 표시
          readOnly: isReadOnly, // 읽기 전용
          domReadOnly: isReadOnly, // DOM에서도 읽기 전용
          tabSize: 4, // 탭 크기 설정
          insertSpaces: true, // 탭 입력 시 공백으로 처리
          cursorStyle: "line", // 커서 스타일
          mouseWheelZoom: true, // Ctrl+마우스 휠로 폰트 크기 확대/축소
        }}
      />
    </EditorWrapper>
  );
}

// CSS 변수 값 가져오기 헬퍼
const getCSSVar = (varName) => 
  getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

// 모나코 에디터 커스텀 테마 정의 함수
const defineCustomTheme = (monaco) => {
  monaco.editor.defineTheme("custom-light", {
    base: "vs",
    inherit: true,
    rules: [
      // { token: "comment", foreground: getCSSVar("--color-gray-600").replace("#", ""), fontStyle: "italic" },
      // { token: "keyword", foreground: getCSSVar("--color-main").replace("#", ""), fontStyle: "bold" },
      // { token: "string", foreground: getCSSVar("--color-completed-text").replace("#", "") },
      // { token: "number", foreground: getCSSVar("--color-accent").replace("#", "") },
      // { token: "type", foreground: getCSSVar("--color-main").replace("#", "") },
      // { token: "function", foreground: getCSSVar("--color-text").replace("#", "") },
      // { token: "variable", foreground: getCSSVar("--color-text").replace("#", "") },
    ],
    colors: {
      "editor.background": getCSSVar("--color-gray-50"),
      "editor.foreground": getCSSVar("--color-text"),
      "editor.lineHighlightBackground": getCSSVar("--color-accent-light"),
      "editor.selectionBackground": getCSSVar("--color-gray-200"),
      "editor.lineNumber.foreground": getCSSVar("--color-gray-600"),
      "editorIndentGuide.background": getCSSVar("--color-gray-200"),
      "editorIndentGuide.activeBackground": getCSSVar("--color-gray-600"),
      "editorCursor.foreground": getCSSVar("--color-main"),
      "editorWhitespace.foreground": getCSSVar("--color-gray-200"),
      "editorWidget.background": getCSSVar("--color-white"),
      "editorWidget.border": getCSSVar("--color-gray-200"),
      "editorSuggestWidget.background": getCSSVar("--color-white"),
      "editorSuggestWidget.border": getCSSVar("--color-gray-200"),
      "editorSuggestWidget.selectedBackground": getCSSVar("--color-main"),
      "scrollbarSlider.background": getCSSVar("--color-gray-600"),
      "scrollbarSlider.hoverBackground": getCSSVar("--color-gray-600"),
      "scrollbarSlider.activeBackground": getCSSVar("--color-gray-600"),
    },
  });

  // 테마 설정
  monaco.editor.setTheme("custom-light");
};

const EditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

