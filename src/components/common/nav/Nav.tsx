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

const Nav = ({ setSearchValue }: any) => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const userType = useRecoilValue(userTypeState);
  const [isMyPageModalState, setIsMyPageModalState] = useState(false);
  const [isCartModalState, setIsCartModalState] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  useEffect(() => {
    setUserToken(userToken);
  }, []);

  const handleInputChange = (e: any) => {
    setSearchInputValue(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      setSearchValue(e.target.value.toLowerCase());
    }
  };

  const handleCloseModal = () => {
    setIsCartModalState(false);
  };
  const handleConfirmModal = () => {
    setIsCartModalState(false);
    navigate('/login');
  };
  const renderMenuItems = () => {
    if (!userToken) {
      return (
        <>
          <MenuItem
            onClick={() => setIsCartModalState(true)}
            src="/assets/icon-shopping-cart.svg"
            alt="장바구니 이미지"
            text="장바구니"
          />
          <MenuItem
            onClick={() => navigate('/login')}
            src="/assets/icon-user.svg"
            alt="유저 이미지"
            text="로그인"
          />
        </>
      );
    }

    if (userType === 'BUYER') {
      return (
        <>
          <MenuItem
            onClick={() => navigate('/cart')}
            src="/assets/icon-shopping-cart.svg"
            alt="장바구니 이미지"
            text="장바구니"
          />
          <li
            className="listLi mypage"
            onClick={() => setIsMyPageModalState(!isMyPageModalState)}
          >
            <img
              className="navImg"
              src="/assets/icon-user.svg"
              alt="로그인된 유저 이미지"
            />
            <p>마이페이지</p>
            {isMyPageModalState && <MyPageModal />}
          </li>
        </>
      );
    }

    if (userType === 'SELLER') {
      return (
        <>
          <li
            className="listLi mypage"
            onClick={() => setIsMyPageModalState(!isMyPageModalState)}
          >
            <img
              className="navImg"
              src="/assets/icon-user.svg"
              alt="로그인된 유저 이미지"
            />
            <p>마이페이지</p>
            {isMyPageModalState && <MyPageModal />}
          </li>
          <li className="shoppingBagLi" onClick={() => navigate('/seller-center')}>
            <img src="/assets/icon-shopping-bag.png" alt="판매자 센터 이미지" />
            <p>판매자센터</p>
          </li>
        </>
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
          <input
            className="searchInput"
            type="text"
            placeholder="상품을 검색해보세요!"
            value={searchInputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <img
            className="searchImg"
            src="/assets/icon-search.svg"
            alt="검색 이미지"
            onClick={() => {
              setSearchValue(searchInputValue.toLowerCase());
            }}
          />
        </div>
        <ul className="listUl">{renderMenuItems()}</ul>
        {isCartModalState && (
          <div className="modalOverlay" onClick={handleCloseModal}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <img
                src="assets/icon-delete.svg"
                alt="삭제(X) 아이콘"
                onClick={() => {
                  setIsCartModalState(false);
                }}
              />
              <p>로그인이 필요한 서비스입니다.</p>
              <p>로그인 하시겠습니까?</p>
              <button onClick={handleCloseModal}>아니오</button>
              <button onClick={handleConfirmModal}>예</button>
            </div>
          </div>
        )}
      </nav>
    </WrapperDiv>
  );
};

export default Nav;

const WrapperDiv = styled.nav`
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  width: 100%;
  .wrapperNav {
    max-width: 1300px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    padding: 15px 0px;

    .logoBoxDiv {
      display: flex;
      gap: 20px;
      align-items: center;
      position: relative;

      .logoImg {
        width: 100px;
        object-fit: contain;
      }
      .searchInput {
        width: 450px;
        padding: 8px 15px;
        outline: none;
        font-size: 18px;
        display: flex;
        background: #ffffff;
        border: 3px solid var(--main-color);
        border-radius: 50px;
      }
      .searchImg {
        position: absolute;
        width: 25px;
        top: 0;
        right: 18px;
        cursor: pointer;
      }
    }
    .listUl {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      gap: 0px;
    }
    .listLi {
      display: flex;
      width: 100px;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      .navImg {
        width: 25px;
        margin-bottom: 3px;
      }
      p {
        font-size: 14px;
      }
    }
    .listLi.mypage {
      position: relative;
    }
    .shoppingBagLi {
      width: 120px;
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
    .modalContent {
      width: 600px;
      background: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      p {
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 15px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
      button {
        width: 180px;
        margin-top: 30px;
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 24px;
        &:first-of-type {
          border: 1px var(--sub-text-color) solid;
          margin-right: 15px;
        }
        &:last-of-type {
          border: none;
          background-color: var(--main-color);
          color: white;
        }
      }
      img {
        position: absolute;
        top: -70px;
        right: 20px;
        width: 30px;
        cursor: pointer;
      }
    }
  }
`;
