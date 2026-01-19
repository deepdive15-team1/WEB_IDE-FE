import styled from "styled-components";
import Chip from "../common/Chip/Chip";

export default function PostSection({ title, descript, children, statusChip }) {
  return (
    <Contrainer>
      <TitleHeaderWrapper>
        <TitleWrapper>
          <Title>{title}</Title>
          <Descript>{descript}</Descript>
        </TitleWrapper>
        {statusChip && statusChip}
      </TitleHeaderWrapper>

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

const TitleHeaderWrapper = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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
  overflow: hidden;
`;