# Select 컴포넌트

MUI Material-UI의 Select 컴포넌트를 참고하여 구현한 공통 Select 컴포넌트입니다.
드롭다운 메뉴를 통해 옵션을 선택할 수 있는 컴포넌트입니다.

## 주요 기능

- **3가지 Variant**: `outlined` (기본), `filled`, `standard`
- **3가지 사이즈**: `sm`, `md` (기본), `lg`
- **Controlled 컴포넌트**: `value`와 `onChange`로 상태 관리
- **에러 상태**: `errorMessage` prop으로 에러 메시지 표시

## 사용 방법

### 1. 기본 사용

```jsx
import { useState } from 'react';
import Select, { MenuItem } from '@/components/common/Select';

const [value, setValue] = useState('');

<Select
  value={value}
  onChange={(event) => setValue(event.target.value)}
  placeholder="선택하세요"
>
  <MenuItem value="option1">옵션 1</MenuItem>
  <MenuItem value="option2">옵션 2</MenuItem>
  <MenuItem value="option3">옵션 3</MenuItem>
</Select>
```

### 2. Variant 사용

```jsx
// Outlined (기본) - 테두리가 있는 스타일
<Select variant="outlined">
  <MenuItem value="1">옵션 1</MenuItem>
</Select>

// Filled - 배경색이 있는 스타일
<Select variant="filled">
  <MenuItem value="1">옵션 1</MenuItem>
</Select>

// Standard - 밑줄만 있는 스타일
<Select variant="standard">
  <MenuItem value="1">옵션 1</MenuItem>
</Select>
```

### 3. 사이즈 조절

```jsx
<Select size="sm">...</Select>
<Select size="md">...</Select>  {/* 기본 */}
<Select size="lg">...</Select>
```

### 4. Label과 Error Message

```jsx
<Select
  label="카테고리 선택"
  errorMessage="필수 항목입니다"
  placeholder="선택하세요"
>
  <MenuItem value="1">옵션 1</MenuItem>
</Select>
```

### 5. Disabled 상태

```jsx
<Select disabled placeholder="비활성화됨">
  <MenuItem value="1">옵션 1</MenuItem>
</Select>
```

## Props

### Select Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | MenuItem 컴포넌트들 (필수) |
| `value` | `any` | - | 선택된 값 (필수) |
| `onChange` | `(event, child) => void` | - | 값 변경 시 호출되는 콜백 (필수) |
| `variant` | `'outlined' \| 'filled' \| 'standard'` | `'outlined'` | Select 스타일 변형 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Select 크기 |
| `label` | `string` | - | Select 위에 표시될 라벨 |
| `errorMessage` | `string` | - | 에러 메시지 |
| `placeholder` | `string` | `'선택하세요'` | 선택되지 않았을 때 표시될 텍스트 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `fullWidth` | `boolean` | `true` | 전체 너비 사용 여부 |
| `autoWidth` | `boolean` | `false` | 메뉴 너비를 자동으로 조정할지 여부 |

### MenuItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | 메뉴 아이템에 표시될 내용 (필수) |
| `value` | `any` | - | 아이템의 값 (필수) |
| `selected` | `boolean` | `false` | 선택된 상태 (내부에서 자동 설정) |
| `onClick` | `(event) => void` | - | 클릭 핸들러 (내부에서 자동 설정) |
| `disabled` | `boolean` | `false` | 비활성화 여부 |

## 사용 예시

### 기본 폼에서 사용

```jsx
import { useState } from 'react';
import Select, { MenuItem } from '@/components/common/Select';

function MyForm() {
  const [category, setCategory] = useState('');

  return (
    <Select
      label="카테고리"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      placeholder="카테고리를 선택하세요"
    >
      <MenuItem value="tech">기술</MenuItem>
      <MenuItem value="design">디자인</MenuItem>
      <MenuItem value="business">비즈니스</MenuItem>
    </Select>
  );
}
```

### 에러 상태

```jsx
<Select
  label="필수 선택"
  errorMessage="반드시 선택해주세요"
  value={value}
  onChange={(e) => setValue(e.target.value)}
>
  <MenuItem value="1">옵션 1</MenuItem>
</Select>
```

## 주의사항

1. **Controlled 컴포넌트**: `value`와 `onChange`는 필수입니다. 부모 컴포넌트에서 상태를 관리해야 합니다.
2. **MenuItem은 직접 children으로 제공**: Fragment나 다른 래퍼 없이 직접 MenuItem을 children으로 전달해야 합니다.
3. **Portal 사용**: Menu는 Portal을 사용하여 body에 렌더링됩니다.