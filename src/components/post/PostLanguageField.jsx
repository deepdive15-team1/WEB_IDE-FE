import Select, { MenuItem } from "../common/Select";
import usePostCreateStore from "../../stores/postCreateStore";

export default function PostLanguageField() {
  // language와 setLanguage만 선택적 구독
  const language = usePostCreateStore((state) => state.language);
  const setLanguage = usePostCreateStore((state) => state.setLanguage);

  return (
    <Select
      label="프로그래밍 언어"
      value={language}
      onChange={(event) => setLanguage(event.target.value)}
      placeholder="프로그래밍 언어 선택"
      variant="filled"
    //   errorMessage="* 필수 항목입니다"
    >
      <MenuItem value="cpp">C++</MenuItem>
      <MenuItem value="java">Java</MenuItem>
      <MenuItem value="javascript">JavaScript</MenuItem>
      <MenuItem value="python">Python</MenuItem>
    </Select>
  );
}
