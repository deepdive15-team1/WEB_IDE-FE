import { useId } from "react";
import styled, { css } from "styled-components";

export default function Textarea({
  label,
  variant = "primary",
  size = "md",
  fullWidth = true,
  textareaRef,
  rows = 4,
  resize = "none",
  ...props
}) {
  const uniqueId = useId();
  const textareaId = props.id || uniqueId;

  return (
    <Wrapper $fullWidth={fullWidth}>
      {label && <Label htmlFor={textareaId}>{label}</Label>}

      <TextareaInput
        ref={textareaRef}
        id={textareaId}
        rows={rows}
        $resize={resize}
        $variant={variant}
        $size={size}
        $disabled={props.disabled}
        disabled={props.disabled}
        {...props}
      />
    </Wrapper>
  );
}

const VARIANTS = {
  primary: css`
    background-color: var(--color-gray-50);
    color: var(--color-text);
    border: 1px solid transparent;
  `,
};

const SIZES = {
  sm: css`
    font-size: 12px;
    padding: 10px 12px;
  `,
  md: css`
    font-size: 14px;
    padding: 12px 14px;
  `,
  lg: css`
    font-size: 16px;
    padding: 14px 16px;
  `,
};

const RESIZE_OPTIONS = {
  none: css`
    resize: none;
  `,
  both: css`
    resize: both;
  `,
  horizontal: css`
    resize: horizontal;
  `,
  vertical: css`
    resize: vertical;
  `,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--color-text);
`;

const TextareaInput = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  font-family: inherit;
  line-height: 1.5;
  min-height: 50px;
  overflow: auto;
  border-radius: 8px;
  margin-bottom: 5px;
  transition: all 0.2s ease-in-out;

  ${({ $size }) => SIZES[$size] || SIZES.md}
  ${({ $variant }) => VARIANTS[$variant] || VARIANTS.primary}
  ${({ $resize }) => RESIZE_OPTIONS[$resize] || RESIZE_OPTIONS.none}

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &::placeholder {
    color: var(--color-gray-600);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    pointer-events: none;
  }

  &:focus {
    outline: none;
  }
`;

