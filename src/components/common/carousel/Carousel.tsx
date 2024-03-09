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
    <CarouselContainerDiv>
      <div className="circle left">
        <img
          className="icon"
          onClick={goToPrevSlide}
          src="/assets/chevron-left.svg"
          alt="좌측 이동 화살표"
        />
      </div>
      <div className="img-container">
        {images.map((img, index) => (
          <CarouselImg
            index={index}
            key={img.id}
            src={img.url}
            alt="캐러셀 이미지"
            $currentIndex={currentIndex}
          />
        ))}
      </div>
      <div className="circle right">
        <img
          className="icon"
          onClick={goToNextSlide}
          src="/assets/chevron-right.svg"
          alt="우측 이동 화살표"
        />
      </div>
    </CarouselContainerDiv>
  );
};

export default Carousel;

const CarouselContainerDiv = styled.div`
  margin-top: 3px;
  position: relative;
  display: flex;
  height: 350px;
  width: 100%;
  .circle {
    position: absolute;
    z-index: 10;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #e9e9ec;
    box-shadow:
      rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    .icon {
      max-width: 40px;
    }
  }
  .circle:hover {
    background-color: #f0f0f3;
  }
  .circle:active {
    background-color: white;
  }
  .circle.left {
    left: 50px;
  }
  .circle.right {
    right: 50px;
  }
  .img-container {
    position: relative;
    width: 100vw;
    overflow: hidden;
  }
`;

type CarouselImgProps = {
  index: number;
  $currentIndex: number;
};

const CarouselImg = styled.img<CarouselImgProps>`
  position: absolute;
  object-fit: cover;

  transform: ${(props) => `translateX(${(props.index - props.$currentIndex) * 100}%)`};
  transition: transform ease-out 0.5s;
`;
