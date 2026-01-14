import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

export default function Menu({
  open,
  onClose,
  anchorEl,
  children,
  minWidth,
  autoWidth = false,
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        anchorEl &&
        !anchorEl.contains(event.target)
      ) {
        onClose?.(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose, anchorEl]);

  useEffect(() => {
    if (!open || !anchorEl || !menuRef.current) return;

    const updatePosition = () => {
      const rect = anchorEl.getBoundingClientRect();
      const menu = menuRef.current;
      if (menu) {
        // SelectContainer의 너비를 가져오기 (SelectDisplay의 부모 요소)
        const containerEl = anchorEl.parentElement;
        const containerRect = containerEl ? containerEl.getBoundingClientRect() : rect;
        
        menu.style.top = `${rect.bottom + window.scrollY}px`;
        menu.style.left = `${containerRect.left + window.scrollX}px`;
        if (!autoWidth) {
          // SelectContainer의 실제 너비를 사용
          const width = `${containerRect.width}px`;
          menu.style.width = width;
          menu.style.minWidth = width;
          menu.style.maxWidth = width;
        }
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, anchorEl, minWidth, autoWidth]);

  if (!open || !anchorEl) return null;

  return createPortal(
    <>
      <MenuBackdrop onClick={onClose} />
      <MenuContainer ref={menuRef}>
        {children}
      </MenuContainer>
    </>,
    document.body
  );
}

const MenuBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1299;
  background-color: transparent;
`;

const MenuContainer = styled.div`
  position: absolute;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1300;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 4px;
`;

