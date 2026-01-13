import styled, { css } from "styled-components";

const VARIANTS = {
  //메인 input (input 디자인은 유사해서 추후 변동이 있다면 추가 예정)
  primary: css`
  background-color: var(--color-gray-50);
  color: var(--color-texth);
  border: 1px solid transparent;
  `
};

const SIZES = {
  sm: css`
    font-size: 12px;
    height: 44px;
    padding: 0 10px;
  `,
  md: css`
    font-size: 14px;
    height: 48px;
    padding: 0 14px;
  `,
  lg: css`
    font-size: 16px;
    height: 52px;
    padding: 0 24px;
  `
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  color:var(--color-text);
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 5px;
  transition: all 0.2s ease-in-out;
  color: var(--color-text);

  ${({ $size }) => SIZES[$size]}
  ${({ $variant }) => VARIANTS[$variant]}
  
  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: #ff4d4f !important;
      &:focus-within {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    `}
    
  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.7;
      pointer-events: none;
    `}
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const Message = styled.span`
  font-size: 12px;
  color: ${({ $isError }) => ($isError ? "#ff4d4f" : "var(--color-text)")};
  margin-bottom: 10px;
`;

export const StyledInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-family: inherit;
  color: inherit;
  font-size: inherit;

  &::placeholder {
    color: var(--color-gray-600);
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;