import styled from "styled-components";

export default function PostSection({ title, descript, children }) {
  return (
    <Contrainer>
      <TitleWrapper>
        <Title>{title}</Title>
        <Descript>{descript}</Descript>
      </TitleWrapper>

      <ContentWrapper>{children}</ContentWrapper>
    </Contrainer>
  );
}

const Contrainer = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg);
  border: 2px solid var(--color-gray-200);
  border-radius: 12px;
  padding: 16px;
  min-height: 0;
`;

const TitleWrapper = styled.header`
  dispaly: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 16px;
  color: var(--color-text);
  padding-bottom: 8px;
`;

const Descript = styled.div`
  font-size: 16px;
  color: var(--color-gray-600);
`;

const ContentWrapper = styled.article`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  min-height: 0;
  border: 2px solid blue;
`;