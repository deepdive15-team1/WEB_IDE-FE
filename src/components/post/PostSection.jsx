import styled from "styled-components";

export default function PostSection({ title, descript, children }) {
  return (
    <Contrainer>
      <TitleWrapper>
        <Title>{title}</Title>
        <Descript>{descript}</Descript>
      </TitleWrapper>
      
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </Contrainer>
  );
}

const Contrainer = styled.section`
  flex: 1;
  background-color: var(--color-bg);
  border: 2px solid var(--color-gray-200);
  border-radius: 12px;
  padding: 16px;
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

`;