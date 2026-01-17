import PostPageLayout from "../components/post/PostPageLayout";
import PostCreateHeaderContent from "../components/header/PostCreateHeaderContent";
import PostSection from "../components/post/PostSection";
import PostTitleField from "../components/post/PostTitleField";
import PostLanguageField from "../components/post/PostLanguageField";
import PostDescriptField from "../components/post/PostDescriptField";
import PostCodeEditor from "../components/post/PostCodeEditor";

export default function PostCreate() {
  return (
    <PostPageLayout postHeader={<PostCreateHeaderContent />}>
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
        <PostCodeEditor language="css" codeText="ddddddddd"  readOnly={false} />
      </PostSection>
    </PostPageLayout>
  );
}
