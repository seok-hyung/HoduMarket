import React, { useState } from 'react';
import * as S from './Carousel.style';

import PrevImg from '../../../assets/img/icon-swiper-1.svg';
import NextImg from '../../../assets/img/icon-swiper-2.svg';
import { CarouselProps } from 'model/market';

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };
  const goToPrevSlide = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
  };
  return (
    <>
      <S.CarouselContainerDiv>
        <S.CarouselImg src={images[currentIndex]} alt="캐러셀 이미지" />
        <S.LeftIconImg onClick={goToPrevSlide} src={PrevImg} alt="좌측 이동 화살표" />
        <S.RightIconImg onClick={goToNextSlide} src={NextImg} alt="우측 이동 화살표" />
      </S.CarouselContainerDiv>
    </>
  );
};

export default Carousel;
