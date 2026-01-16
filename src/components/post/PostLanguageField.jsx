import { useState } from "react";
import Select, { MenuItem } from "../common/Select";

export default function PostLanguageField() {
  const [value, setValue] = useState("");

  return (
    <Select
      label="프로그래밍 언어"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="프로그래밍 언어 선택"
      variant="filled"
    //   errorMessage="* 필수 항목입니다"
    >
      <MenuItem value="cpp">C++</MenuItem>
      <MenuItem value="java">Java</MenuItem>
      <MenuItem value="javascript">JavaScript</MenuItem>
    </Select>
  );
}
