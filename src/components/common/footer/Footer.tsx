import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <WrapperFooter>
      <div className="container-box">
        <LinkSection>
          <ul className="link-ul">
            <li>
              <a href="#">호두샵 소개</a>
            </li>
            <li>
              <a href="#">이용약관</a>
            </li>
            <li>
              <a href="#">개인정보처리방침</a>
            </li>
            <li>
              <a href="#">전자금융거래약관</a>
            </li>
            <li>
              <a href="#">청소년보호정책</a>
            </li>
            <li>
              <a href="#">제휴문의</a>
            </li>
          </ul>
          <ul className="link-btn-ul">
            <li>
              <a href="#">
                <img src={'/assets/icon-insta.svg'} alt="인스타 이미지" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={'/assets/icon-fb.svg'} alt="페이스북 이미지" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={'/assets/icon-yt.svg'} alt="유튜브 이미지" />
              </a>
            </li>
          </ul>
        </LinkSection>

        <AboutSection>
          <strong>(주)HODU SHOP</strong>
          <br />
          제주특별자치도 제주시 동광고 137 제주코딩베이스캠프 <br />
          사업자 번호 : 000-0000-0000 | 통신판매업
          <br />
          대표 : 김호두
        </AboutSection>
      </div>
    </WrapperFooter>
  );
};
export default Footer;

const WrapperFooter = styled.footer`
  background-color: #f2f2f2;
  padding: 40px 320px;
  .container-box {
    max-width: 1800px;
    font-size: 14px;
    font-weight: 400;
    margin: 0 auto;
  }
`;
const LinkSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
  .link-ul {
    display: flex;
    color: black;
    min-width: fit-content;
    gap: 14px;
    font-size: 20px;
    li {
      padding: 0 14px 0 0;
      position: relative;
      min-width: fit-content;

      &:not(:last-child)::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        border-right: 1px solid black;
      }
    }
  }
  .link-btn-ul {
    display: flex;
    gap: 14px;
    img {
      width: 40px;
      height: 40px;
    }
  }
`;

const AboutSection = styled.section`
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
