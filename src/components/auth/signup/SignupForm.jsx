import styled from "styled-components";
import { useSignup } from "./useSignup";
import { Button } from "../../common/Button/Button";
import { Input } from "../../common/Input/Input";

function SignupForm({onSignupSuccess}) {
const { form, status, errors, handlers } = useSignup(onSignupSuccess);

  return (
    <form onSubmit={handlers.handleSignup}>
      <Input label="닉네임" type="text" name="nickname" placeholder="닉네임을 입력하세요" value={form.nickname} onChange={handlers.handleInputChange} />
      <InputButtonWrapper>
        <Input
          label="아이디"
          type="text"
          name="email"
          placeholder="이메일을 입력하세요"
          value={form.email}
          onChange={handlers.handleInputChange}
          errorMessage={errors.email}
          disabled={status.isEmailVerified}
        />
        <Button size="xl" onClick={handlers.handleSendVerification} disabled={status.isEmailVerified || status.isEmailSent}>
          {status.isEmailSent ? "전송됨" : "인증번호 전송"}
        </Button>
      </InputButtonWrapper>

      {status.isEmailSent && !status.isEmailVerified && (
        <InputButtonWrapper>
          <Input
            label="인증번호 확인"
            type="text"
            name="verificationCode"
            placeholder="인증번호를 입력해주세요"
            value={form.verificationCode}
            onChange={handlers.handleInputChange}
            errorMessage={errors.verification}
          />
          <Button type="button" size="xl" onClick={handlers.handleVerifyCode}>
            확인
          </Button>
        </InputButtonWrapper>
      )}

      <Input
        label="비밀번호"
        type="password"
        name="password"
        placeholder="8자리 이상 특수문자를 넣어주세요"
        value={form.password}
        onChange={handlers.handleInputChange}
        errorMessage={errors.password}
      />

      <Input
        label="비밀번호 확인"
        type="password"
        name="confirmPassword"
        placeholder="비밀번호를 한번 더 입력해주세요"
        value={form.confirmPassword}
        onChange={handlers.handleInputChange}
        errorMessage={errors.confirmPassword}
      />

      <Button 
        fullWidth 
        disabled={status.isSubmitting || !status.isEmailVerified} 
        type="submit"
        style={{marginTop: '15px'}}
      >
        {status.isSubmitting ? "회원가입 중" : "회원가입"}
      </Button>
    </form>
  );
}

export default SignupForm;

const InputButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  width: 100%;

  & > div:first-child {
    flex-grow: 1;
  }

  & > button {
    height: 48px;
    width: 100px;
    margin-bottom: 5px;
    font-size: 14px;
    padding: 0;
  }
`;
