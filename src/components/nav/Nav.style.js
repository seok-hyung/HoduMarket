import { styled } from 'styled-components';

export const WrapperDiv = styled.nav`
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
`;

export const WrapperNav = styled.nav`
  display: flex;
  padding: 20px 0px;
  margin: 0 320px;
  justify-content: space-between;
`;

export const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const LogoImg = styled.img`
  width: 130px;
`;

export const SearchImg = styled.img`
  position: absolute;
  width: 24px;
  height: 28px;
  right: 22px;
  top: 14px;
  cursor: pointer;
`;

export const SearchInput = styled.input`
  width: 400px;
  height: 46px;
  font-size: 16px;
  font-weight: 400;
  font-size: 16px;
  color: #767676;
  margin-left: 30px;
  padding: 20px;

  background: #ffffff;
  border: 2px solid #21bf48;
  border-radius: 50px;
`;

export const NavListUl = styled.ul`
  display: flex;
  align-items: center;
`;

export const NavListLi = styled.li`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const NavListP = styled.p`
  margin-top: 5px;
`;

export const NavListImg = styled.img`
  width: 30px;
`;
