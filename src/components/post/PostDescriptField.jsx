import Textarea from "../common/Textarea/Textarea";

export default function PostDescriptField() {
  return (
    <Textarea
      label="설명 (선택)"
      placeholder="코드에 대한 설명이나 리뷰하고 싶은 부분을 작성하세요."
      name="content"
    //   onChange={(e) => console.log(e.target.value)}
    //   textareaRef={textareaRef}
    />
  );
}
