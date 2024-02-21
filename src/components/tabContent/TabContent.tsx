import React, { useState } from 'react';
import { Tab } from 'model/market';
import { styled } from 'styled-components';

const TabContent = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex: any) => {
    setActiveTab(tabIndex);
  };

  const tabs: Tab[] = [
    { title: '상세 정보', content: <div>상품 상세 정보입니다</div> },
    { title: '리뷰', content: <div>리뷰 정보입니다.</div> },
    { title: 'Q&A', content: <div>Q&A 정보입니다</div> },
    { title: '반품/교환정보', content: <div>반품 교환 정보입니다</div> },
  ];

  return (
    <>
      <TabButtonsDiv>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={activeTab === index ? 'active' : ''}
          >
            {tab.title}
          </button>
        ))}
      </TabButtonsDiv>
      <TabContentDiv>{tabs[activeTab].content}</TabContentDiv>
    </>
  );
};

export default TabContent;

const TabButtonsDiv = styled.div`
  width: 100%;
  max-width: 1300px;
  button {
    background-color: white;
    width: 25%;
    min-width: fit-content;
    font-size: 20px;
    margin-bottom: 40px;
    border-bottom: 12px solid #e0e0e0;
    padding: 15px 0;
  }
  button.active {
    border-bottom: 12px solid var(--main-color);
  }
`;
const TabContentDiv = styled.div`
  text-align: left;
  font-size: 20px;
`;
