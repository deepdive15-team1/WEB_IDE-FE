# Chip 컴포넌트

Chip은 작은 라벨이나 태그를 표시하는 데 사용되는 컴포넌트입니다.

## 설치 및 사용

```jsx
import Chip from '../components/common/Chip';

// 기본 사용
<Chip>기본 칩</Chip>

// Variant 사용
<Chip variant="ongoing">진행 중</Chip>
<Chip variant="completed">완료</Chip>
<Chip variant="language">JavaScript</Chip>
<Chip variant="tagging">태그</Chip>

// 아이콘과 함께 사용
<Chip icon="/path/to/icon.png">아이콘 칩</Chip>

// 커스텀 색상 사용
<Chip bgColor="#ff0000" textColor="#ffffff">커스텀 칩</Chip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Chip에 표시할 텍스트 내용 (필수) |
| `variant` | `string` | `"default"` | Chip의 스타일 변형. `"ongoing"`, `"completed"`, `"language"`, `"tagging"`, `"default"` 중 하나 |
| `bgColor` | `string` | - | 배경색을 커스터마이징할 때 사용 (CSS 변수 또는 색상 코드) |
| `textColor` | `string` | - | 텍스트 색상을 커스터마이징할 때 사용 (CSS 변수 또는 색상 코드) |
| `borderColor` | `string` | - | 테두리 색상을 커스터마이징할 때 사용 (CSS 변수 또는 색상 코드) |
| `icon` | `string` | - | 아이콘 이미지 경로 (선택사항) |
| `...props` | `object` | - | 기타 HTML 속성 전달 가능 |

## Variant 종류

### `ongoing`
- 배경색: `var(--color-main)`
- 텍스트 색상: `var(--color-white)`
- 진행 중인 작업을 표시할 때 사용

### `completed`
- 배경색: `var(--color-completed-bg)`
- 텍스트 색상: `var(--color-completed-text)`
- 완료된 작업을 표시할 때 사용

### `language`
- 배경색: `var(--color-white)`
- 텍스트 색상: `var(--color-black)`
- 테두리: `var(--color-gray-200)`
- 프로그래밍 언어를 표시할 때 사용

### `tagging`
- 배경색: `var(--color-accent)`
- 텍스트 색상: `var(--color-white)`
- 태그를 표시할 때 사용

### `default`
- 배경색: `var(--color-gray-200)`
- 텍스트 색상: `var(--color-gray-600)`
- 기본 스타일

## 사용 예시

### 기본 사용
```jsx
<Chip>기본 칩</Chip>
```

### Variant 사용
```jsx
<Chip variant="ongoing">진행 중</Chip>
<Chip variant="completed">완료됨</Chip>
<Chip variant="language">TypeScript</Chip>
<Chip variant="tagging">프론트엔드</Chip>
```

### 아이콘과 함께 사용
```jsx
<Chip icon="/icons/javascript.svg" variant="language">
  JavaScript
</Chip>
```

### 커스텀 색상 사용
```jsx
<Chip 
  bgColor="#e3f2fd" 
  textColor="#1976d2"
  borderColor="#90caf9"
>
  커스텀 칩
</Chip>
```

### CSS 변수 사용
```jsx
<Chip 
  bgColor="var(--color-primary)" 
  textColor="var(--color-white)"
>
  CSS 변수 칩
</Chip>
```

## 스타일 특징

- 인라인 플렉스 레이아웃
- 높이: 22px
- 패딩: 0.12rem 0.5rem
- 마진: 0.2rem
- 폰트 크기: 0.75rem
- 테두리 반경: 8px
- 아이콘 크기: 14px × 14px (아이콘 사용 시)

## 주의사항

- `bgColor`, `textColor`, `borderColor`를 지정하면 해당 variant의 기본 색상이 덮어씌워집니다.
- 아이콘은 14px × 14px 크기로 자동 조정됩니다.
- 아이콘 사용 시 아이콘과 텍스트 사이에 4px 간격이 자동으로 추가됩니다.
