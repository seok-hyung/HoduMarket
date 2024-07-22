import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SellerNav = () => {
  const navigate = useNavigate();
  return (
    <WrapperDiv>
      <nav className="wrapperNav">
        <img
          onClick={() => {
            navigate('/');
          }}
          src="/assets/Logo-hodu.png"
          alt="메인로고"
        />
        <p>판매자 센터</p>
      </nav>
    </WrapperDiv>
  );
};

export default SellerNav;

const WrapperDiv = styled.nav`
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  .wrapperNav {
    max-width: 90vw;
    display: flex;
    margin: 0 auto;
    padding: 26px 0px;
    gap: 30px;
    img {
      width: 150px;
    }
    p {
      font-size: 34px;
      font-weight: bold;
      line-height: 40px;
      display: flex;
      align-items: center;
    }
  }
`;
