import styled from 'styled-components';
import calendar from '../../assets/calendar.svg'
import time from '../../assets/icons/time.svg'
import myPagecheck from '../../assets/icons/mypagecheck.svg'

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const StatsCard = styled.div`
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StatsLabel = styled.span`
  font-size: 14px; 
  color: var(--color-gray-600);
`;

const StatsValue = styled.span`
  font-size: 32px; 
  font-weight: 600; 
  color: var(--color-text);
`;

const StatsDesc = styled.div`
  display: flex;
  align-items: center;
  gap: 6px; 
  font-size: 14px; 
  color: var(--color-gray-600);
`;

const IconImage = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

export default function StatsSection({ stats }) {
  const statItems = [
    { label: '전체 게시글', value: stats.total, icon: calendar, desc: '작성한 게시글' },
    { label: '진행중', value: stats.ongoing, icon: time, desc: '리뷰 대기중' },
    { label: '완료', value: stats.completed, icon: myPagecheck, desc: '리뷰 완료' },
  ];

  return (
    <StatsGrid>
      {statItems.map((item) => (
        <StatsCard key={item.label}>
          <StatsLabel>{item.label}</StatsLabel>
          <StatsValue>{item.value}</StatsValue>
          <StatsDesc>
            <IconImage src={item.icon} alt={item.label} />
            {item.desc}
          </StatsDesc>
        </StatsCard>
      ))}
    </StatsGrid>
  );
}