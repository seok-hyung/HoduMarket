import { logOutAPI } from 'api/login/logoutAPI';
import { userTokenState } from 'atoms/Atoms';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

const MyPageModal = () => {
  const setUserToken = useSetRecoilState(userTokenState);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logOutAPI();
    setUserToken(null);
    window.location.reload();
    navigate('/');
  };
  return (
    <ModalUl>
      <li>마이페이지</li>
      <li onClick={handleLogout}>로그아웃</li>
    </ModalUl>
  );
};
const ModalUl = styled.ul`
  position: absolute;
  background-color: #ffff;
  width: 120px;
  top: 80px;
  right: 0px;
  z-index: 10;
  font-size: 16px;
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
    padding: 10px;
    cursor: pointer;
    &:last-of-type {
      margin-bottom: 0;
    }
    &:hover {
      border: 0.1px solid black;
      padding: 10px;
      font-weight: bold;
      color: black;
      border-radius: 10px;
    }
  }
`;

export default MyPageModal;
