import styled from 'styled-components';

const TabContainer = styled.div`
  background-color: var(--color-gray-50);
  padding: 4px; 
  border-radius: 9999px;
  display: inline-flex; 
  width: fit-content; 
  gap: 4px;
`;

const TabButton = styled.button`
  border: none;
  background: ${props => props.$active ? 'var(--color-white)' : 'transparent'};

  color: ${props => props.$active ? 'var(--color-text)' : 'var(--color-gray-600)'};
  
  font-weight: ${props => props.$active ? '600' : '500'};
  padding: 8px 24px; 
  border-radius: 9999px; 
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.$active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};
  font-size: 14px;

  &:hover {
    color: var(--color-text);
  }
`;

export default function TabMenu({ activeTab, onTabChange, stats }) {
  const tabs = [
    { key: 'ALL', label: '전체', count: stats.total },
    { key: 'OPEN', label: '진행중', count: stats.ongoing },
    { key: 'COMPLETED', label: '완료', count: stats.completed },
  ];

  return (
    <TabContainer>
      {tabs.map((tab) => (
        <TabButton 
          key={tab.key}
          $active={activeTab === tab.key} 
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label} ({tab.count})
        </TabButton>
      ))}
    </TabContainer>
  );
}