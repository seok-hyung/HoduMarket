import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { imgList, Image } from './ImgList';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images: Image[] = imgList;

  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };
  const goToPrevSlide = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
  };

  // 5초마다 다음 이미지를 자동으로 보여주기
  useEffect(() => {
    const slideShow = setInterval(goToNextSlide, 5000);
    return () => clearInterval(slideShow);
  }, [currentIndex]);

  return (
    <>
      <CarouselContainerDiv>
        <div className="circle left">
          <img
            className="icon"
            onClick={goToPrevSlide}
            src="/assets/icon-swiper-1.png"
            alt="좌측 이동 화살표"
          />
        </div>
        <div className="img-container">
          {images.map((img, index) => (
            <CarouselImg
              index={index}
              currentIndex={currentIndex}
              key={img.id}
              src={img.url}
              alt="캐러셀 이미지"
            />
          ))}
        </div>
        <div className="circle right">
          <img
            className="icon"
            onClick={goToNextSlide}
            src="/assets/icon-swiper-2.png"
            alt="우측 이동 화살표"
          />
        </div>
      </CarouselContainerDiv>
    </>
  );
};

export default Carousel;

const CarouselContainerDiv = styled.div`
  margin-top: 7px;
  position: relative;
  display: flex;
  height: 600px;
  .circle {
    position: absolute;
    z-index: 10;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 115px;
    height: 115px;
    border-radius: 50%;
    background-color: #c4c4c4;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    .icon {
      min-width: 150px;
      min-height: 150px;
    }
  }
  .circle:hover {
    background-color: white;
  }
  .circle:active {
    background-color: #eee;
  }
  .circle.left {
    left: 80px;
  }
  .circle.right {
    right: 80px;
  }

  .img-container {
    position: relative;
    width: 100vw;
    overflow: hidden;
    .carouselImg {
    }
  }
`;

type CarouselImgProps = {
  index: number;
  currentIndex: number;
};

const CarouselImg = styled.img<CarouselImgProps>`
  position: absolute;
  transform: ${(props) => `translateX(${(props.index - props.currentIndex) * 100}%)`};
  transition: transform ease-out 0.5s;
`;
