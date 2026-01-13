# Input Component

- 프로젝트 전반에서 사용되는 재사용 가능한 공통 Input 컴포넌트입니다.
- 라벨, 유효성 검사(Error), 아이콘 배치 및 다양한 레이아웃 옵션을 `props`로 쉽게 제어할 수 있습니다.

## 주요 기능

- **자동 접근성 연결**: `useId`를 사용하여 라벨과 인풋이 자동으로 연결되어 웹 접근성을 준수합니다.
- **3가지 사이즈**: `sm`, `md`, `lg`
- **유연한 아이콘 배치**: 인풋 내부 앞(`startIcon`)과 뒤(`endIcon`)에 아이콘이나 버튼 배치 가능
- **유효성 검사 UI**: `errorMessage` 전달 시 테두리 색상 변경 및 에러 메시지 자동 노출
- **UX 최적화**: 인풋 주변 여백(Container)을 클릭해도 내부 인풋에 포커스가 이동

## 사용 방법 (Usage)

### 1. 기본 사용 (Basic)

`label`과 `placeholder`를 사용하여 기본적인 입력 폼을 구성합니다.

```jsx
import { Input } from '@/components/common/Input/Input';

<Input 
  label="닉네임" 
  placeholder="닉네임을 입력하세요" 
  name="nickname"
  onChange={(e) => console.log(e.target.value)}
/>
```

### 2. 크기 조절 (Sizes)

`size` props로 높이와 패딩을 조절합니다. (`sm`, `md`, `lg`)

```jsx
<Input size="sm" placeholder="Small (44px)" />
<Input size="md" placeholder="Medium (48px) - Default" />
<Input size="lg" placeholder="Large (52px)" />
```

### 3. 유효성 검사 (Validation State)

`errorMessage` props에 문자열을 전달하면 에러 스타일이 적용됩니다.

```jsx
<Input 
  label="이메일" 
  value="wrong-email"
  errorMessage="이메일 형식이 올바르지 않습니다." 
/>
```

### 4. 아이콘과 함께 사용 (With Icons)

`startIcon` 또는 `endIcon` props를 사용하여 인풋 내부에 요소를 배치할 수 있습니다.

```jsx
import { SearchIcon, EyeIcon } from '@/assets/icons';

// 1. 앞쪽에 검색 아이콘
<Input 
  startIcon={<SearchIcon />} 
  placeholder="검색어를 입력하세요" 
/>

// 2. 뒤쪽에 버튼 (인풋 내부에 배치)
<Input 
  label="비밀번호"
  type="password"
  endIcon={<button>보기</button>} 
/>
```

### 5. 레이아웃 옵션 (Width Control)

기본적으로 부모 너비를 꽉 채우며(`fullWidth={true}`), 필요시 해제할 수 있습니다.

```jsx
// 기본값 (width: 100%)
<Input label="꽉 찬 인풋" />

// 컨텐츠 크기만큼만 차지
<Input fullWidth={false} placeholder="Auto width" />
```

### 6. DOM 접근 (Ref Handling)

내부 `<input>` 요소에 접근하려면 `inputRef` props를 사용합니다.

```jsx
const emailRef = useRef(null);

// 버튼 클릭 시 인풋으로 포커스 이동
const handleFocus = () => {
  emailRef.current?.focus();
};

<Input label="이메일" inputRef={emailRef} />
```

---

## Props 상세 (API Reference)

| Prop Name | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | - | 인풋 상단에 표시될 라벨 텍스트입니다. |
| `type` | `string` | `"text"` | HTML input type (text, password, email 등)입니다. |
| `errorMessage` | `string` | - | 에러 발생 시 표시할 메시지입니다. (존재 시 에러 스타일 적용) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 인풋의 높이와 패딩 크기를 결정합니다. |
| `variant` | `'primary'` | `'primary'` | 인풋의 디자인 스타일 테마를 결정합니다. |
| `fullWidth` | `boolean` | `true` | `true`일 경우 가로 너비를 100%로 설정합니다. |
| `startIcon` | `ReactNode` | - | 인풋 내부 **좌측**에 배치될 아이콘 요소입니다. |
| `endIcon` | `ReactNode` | - | 인풋 내부 **우측**에 배치될 아이콘 요소입니다. |
| `inputRef` | `RefObject` | - | 내부 `<input>` DOM 요소에 접근하기 위한 ref입니다. |
| `disabled` | `boolean` | `false` | 인풋을 비활성화합니다. |
| `className` | `string` | - | 외부 스타일 적용을 위한 클래스명입니다. |
| `...props` | `HTMLAttributes` | - | 기타 HTML `<input>` 속성을 그대로 전달받습니다. (`onChange`, `maxLength` 등) |