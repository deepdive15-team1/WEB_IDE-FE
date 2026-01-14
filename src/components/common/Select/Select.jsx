import { useState } from "react";
import { useId as useReactId } from "react";
import styled, { css } from "styled-components";
import SelectInput from "./SelectInput";

export default function Select({
  children,
  value,
  onChange,
  variant = "outlined",
  size = "md",
  label,
  errorMessage,
  placeholder = "선택하세요",
  disabled = false,
  fullWidth = true,
  ...props
}) {
  const uniqueId = useReactId();
  const selectId = props.id || `select-${uniqueId}`;
  const labelId = label ? `label-${uniqueId}` : undefined;

  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    if (disabled) return;
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const handleChange = (event, child) => {
    onChange?.(event, child);
  };

  return (
    <Wrapper $fullWidth={fullWidth}>
      {label && (
        <Label htmlFor={selectId} id={labelId}>
          {label}
        </Label>
      )}

      <SelectContainer
        $variant={variant}
        $size={size}
        $hasError={!!errorMessage}
        $disabled={disabled}
      >
        <SelectInput
          id={selectId}
          labelId={labelId}
          value={value}
          onChange={handleChange}
          onOpen={handleOpen}
          onClose={handleClose}
          open={open}
          disabled={disabled}
          placeholder={placeholder}
          variant={variant}
          size={size}
          {...props}
        >
          {children}
        </SelectInput>
      </SelectContainer>

      {errorMessage && <Message $isError={true}>{errorMessage}</Message>}
    </Wrapper>
  );
}

const VARIANTS = {
  outlined: css`
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-200);
    &:focus-within {
      border-color: var(--color-main);
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
    }
  `,
  filled: css`
    background-color: var(--color-gray-50);
    border: 1px solid transparent;
    &:focus-within {
      border-color: var(--color-main);
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
    }
  `,
  standard: css`
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--color-gray-300);
    border-radius: 0;
    &:focus-within {
      border-bottom-color: var(--color-main);
      border-bottom-width: 2px;
    }
  `,
};

const SIZES = {
  sm: css`
    font-size: 12px;
    height: 40px;
    padding: 0 12px;
  `,
  md: css`
    font-size: 14px;
    height: 48px;
    padding: 0 14px;
  `,
  lg: css`
    font-size: 16px;
    height: 52px;
    padding: 0 16px;
  `,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  position: relative;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 4px;
`;

const SelectContainer = styled.div`
  position: relative;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  color: var(--color-text);

  ${({ $variant }) => VARIANTS[$variant] || VARIANTS.outlined}
  ${({ $size }) => SIZES[$size] || SIZES.md}

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: #ff4d4f !important;
      &:focus-within {
        box-shadow: 0 0 0 3px rgba(255, 77, 79, 0.1) !important;
      }
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
      pointer-events: none;
    `}

  ${({ $variant }) =>
    $variant === "standard" &&
    css`
      border-radius: 0;
    `}
`;

const Message = styled.span`
  font-size: 12px;
  color: ${({ $isError }) => ($isError ? "#ff4d4f" : "var(--color-text)")};
`;
