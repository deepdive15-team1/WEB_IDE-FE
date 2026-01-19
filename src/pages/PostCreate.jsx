import { useEffect } from "react";
import usePostCreateStore from "../stores/postCreateStore";
import PostPageLayout from "../components/post/PostPageLayout";
import PostCreateHeaderContent from "../components/header/PostCreateHeaderContent";
import PostSection from "../components/post/PostSection";
import PostTitleField from "../components/post/PostTitleField";
import PostLanguageField from "../components/post/PostLanguageField";
import PostDescriptField from "../components/post/PostDescriptField";
import PostCodeEditor from "../components/post/PostCodeEditor";

export default function PostCreate() {
  // language만 구독 (PostCodeEditor에 전달하기 위해 필요)
  // codeText는 PostCodeEditor에서 직접 구독하므로 여기서는 구독하지 않음
  const language = usePostCreateStore((state) => state.language);

  // 생성 모드로 처음 진입할 때만 스토어 초기화
  useEffect(() => {
    usePostCreateStore.getState().reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시에만 실행

  return (
    <PostPageLayout 
      postHeader={<PostCreateHeaderContent />}
    >
      <PostSection
        title="게시글 정보"
        descript="제목과 설명을 입력하고 프로그래밍 언어를 선택하세요."
      >
        <PostTitleField />
        <PostLanguageField />
        <PostDescriptField />
      </PostSection>

      <PostSection
        title="코드 에디터"
        descript="리뷰받고 싶은 코드를 입력하세요."
      >
        <PostCodeEditor 
          language={language} 
          readOnly={false} 
        />
      </PostSection>
    </PostPageLayout>
  );
}
