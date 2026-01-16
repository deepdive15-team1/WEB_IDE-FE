import Editor from "@monaco-editor/react";
import styled from "styled-components";

export default function PostCodeEditor() {
  const handleEditorDidMount = (editor, monaco) => {
    // CSS 변수 값 가져오기
    const root = document.documentElement;
    const getCSSVariable = (varName) => {
      return getComputedStyle(root).getPropertyValue(varName).trim();
    };

    const colorGray50 = getCSSVariable("--color-gray-50");
    const colorGray200 = getCSSVariable("--color-gray-200");
    const colorGray600 = getCSSVariable("--color-gray-600");
    const colorText = getCSSVariable("--color-text");
    const colorMain = getCSSVariable("--color-main");
    const colorWhite = getCSSVariable("--color-white");
    const colorCompletedText = getCSSVariable("--color-completed-text");
    const colorAccent = getCSSVariable("--color-accent");

    // 색상에 투명도 추가하는 헬퍼 함수
    const addOpacity = (color, opacity) => {
      // RGB 색상을 rgba로 변환
      if (color.startsWith("#")) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      return color;
    };

    // 커스텀 테마 정의
    monaco.editor.defineTheme("custom-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: colorGray600.replace("#", ""), fontStyle: "italic" },
        { token: "keyword", foreground: colorMain.replace("#", ""), fontStyle: "bold" },
        { token: "string", foreground: colorCompletedText.replace("#", "") },
        { token: "number", foreground: colorAccent.replace("#", "") },
        { token: "type", foreground: colorMain.replace("#", "") },
        { token: "function", foreground: colorText.replace("#", "") },
        { token: "variable", foreground: colorText.replace("#", "") },
      ],
      colors: {
        "editor.background": colorGray50,
        "editor.foreground": colorText,
        "editor.lineHighlightBackground": colorGray200,
        "editor.selectionBackground": addOpacity(colorMain, 0.2),
        "editor.lineNumber.foreground": colorGray600,
        "editorIndentGuide.background": colorGray200,
        "editorIndentGuide.activeBackground": colorGray600,
        "editorCursor.foreground": colorMain,
        "editorWhitespace.foreground": colorGray200,
        "editorWidget.background": colorWhite,
        "editorWidget.border": colorGray200,
        "editorSuggestWidget.background": colorWhite,
        "editorSuggestWidget.border": colorGray200,
        "editorSuggestWidget.selectedBackground": colorGray50,
        "scrollbarSlider.background": addOpacity(colorGray600, 0.25),
        "scrollbarSlider.hoverBackground": addOpacity(colorGray600, 0.4),
        "scrollbarSlider.activeBackground": addOpacity(colorGray600, 0.5),
      },
    });

    // 테마 설정
    monaco.editor.setTheme("custom-light");
  };

  return (
    <EditorWrapper>
      <Editor
        height="100%"
        width="100%"
        language="javascript"
        value="hello"
        theme="custom-light"
        onMount={handleEditorDidMount}
        options={{
          wordWrap: "off", // 자동 줄 바꿈 비활성화
          scrollBeyondLastLine: true, // 마지막 줄 이후로 스크롤 가능
          scrollBeyondLastColumn: 10, // 수평 스크롤 여유 공간 설정
          automaticLayout: true, // 에디터 컨테이너 크기 변경 시 자동 조정
          minimap: {
            enabled: true, // 미니맵 활성화 여부
          },
          fontSize: 14, // 글꼴 크기
          lineNumbers: "on", // 줄 번호 표시
          readOnly: false, // 읽기 전용 아님
          tabSize: 2, // 탭 크기 설정
          insertSpaces: true, // 탭 입력 시 공백으로 처리
          cursorStyle: "line", // 커서 스타일
          mouseWheelZoom: true, // Ctrl+마우스 휠로 폰트 크기 확대/축소
        }}
      />
    </EditorWrapper>
  );
}

const EditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: 2px solid blue;
`;
