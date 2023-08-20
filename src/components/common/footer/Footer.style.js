import styled from 'styled-components';

export const WrapperFooter = styled.footer`
  background-color: #f2f2f2;
  padding: 40px 320px;
`;
export const ContainerDiv = styled.div`
  max-width: 1800px;
  font-size: 14px;
  font-weight: 400;
  margin: 0 auto;
`;
export const LinkSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
`;
export const LinkUl = styled.ul`
  display: flex;
  color: black;
  min-width: fit-content;
  gap: 14px;
  font-size: 20px;
  li {
    padding: 0 14px 0 0;
    position: relative;

    &:not(:last-child)::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      border-right: 1px solid black;
    }
  }
  /* li:not(:last-child) {
    border-right: 1px solid #000;
    padding-right: 14px;
  }
  li:not(:first-child) {
    padding-left: 14px;
  } */
`;
export const AboutSection = styled.section`
  border-top: 1px solid #c4c4c4;
  padding-top: 20px;
  font-size: 20px;
  letter-spacing: 3px;
  color: #767676;
  line-height: 24px;

  strong {
    font-weight: 700;
  }
`;

export const LinkBtnUl = styled.ul`
  display: flex;
  gap: 14px;
  img {
    width: 40px;
    height: 40px;
  }
`;
