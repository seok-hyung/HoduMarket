import { MemberTypeProps, SelectedType } from 'model/market';
import React, { useState } from 'react';
import { styled } from 'styled-components';

const MemberType = ({
  buyerBtnText,
  sellerBtnText,
  handleTypeChange,
}: MemberTypeProps) => {
  const [selectedType, setSelectedType] = useState('BUYER');
  // const [loginState, setLoginState] = useState({
  //   id: '',
  //   password: '',
  //   memberType: 'BUYER',
  // });

  const handleInternalTypeChange = (type: 'BUYER' | 'SELLER') => {
    setSelectedType(type);
    handleTypeChange(type);
  };

  return (
    <div className="login-memberType-box">
      <MemberTypeBtn
        onClick={() => handleInternalTypeChange('BUYER')}
        selected={selectedType === 'BUYER'}
      >
        {buyerBtnText}
      </MemberTypeBtn>
      <MemberTypeBtn
        onClick={() => handleInternalTypeChange('SELLER')}
        selected={selectedType === 'SELLER'}
      >
        {sellerBtnText}
      </MemberTypeBtn>
    </div>
  );
};

const MemberTypeBtn = styled.button<SelectedType>`
  width: 275px;
  padding: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #c4c4c4;

  &:first-child {
    border-right: 2px solid #c4c4c4;
  }
  font-size: 18px;
  line-height: 22px;
  font-weight: 700;

  border-bottom: ${(props) => (props.selected ? 'none' : '1px solid #C4C4C4')};
  background-color: ${(props) => (props.selected ? '#FFF' : '#F2F2F2')};
`;

export default MemberType;
