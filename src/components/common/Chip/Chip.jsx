import styled from "styled-components";

export default function Chip({
  children,
  variant = "default",
  bgColor,
  textColor,
  borderColor,
  icon,
  ...props
}) {
  // 라벨 타입별 기본 색상 매핑
  const variantInfo = {
    ongoing: {
      bgColor: "var(--color-main)",
      textColor: "var(--color-white)",
    },
    completed: {
      bgColor: "var(--color-completed-bg)",
      textColor: "var(--color-completed-text)",
    },
    language: {
      bgColor: "var(--color-white)",
      textColor: "var(--color-black)",
      borderColor: "var(--color-gray-200)",
    },
    tagging: {
      bgColor: "var(--color-accent)",
      textColor: "var(--color-white)",
    },
    default: {
      bgColor: "var(--color-gray-200)",
      textColor: "var(--color-gray-600)",
    },
  };

  const info = variantInfo[variant] || variantInfo.default;
  const finalBgColor = bgColor || info.bgColor;
  const finalTextColor = textColor || info.textColor;
  const finalBorderColor = borderColor || info.borderColor;

  return (
    <ChipContainer
      $bgColor={finalBgColor}
      $textColor={finalTextColor}
      $borderColor={finalBorderColor}
      $hasIcon={!!icon}
      {...props}
    >
      {icon && <ChipIcon><img src={icon} alt={icon} /></ChipIcon>}
      {children}
    </ChipContainer>
  );
}

const ChipContainer = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => (props.$hasIcon ? "4px" : "0")};
  height: 22px;
  padding: 0.12rem 0.5rem;
  margin: 0.2rem;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.5;
  border-radius: 8px;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};
  border: ${(props) =>
    props.$borderColor && props.$borderColor !== "none"
      ? `1.5px solid ${props.$borderColor}`
      : "none"};
  white-space: nowrap;
`;

const ChipIcon = styled.span`
  display: inline-flex;
  align-items: center;
  width: 14px;
  height: 14px;

  img {
    width: 100%;
    height: 100%;
  }
`;
