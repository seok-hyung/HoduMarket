import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './Nav.style';

const Nav = () => {
  const navigate = useNavigate();
  return (
    <S.WrapperDiv className="wrapper-nav">
      <S.WrapperNav>
        <S.LogoDiv className="logo-container">
          <S.LogoImg
            onClick={() => {
              navigate('/');
            }}
            src="/assets/Logo-hodu.png"
            alt="메인로고"
          />
          <S.SearchInput type="text" placeholder="상품을 검색해보세요!" />
          <S.SearchImg src="/assets/icon-search.svg" alt="검색 이미지" />
        </S.LogoDiv>

        <S.NavListUl className="nav-right-list">
          <S.NavListLi>
            <S.NavListImg src="/assets/icon-shopping-cart.svg" alt="장바구니 이미지" />
            <S.NavListP>장바구니</S.NavListP>
          </S.NavListLi>
          <S.NavListLi
            onClick={() => {
              navigate('/login');
            }}
          >
            <S.NavListImg src="/assets/icon-user.svg" alt="유저 이미지" />
            <S.NavListP>로그인</S.NavListP>
          </S.NavListLi>
        </S.NavListUl>
      </S.WrapperNav>
    </S.WrapperDiv>
  );
};

export default Nav;
