import { useRef } from "react";
import { Input } from "../common/Input/Input";

import styled from "styled-components";

export default function PostTitleField({}) {
  const titleRef = useRef(null);

  return (
    <Input
      label="제목"
      placeholder="예: React Hook 사용법에 대한 리뷰 부탁드립니다."
      name="title"
      onChange={(e) => console.log(e.target.value)}
      inputRef={titleRef}
    //   errorMessage="* 필수 입력 사항입니다."
    />
  );
}

const Container = styled`

`;
