import Textarea from "../common/Textarea/Textarea";
import usePostCreateStore from "../../stores/postCreateStore";

export default function PostDescriptField({ disabled = false }) {
  // description과 setDescription만 선택적 구독
  const description = usePostCreateStore((state) => state.description);
  const setDescription = usePostCreateStore((state) => state.setDescription);

  return (
    <Textarea
      label="설명 (선택)"
      placeholder="코드에 대한 설명이나 리뷰하고 싶은 부분을 작성하세요."
      name="content"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      disabled={disabled}
    />
  );
}
