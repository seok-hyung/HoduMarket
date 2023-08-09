import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavLogoImg from '../../assets/img/Logo-hodu.png';
import NavSearchImg from '../../assets/img/icon-search.svg';
import NavShoppingcartImg from '../../assets/img/icon-shopping-cart.svg';
import NavUserImg from '../../assets/img/icon-user.svg';
import * as S from './Nav.style';
const Nav: React.FC = () => {
  const navigate = useNavigate();
  return (
    <S.WrapperDiv className="wrapper-nav">
      <S.WrapperNav>
        <S.LogoDiv className="logo-container">
          <S.LogoImg
            onClick={() => {
              navigate('/');
            }}
            src={NavLogoImg}
            alt="메인로고"
          />
          <S.SearchInput type="text" placeholder="상품을 검색해보세요!" />
          <S.SearchImg src={NavSearchImg} alt="검색 이미지" />
        </S.LogoDiv>

        <S.NavListUl className="nav-right-list">
          <S.NavListLi>
            <S.NavListImg src={NavShoppingcartImg} alt="장바구니 이미지" />
            <S.NavListP>장바구니</S.NavListP>
          </S.NavListLi>
          <S.NavListLi>
            <S.NavListImg src={NavUserImg} alt="유저 이미지" />
            <S.NavListP>로그인</S.NavListP>
          </S.NavListLi>
        </S.NavListUl>
      </S.WrapperNav>
    </S.WrapperDiv>
  );
};

export default Nav;
