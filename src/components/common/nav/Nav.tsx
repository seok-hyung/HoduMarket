import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { userTokenState } from 'atoms/Atoms';
import MyPageModal from 'components/modal/MyPageModal';

const Nav = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setUserToken(userToken);
  }, []);
  return (
    <WrapperDiv className="wrapper-nav">
      <WrapperNav>
        <LogoDiv className="logo-container">
          <LogoImg
            onClick={() => {
              navigate('/');
            }}
            src="/assets/Logo-hodu.png"
            alt="메인로고"
          />
          <SearchInput type="text" placeholder="상품을 검색해보세요!" />
          <SearchImg src="/assets/icon-search.svg" alt="검색 이미지" />
        </LogoDiv>

        <NavListUl className="nav-right-list">
          <NavListLi onClick={() => navigate('/cart')}>
            <NavListImg src="/assets/icon-shopping-cart.svg" alt="장바구니 이미지" />
            <NavListP>장바구니</NavListP>
          </NavListLi>
          {userToken ? (
            <NavListLi onClick={() => setModalOpen(!isModalOpen)}>
              <NavListImg src="/assets/icon-user.svg" alt="로그인된 유저 이미지" />
              <NavListP>마이페이지</NavListP>
            </NavListLi>
          ) : (
            <NavListLi onClick={() => navigate('/login')}>
              <NavListImg src="/assets/icon-user.svg" alt="유저 이미지" />
              <NavListP>로그인</NavListP>
            </NavListLi>
          )}
          {isModalOpen && <MyPageModal />}
        </NavListUl>
      </WrapperNav>
    </WrapperDiv>
  );
};

export default Nav;

const WrapperDiv = styled.nav`
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
`;

const WrapperNav = styled.nav`
  max-width: 65vw;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  padding: 26px 0px;
`;

const LogoDiv = styled.div`
  width: 700px;
  display: flex;
  align-items: center;
  position: relative;
`;

const LogoImg = styled.img`
  width: 200px;
  object-fit: contain;
`;

const SearchInput = styled.input`
  width: 450px;
  height: 60px;
  outline: none;
  font-weight: 400;
  font-size: 25px;
  color: var(--sub-text-color);
  margin-left: 50px;
  padding: 20px;

  background: #ffffff;
  border: 4px solid var(--main-color);
  border-radius: 50px;
`;

const SearchImg = styled.img`
  position: absolute;
  width: 28px;
  height: 28px;
  right: 22px;
  top: 22px;
  cursor: pointer;
`;

const NavListUl = styled.ul`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 450px;
  gap: 15px;
  position: relative;
`;

const NavListLi = styled.li`
  display: flex;
  width: 120px;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const NavListP = styled.p`
  font-size: 20px;
`;

const NavListImg = styled.img`
  width: 50px;
  margin-bottom: 5px;
`;
