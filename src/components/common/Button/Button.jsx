import { IconWrapper, StyledButton } from "./styles";

export const Button = ({
  variant = "primary",
  size = "lg",
  type = "button",
  fullWidth = false,
  iconOnly = false,
  onClick,
  children,
  disabled,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $iconOnly={iconOnly}
      type={type} 
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {/* 아이콘이 텍스트 앞에 있을 때 */}
      {startIcon && <IconWrapper><img src={startIcon} alt={startIcon} /></IconWrapper>}
      <span className="button-text">
        {children}
      </span>
      {/* 아이콘이 텍스트 뒤에 있을 때 */}
      {endIcon && <IconWrapper><img src={endIcon} alt={endIcon} /></IconWrapper>}
    </StyledButton>
  );
};