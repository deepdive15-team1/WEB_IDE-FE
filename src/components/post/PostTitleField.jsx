import { useRef } from "react";
import { Input } from "../common/Input/Input";
import usePostCreateStore from "../../stores/postCreateStore";

export default function PostTitleField() {
  const titleRef = useRef(null);
  
  // title과 setTitle만 선택적 구독
  const title = usePostCreateStore((state) => state.title);
  const setTitle = usePostCreateStore((state) => state.setTitle);

  return (
    <Input
      label="제목"
      placeholder="예: React Hook 사용법에 대한 리뷰 부탁드립니다."
      name="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      inputRef={titleRef}
    //   errorMessage="* 필수 입력 사항입니다."
    />
  );
}
