import styled, { css } from "styled-components";

const VARIANTS = {
  //메인 버튼
  primary: css`
    background-color: var(--color-main);
    color: var(--color-white);
    border: 1px solid transparent;
  `,
  // 테두리만 있는 버튼
  outline: css`
    background-color: transparent;
    color: var(--color-text);
    border: 1px solid var(--color-gray-50);
  `,
  // 텍스트만 있는 버튼
  text: css`
    background-color: transparent;
    color: var(--color-gray-600);
    border: 1px solid transparent;

    &:hover {
      color: var(--color-text);
    }
  `,
};

const SIZES = {
  sm: css`
    font-size: 12px;
    height: 24px;
    padding: 0 10px;

    /* 아이콘 전용일 때는 정사각형 */
    ${({ $iconOnly }) =>
      $iconOnly &&
      css`
        width: 24px;
        padding: 0;
      `}
  `,
  md: css`
    font-size: 14px;
    height: 36px;
    padding: 0 14px;

    /* 아이콘 전용일 때는 정사각형 */
    ${({ $iconOnly }) =>
      $iconOnly &&
      css`
        width: 36px;
        padding: 0;
      `}
  `,
  lg: css`
    font-size: 16px;
    height: 44px;
    padding: 0 24px;

    /* 아이콘 전용일 때는 정사각형 */
    ${({ $iconOnly }) =>
      $iconOnly &&
      css`
        width: 44px;
        padding: 0;
      `}
  `,
  xl: css`
    font-size: 16px;
    height: 48px;
    padding: 0 24px;
    /* 아이콘 전용일 때는 정사각형 */
    ${({ $iconOnly }) =>
      $iconOnly &&
      css`
        width: 48px;
        padding: 0;
      `}
  `,
};

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  gap: 6px;

  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
  outline: none;

  .button-text {
    padding: 0 6px;
    line-height: 1;
  }

  ${({ $variant }) => VARIANTS[$variant]}
  ${({ $size }) => SIZES[$size]}
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
      display: flex;
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    border-color: transparent;
    pointer-events: none;
  }
`;
