import styled from 'styled-components';
import userIcon from '../../assets/icons/usericon.svg'

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UserName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: var(--color-text);
`;

const UserEmail = styled.span`
  font-size: 16px;
  color: var(--color-gray-600);
`;

export default function ProfileSection({ nickName, email }) {
  return (
    <Section>
      <img src={userIcon} alt="유저 프로필" />
      <UserInfo>
        <UserName>{nickName}</UserName>
        <UserEmail>{email}</UserEmail>
      </UserInfo>
    </Section>
  );
}