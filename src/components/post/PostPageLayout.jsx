import PrimaryHeader from "../header/PrimaryHeader";

// import PostSection from "../components/Post/PostSection";

import styled from "styled-components";

export default function PostPageLayout({ postHeader, children }) {
  return (
    <Container>
      <PrimaryHeader />
      {postHeader}
      <MainWrapper>
        {children}
      </MainWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--color-gray-50);
  overflow: hidden;
`;

const MainWrapper = styled.main`
  display: flex;
  flex: 1;
  gap: 10px;
  padding: 10px;
  min-height: 0;
  overflow: hidden;
`;