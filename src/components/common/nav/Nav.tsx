import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userTokenState, userTypeState } from 'atoms/Atoms';
import MyPageModal from 'components/modal/MyPageModal';

const MenuItem = ({ onClick, src, alt, text }: any) => (
  <li className="listLi" onClick={onClick}>
    <img className="navImg" src={src} alt={alt} />
    <p>{text}</p>
  </li>
);

const Nav = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const userType = useRecoilValue(userTypeState);
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setUserToken(userToken);
  }, []);

  const renderMenuItems = () => {
    if (userType === 'BUYER') {
      return (
        <MenuItem
          onClick={() => navigate('/cart')}
          src="/assets/icon-shopping-cart.png"
          alt="장바구니 이미지"
          text="장바구니"
        />
      );
    }
    if (userToken) {
      return (
        <li className="listLi mypage" onClick={() => setModalOpen(!isModalOpen)}>
          <img
            className="navImg"
            src="/assets/icon-user.svg"
            alt="로그인된 유저 이미지"
          />
          <p>마이페이지</p>
          {isModalOpen && <MyPageModal />}
        </li>
      );
    }

    if (userType === 'SELLER') {
      return (
        <li className="shoppingBagLi" onClick={() => navigate('/seller-center')}>
          <img src="/assets/icon-shopping-bag.png" alt="판매자 센터 이미지" />
          <p>판매자센터</p>
        </li>
      );
    }

    if (!userToken) {
      return (
        <MenuItem
          onClick={() => navigate('/login')}
          src="/assets/icon-user.svg"
          alt="유저 이미지"
          text="로그인"
        />
      );
    }
  };
  return (
    <WrapperDiv>
      <nav className="wrapperNav">
        <div className="logoBoxDiv">
          <img
            className="logoImg"
            onClick={() => {
              navigate('/');
            }}
            src="/assets/Logo-hodu.png"
            alt="메인로고"
          />
          <input className="searchInput" type="text" placeholder="상품을 검색해보세요!" />
          <img className="searchImg" src="/assets/icon-search.svg" alt="검색 이미지" />
        </div>
        <ul className="listUl">{renderMenuItems()}</ul>
      </nav>
    </WrapperDiv>
  );
};

export default Nav;

const WrapperDiv = styled.nav`
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  .wrapperNav {
    max-width: 65vw;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    padding: 26px 0px;

    .logoBoxDiv {
      width: 700px;
      display: flex;
      gap: 50px;
      align-items: center;
      position: relative;

      .logoImg {
        width: 200px;
        object-fit: contain;
      }
      .searchInput {
        width: 100%;
        height: 100%;
        padding: 0 30px;
        outline: none;
        font-size: 25px;
        display: flex;
        background: #ffffff;
        border: 4px solid var(--main-color);
        border-radius: 50px;
      }
      .searchImg {
        position: absolute;
        width: 36px;
        top: 0;
        right: 30px;
        cursor: pointer;
      }
    }
    .listUl {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      max-width: 450px;
      gap: 15px;
      position: relative;
    }
    .listLi {
      display: flex;
      width: 120px;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      .navImg {
        width: 50px;
        margin-bottom: 5px;
      }
      p {
        font-size: 20px;
      }
    }
    .listLi.mypage {
      position: relative;
    }
    .shoppingBagLi {
      width: 168px;
      border-radius: 5px;
      background-color: var(--main-color);
      color: white;
      display: flex;
      gap: 8px;
      font-size: 24px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        width: 32px;
        height: 32px;
      }
      p {
      }
    }
  }
`;
