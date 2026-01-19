import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api/postApi.index";
import usePostCreateStore from "../stores/postCreateStore";
import PostPageLayout from "../components/post/PostPageLayout";
import PostCreateHeaderContent from "../components/header/PostCreateHeaderContent";
import PostEditHeaderContent from "../components/header/PostEditHeaderContent";
import PostSection from "../components/post/PostSection";
import PostTitleField from "../components/post/PostTitleField";
import PostLanguageField from "../components/post/PostLanguageField";
import PostDescriptField from "../components/post/PostDescriptField";
import PostCodeEditor from "../components/post/PostCodeEditor";

export default function PostCreate() {
  const { postId } = useParams();
  const isEditMode = !!postId;
  
  // language만 구독 (PostCodeEditor에 전달하기 위해 필요)
  // codeText는 PostCodeEditor에서 직접 구독하므로 여기서는 구독하지 않음
  const language = usePostCreateStore((state) => state.language);

  // 생성 모드로 처음 진입할 때만 스토어 초기화
  useEffect(() => {
    if (!isEditMode) {
      usePostCreateStore.getState().reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시에만 실행

  // edit 모드일 때 기존 포스트 데이터 로드
  useEffect(() => {
    if (isEditMode && postId) {
      const loadPostData = async () => {
        try {
          const post = await getPost(Number(postId));
          const store = usePostCreateStore.getState();
          
          // 기존 포스트 데이터를 스토어에 로드
          store.setTitle(post.title);
          store.setDescription(post.description || "");
          store.setLanguage(post.language?.toLowerCase() || "javascript");
          store.setCodeTextImmediate(post.codeText || "");
        } catch (error) {
          console.error("포스트 데이터 로드 실패:", error);
          alert("포스트를 불러오는데 실패했습니다.");
        }
      };

      loadPostData();
    }
    // 생성 모드일 때는 컴포넌트 마운트 시에만 초기화
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]); // postId만 의존성으로 사용 (isEditMode는 postId로부터 파생됨)

  return (
    <PostPageLayout 
      postHeader={
        isEditMode && postId
          ? <PostEditHeaderContent postId={Number(postId)} />
          : <PostCreateHeaderContent />
      }
    >
      <PostSection
        title="게시글 정보"
        descript="제목과 설명을 입력하고 프로그래밍 언어를 선택하세요."
      >
        <PostTitleField disabled={isEditMode} />
        <PostLanguageField disabled={isEditMode} />
        <PostDescriptField disabled={isEditMode} />
      </PostSection>

      <PostSection
        title="코드 에디터"
        descript={isEditMode ? "코드를 수정하세요." : "리뷰받고 싶은 코드를 입력하세요."}
      >
        <PostCodeEditor 
          language={language} 
          readOnly={false} 
        />
      </PostSection>
    </PostPageLayout>
  );
}
