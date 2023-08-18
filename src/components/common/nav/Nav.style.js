import { styled } from 'styled-components';

export const WrapperDiv = styled.nav`
  width: 100%;
`;

export const WrapperNav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 26px 0px;
  max-width: 1500px;
  margin: 0 auto;
  /* box-shadow: inset 0 0 0 5px red; */
`;

export const LogoDiv = styled.div`
  width: 700px;
  display: flex;
  align-items: center;
  position: relative;
  /* box-shadow: inset 0 0 0 5px red; */
`;

export const LogoImg = styled.img`
  width: 200px;
  object-fit: contain;
`;

export const SearchInput = styled.input`
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

export const SearchImg = styled.img`
  position: absolute;
  width: 28px;
  height: 28px;
  right: 22px;
  top: 22px;
  cursor: pointer;
`;

export const NavListUl = styled.ul`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 450px;
  gap: 15px;
  /* box-shadow: inset 0 0 0 5px red; */
`;

export const NavListLi = styled.li`
  display: flex;
  width: 120px;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  /* box-shadow: inset 0 0 0 5px blue; */
`;

export const NavListP = styled.p`
  font-size: 20px;
`;

export const NavListImg = styled.img`
  width: 50px;
  margin-bottom: 5px;
`;
