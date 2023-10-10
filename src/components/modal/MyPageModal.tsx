import { logOutAPI } from 'api/login/logoutAPI';
import { userTokenState } from 'atoms/Atoms';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

const MyPageModal = () => {
  const setUserToken = useSetRecoilState(userTokenState);

  const handleLogout = async () => {
    await logOutAPI();
    setUserToken(null);
    window.location.reload();
  };
  return (
    <ModalUl>
      <li>마이페이지</li>
      <li onClick={handleLogout}>로그아웃</li>
    </ModalUl>
  );
};
const ModalUl = styled.ul`
  /* box-sizing: border-box; */
  position: absolute;
  background-color: #ffff;
  top: 120px;
  right: -30px;
  width: 200px;
  z-index: 10;
  font-size: 22px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 10px;
  color: var(--sub-text-color);
  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);

    border-left: 13px solid transparent;
    border-right: 13px solid transparent;

    /* 삼각형 높이 조절 */
    top: -15px;
    border-bottom: 15px solid #ffff;
  }
  li {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    padding: 20px;
    cursor: pointer;
    &:last-of-type {
      margin-bottom: 0;
    }
    &:hover {
      border: 0.1px solid black;
      padding: 20px;
      font-weight: bold;
      color: black;
      border-radius: 10px;
    }
  }
`;

export default MyPageModal;
