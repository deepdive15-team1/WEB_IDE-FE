import { PageContainer, AuthCard, LogoSection } from "../../styles/AuthLayout";

const AccountRecoveryLayout = ({
  icon,
  title,
  subtitle,
  children,
  onSubmit,
}) => {
  return (
    <PageContainer>
      <form onSubmit={onSubmit}>
        <AuthCard>
          <LogoSection>
          <img src={icon} alt={icon} />
          <h2>{title}</h2>
          <div>{subtitle}</div>
          </LogoSection>
          {children}
        </AuthCard>
      </form>
    </PageContainer>
  );
};

export default AccountRecoveryLayout;
