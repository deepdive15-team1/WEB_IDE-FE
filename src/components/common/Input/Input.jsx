import { useId } from "react";
import { Wrapper, Label, InputContainer, IconWrapper, Message, StyledInput } from "./styles";

export const Input = ({
  label,
  type = "text",
  errorMessage,
  variant = "primary",
  size = "md",
  fullWidth = true,
  startIcon,
  endIcon,
  className,
  inputRef,
  ...props
}) => {
  
  const uniqueId = useId();
  const inputId = props.id || uniqueId;

  return (
    <Wrapper $fullWidth={fullWidth} className={className}>
      {label && <Label htmlFor={inputId}>{label}</Label>}

      <InputContainer
        $variant={variant}
        $size={size}
        $hasError={!!errorMessage}
        $disabled={props.disabled}
        onClick={() => {
          if (props.disabled) return;
          inputRef?.current?.focus();
        }}
      >
        {startIcon && <IconWrapper><img src={startIcon} alt={startIcon} /></IconWrapper>}

        <StyledInput 
          ref={inputRef} 
          id={inputId} 
          type={type} 
          disabled={props.disabled} 
          {...props} 
        />

        {endIcon && <IconWrapper><img src={endIcon} alt={endIcon} /></IconWrapper>}
      </InputContainer>

      {errorMessage && <Message $isError={true}>{errorMessage}</Message>}
    </Wrapper>
  );
};
