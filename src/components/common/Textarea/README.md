# Textarea Component

- 프로젝트 전반에서 사용되는 재사용 가능한 공통 Textarea 컴포넌트입니다.
- 라벨, 다양한 레이아웃 옵션을 `props`로 쉽게 제어할 수 있습니다.

## 주요 기능

- **자동 접근성 연결**: `useId`를 사용하여 라벨과 텍스트에어리어가 자동으로 연결되어 웹 접근성을 준수합니다.
- **3가지 사이즈**: `sm`, `md`, `lg`
- **UX 최적화**: 텍스트에어리어 주변 여백(Container)을 클릭해도 내부 텍스트에어리어에 포커스가 이동
- **크기 조절 옵션**: `rows`로 초기 높이 설정, `resize`로 크기 조절 방향 제어

## 사용 방법 (Usage)

### 1. 기본 사용 (Basic)

`label`과 `placeholder`를 사용하여 기본적인 텍스트에어리어를 구성합니다.

```jsx
import { Textarea } from '@/components/common/Textarea';

<Textarea 
  label="내용" 
  placeholder="내용을 입력하세요" 
  name="content"
  onChange={(e) => console.log(e.target.value)}
/>
```

### 2. 크기 조절 (Sizes)

`size` props로 폰트 크기와 패딩을 조절합니다. (`sm`, `md`, `lg`)

```jsx
<Textarea size="sm" placeholder="Small" />
<Textarea size="md" placeholder="Medium - Default" />
<Textarea size="lg" placeholder="Large" />
```

### 3. 행 수 조절 (Rows)

`rows` props로 초기 높이를 조절합니다.

```jsx
<Textarea rows={3} placeholder="3줄 높이" />
<Textarea rows={5} placeholder="5줄 높이" />
<Textarea rows={10} placeholder="10줄 높이" />
```

### 4. 크기 조절 방향 (Resize)

`resize` props로 사용자가 크기를 조절할 수 있는 방향을 제어합니다.

```jsx
<Textarea resize="none" placeholder="크기 조절 불가" />
<Textarea resize="vertical" placeholder="세로만 조절 가능 (기본)" />
<Textarea resize="horizontal" placeholder="가로만 조절 가능" />
<Textarea resize="both" placeholder="가로/세로 모두 조절 가능" />
```

### 5. 비활성화 (Disabled)

`disabled` props로 텍스트에어리어를 비활성화할 수 있습니다.

```jsx
<Textarea 
  label="내용" 
  value="수정 불가능한 내용"
  disabled 
/>
```

### 6. 전체 너비 사용 (Full Width)

`fullWidth` props로 전체 너비 사용 여부를 제어합니다. (기본값: `true`)

```jsx
<Textarea fullWidth={true} placeholder="전체 너비" />
<Textarea fullWidth={false} placeholder="내용에 맞춤" />
```

### 7. ref 사용

`textareaRef`를 통해 텍스트에어리어에 직접 접근할 수 있습니다.

```jsx
import { useRef } from 'react';
import { Textarea } from '@/components/common/Textarea';

function MyForm() {
  const textareaRef = useRef(null);
  
  const handleFocus = () => {
    textareaRef.current?.focus();
  };
  
  return (
    <>
      <button onClick={handleFocus}>포커스</button>
      <Textarea 
        textareaRef={textareaRef}
        placeholder="텍스트에어리어"
      />
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | 텍스트에어리어 위에 표시될 라벨 |
| `variant` | `'primary'` | `'primary'` | 텍스트에어리어 스타일 변형 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 텍스트에어리어 크기 |
| `fullWidth` | `boolean` | `true` | 전체 너비 사용 여부 |
| `rows` | `number` | `4` | 초기 행 수 (높이) |
| `resize` | `'none' \| 'both' \| 'horizontal' \| 'vertical'` | `'vertical'` | 크기 조절 방향 |
| `textareaRef` | `RefObject<HTMLTextAreaElement>` | - | 텍스트에어리어 ref |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `...props` | - | - | 기타 HTML textarea 속성 (`onChange`, `value`, `placeholder`, `name` 등) |

## 사용 예시

### 폼에서 사용

```jsx
import { useState } from 'react';
import { Textarea } from '@/components/common/Textarea';

function CommentForm() {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (!comment.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }
    // 제출 로직
  };

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        label="댓글"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력하세요"
        rows={5}
      />
      <button type="submit">제출</button>
    </form>
  );
}
```

### 여러 옵션 조합

```jsx
<Textarea
  label="상세 설명"
  placeholder="상세한 설명을 입력하세요"
  size="lg"
  rows={8}
  resize="both"
  fullWidth={true}
  onChange={(e) => console.log(e.target.value)}
/>
```

## 주의사항

1. **Controlled 컴포넌트**: `value`와 `onChange`를 함께 사용하여 상태를 관리해야 합니다.
2. **접근성**: `label`을 제공하면 자동으로 접근성이 향상됩니다.
