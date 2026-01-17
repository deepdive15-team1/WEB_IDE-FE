# Button Component

프로젝트 전반에서 사용되는 재사용 가능한 공통 버튼 컴포넌트입니다.
다양한 크기, 색상(Variant), 아이콘 배치 및 레이아웃 옵션을 지원합니다.

## 주요 기능

- **3가지 스타일 Variant**: `primary` (기본), `outline`, `text`
- **4가지 사이즈**: `sm`, `md`, `lg`, `xl`
- **유연한 레이아웃**: `fullWidth` (꽉 찬 버튼), `iconOnly` (정사각형 아이콘 버튼)
- **아이콘 지원**: 텍스트 앞(`startIcon`) 또는 뒤(`endIcon`)에 아이콘 배치 가능
- **접근성 & 상태**: `disabled` 처리 및 Hover/Active 인터랙션 자동 적용, 키보드 포커스(`focus-visible`) 지원

## 사용 방법 (Usage)

### 1. 기본 사용 (Basic)

```jsx
import { Button } from '@/components/common/Button/Button';

// 기본형 (Primary, Large)
<Button onClick={() => alert('클릭!')}>
  버튼 텍스트
</Button>
```

### 2. 스타일 변형 (Variants)

`variant` props를 통해 버튼의 스타일을 변경할 수 있습니다.

```jsx
// 배경색이 있는 메인 버튼 (Default)
<Button variant="primary">저장하기</Button>

// 테두리만 있는 버튼
<Button variant="outline">취소</Button>

// 텍스트만 있는 버튼 (배경 투명)
<Button variant="text">더보기</Button>
```

### 3. 크기 조절 (Sizes)

`size` props로 크기를 조절합니다. (`sm`, `md`, `lg`, `xl`)

```jsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large (Default)</Button>
<Button size="xl">X-Large</Button>
```

### 4. 아이콘과 함께 사용 (With Icons)

`startIcon` 또는 `endIcon` props에 이미지 경로를 전달하면 자동으로 간격이 조정되며 이미지로 출력됩니다.

```jsx
import LoginIcon from '@/assets/icons/LoginIcon.svg';
import SignupIcon from '@/assets/icons/SignupIcon.svg';

// 텍스트 앞에 아이콘
<Button startIcon={LoginIcon}>
  로그인
</Button>

// 텍스트 뒤에 아이콘
<Button endIcon={SignupIcon}>
  회원가입
</Button>
```

### 5. 레이아웃 옵션 (Layouts)

#### Full Width (너비 꽉 채우기)
부모 컨테이너의 너비만큼 늘어납니다.

```jsx
<Button fullWidth>로그인</Button>
```

#### Icon Only (아이콘 전용)
텍스트 없이 아이콘만 있을 때 사용하며, **정사각형 비율**을 유지합니다. children에 <img> 태그를 직접 넣거나 아이콘 경로를 활용합니다.

```jsx
import SendIcon from '@/assets/icons/SendIcon.svg';

<Button variant="text" size="md" iconOnly>
  <img src={SendIcon} alt="보내기" />
</Button>
```

### 6. 비활성화 (Disabled)

`disabled` 상태에서는 클릭이 불가능하며, 스타일이 반투명하게 변경됩니다.

```jsx
<Button disabled>전송 불가</Button>
```

---

## Props 상세 (API Reference)

| Prop Name | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'outline' \| 'text'` | `'primary'` | 버튼의 스타일 테마를 결정합니다. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | 버튼의 크기를 결정합니다. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML 버튼 태그의 type 속성입니다. |
| `fullWidth` | `boolean` | `false` | `true`일 경우 가로 너비를 100%로 설정합니다. |
| `iconOnly` | `boolean` | `false` | `true`일 경우 패딩을 조절하여 정사각형 버튼을 만듭니다. (아이콘 단독 사용 시 권장) |
| `startIcon` | `string` | - | 버튼 텍스트 **앞쪽** <img>의 src 경로입니다. |
| `endIcon` | `string` | - | 버튼 텍스트 **뒤쪽** <img>의 src 경로입니다. |
| `disabled` | `boolean` | `false` | 버튼을 비활성화합니다. |
| `onClick` | `function` | - | 클릭 이벤트 핸들러입니다. |
| `children` | `ReactNode` | - | 버튼 내부에 들어갈 내용(텍스트 등)입니다. |
| `...props` | `HTMLAttributes` | - | 기타 HTML `<button>` 속성을 그대로 전달받습니다. |