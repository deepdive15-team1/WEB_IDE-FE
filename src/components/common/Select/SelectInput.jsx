import { useRef, useState, useEffect } from "react";
import { Children, cloneElement, isValidElement } from "react";
import styled, { css } from "styled-components";
import Menu from "./Menu";

export default function SelectInput({
  children,
  value,
  onChange,
  onOpen,
  onClose,
  open,
  disabled,
  placeholder,
  variant,
  size,
  id,
  labelId,
  ...props
}) {
  const displayRef = useRef(null);
  const inputRef = useRef(null);
  const [displayNode, setDisplayNode] = useState(null);
  const [menuMinWidth, setMenuMinWidth] = useState(null);

  useEffect(() => {
    if (displayRef.current) {
      setDisplayNode(displayRef.current);
    }
  }, []);

  useEffect(() => {
    if (open && displayNode && !props.autoWidth) {
      setMenuMinWidth(displayNode.clientWidth);
    }
  }, [open, displayNode, props.autoWidth]);

  const handleMouseDown = (event) => {
    if (disabled || event.button !== 0) return;
    event.preventDefault();
    displayRef.current?.focus();
    onOpen?.(event);
  };

  const handleItemClick = (childValue) => (event) => {
    if (disabled) return;

    const newValue = childValue;
    onClose?.(event);

    const syntheticEvent = {
      target: { value: newValue, name: props.name },
      currentTarget: { value: newValue, name: props.name },
    };

    onChange?.(syntheticEvent, childValue);
  };

  const areEqualValues = (a, b) => {
    if (typeof b === "object" && b !== null) {
      return a === b;
    }
    return String(a) === String(b);
  };

  const childrenArray = Children.toArray(children);
  const items = childrenArray.map((child, index) => {
    if (!isValidElement(child)) return null;

    const childValue = child.props.value;
    const selected = areEqualValues(value, childValue);

    return cloneElement(child, {
      key: child.key || index,
      selected,
      onClick: handleItemClick(childValue),
    });
  });

  const selectedItem = items.find((item) => item && item.props.selected);
  const display = selectedItem
    ? selectedItem.props.children || selectedItem.props.value
    : null;

  const isEmpty = display == null || (typeof display === "string" && !display.trim());

  return (
    <>
      <SelectDisplay
        ref={displayRef}
        id={id}
        onMouseDown={handleMouseDown}
        $variant={variant}
        $size={size}
        $disabled={disabled}
        $open={open}
      >
        {isEmpty ? (
          <PlaceholderText>{placeholder}</PlaceholderText>
        ) : (
          <DisplayText>{display}</DisplayText>
        )}
      </SelectDisplay>
      <NativeInput
        ref={inputRef}
        type="text"
        value={value || ""}
        name={props.name}
        disabled={disabled}
        readOnly
      />
      <SelectIcon $open={open} $variant={variant} $size={size}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SelectIcon>
      {displayNode && (
        <Menu
          open={open}
          onClose={onClose}
          anchorEl={displayNode}
          minWidth={menuMinWidth}
          autoWidth={props.autoWidth}
        >
          {items}
        </Menu>
      )}
    </>
  );
}

const SelectDisplay = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  user-select: none;
  outline: none;
  color: var(--color-text);
  min-width: 0;
  padding-right: 44px; /* 아이콘 영역 확보 (right: 12px + 아이콘 20px + 여유 12px) */

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
    `}

  &:focus-visible {
    outline: 2px solid var(--color-main);
    outline-offset: 2px;
  }
`;

const PlaceholderText = styled.span`
  flex: 1;
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-family: inherit;
  color: var(--color-gray-600);
  font-size: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

const DisplayText = styled.span`
  flex: 1;
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-family: inherit;
  color: inherit;
  font-size: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

const NativeInput = styled.input`
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  width: 100%;
  height: 0;
  padding: 0;
  border: none;
`;

const SelectIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-gray-600);
  transition: transform 0.2s ease-in-out;

  ${({ $open }) =>
    $open &&
    css`
      transform: translateY(-50%) rotate(180deg);
    `}

  svg {
    width: 20px;
    height: 20px;
  }
`;

