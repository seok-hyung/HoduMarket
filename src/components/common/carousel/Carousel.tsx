import React, { useState } from 'react';
import { styled } from 'styled-components';
import PrevImg from '../../../assets/img/icon-swiper-1.svg';
import NextImg from '../../../assets/img/icon-swiper-2.svg';
import { CarouselProps } from 'model/market';

const CarouselContainerDiv = styled.div`
  position: relative;
  width: 100vw;
  height: 500px;
  /* transition: all 1s; */
  /* transform: translateX(-100vw); */
  background: #f2f2f2;
  display: flex;
`;

const CarouselImg = styled.img`
  margin-left: 50%;
  transform: translate(-50%, 0);
`;

const LeftIconImg = styled.img`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translate(0, -50%);
  cursor: pointer;
`;

const RightIconImg = styled.img`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translate(0, -50%);
  cursor: pointer;
`;

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
      <CarouselContainerDiv>
        <CarouselImg src={images[currentIndex]} alt="캐러셀 이미지" />
        <LeftIconImg onClick={goToPrevSlide} src={PrevImg} alt="좌측 이동 화살표" />
        <RightIconImg onClick={goToNextSlide} src={NextImg} alt="우측 이동 화살표" />
      </CarouselContainerDiv>
    </>
  );
};

export default Carousel;
