import styled, { css } from "styled-components";

export default function MenuItem({
  children,
  value,
  selected = false,
  onClick,
  disabled = false,
  ...props
}) {
  const handleClick = (event) => {
    if (disabled) return;
    onClick?.(event);
  };

  return (
    <MenuItemContainer
      $selected={selected}
      $disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </MenuItemContainer>
  );
}

const MenuItemContainer = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text);
  transition: background-color 0.15s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: var(--color-gray-50);
  }

  ${({ $selected }) =>
    $selected &&
    css`
      background-color: var(--color-gray-100);
      color: var(--color-main);
      font-weight: 500;
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    `}

  &:focus {
    outline: none;
    background-color: var(--color-gray-50);
  }

  &:focus-visible {
    outline: 2px solid var(--color-main);
    outline-offset: -2px;
  }
`;

