import PostPageLayout from "../components/post/PostPageLayout";
import PostDetailHeaderContent from "../components/header/PostDetailHeaderContent";
import PostSection from "../components/post/PostSection";
import PostCodeEditor from "../components/post/PostCodeEditor";

export default function PostDetail() {
  return (
    <PostPageLayout postHeader={<PostDetailHeaderContent />}>
      <PostSection
        title="코드"
        descript="줄 번호를 클릭하여 해당 줄에 대한 댓글을 작성할 수 있습니다."
      >
        <PostCodeEditor language="javascript" codeText ="ddd" readOnly={true} />
      </PostSection>

      <PostSection
        title="채팅"
        descript="코드 라인을 선택하고 댓글을 달아보세요."
      ></PostSection>
    </PostPageLayout>
  );
}
