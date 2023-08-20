import React from 'react';
import * as S from './Footer.style';

import InstaImg from '../../../assets/img/icon-insta.svg';
import FacebookImg from '../../../assets/img/icon-fb.svg';
import YoutubeImg from '../../../assets/img/icon-yt.svg';

const Footer = () => {
  return (
    <S.WrapperFooter>
      <S.ContainerDiv>
        <S.LinkSection>
          <S.LinkUl>
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
          </S.LinkUl>
          <S.LinkBtnUl>
            <li>
              <a href="#">
                <img src={InstaImg} alt="인스타 이미지" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={FacebookImg} alt="페이스북 이미지" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={YoutubeImg} alt="유튜브 이미지" />
              </a>
            </li>
          </S.LinkBtnUl>
        </S.LinkSection>

        <S.AboutSection>
          <strong>(주)HODU SHOP</strong>
          <br />
          제주특별자치도 제주시 동광고 137 제주코딩베이스캠프 <br />
          사업자 번호 : 000-0000-0000 | 통신판매업
          <br />
          대표 : 김호두
        </S.AboutSection>
      </S.ContainerDiv>
    </S.WrapperFooter>
  );
};
export default Footer;
