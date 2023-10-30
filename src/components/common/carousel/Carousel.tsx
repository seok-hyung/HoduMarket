import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % imgList.length;
    setCurrentIndex(nextIndex);
  };
  const goToPrevSlide = () => {
    const prevIndex = (currentIndex - 1 + imgList.length) % imgList.length;
    setCurrentIndex(prevIndex);
  };

  // 5초마다 다음 이미지를 자동으로 보여주기
  useEffect(() => {
    const slideShow = setInterval(goToNextSlide, 5000);
    return () => clearInterval(slideShow);
  }, [currentIndex]);

  const imgList = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1587731556938-38755b4803a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2978&q=80',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1508272849285-ec94ff3855e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1543622748-5ee7237e8565?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1603917745459-0078218e7c5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1680059439144-aefe88d4c858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3024&q=80',
    },
  ];
  return (
    <>
      <CarouselContainerDiv>
        <img
          className="icon circle left"
          onClick={goToPrevSlide}
          src="/assets/icon-swiper-1.svg"
          alt="좌측 이동 화살표"
        />
        <div className="img-container">
          {imgList.map((img, index) => (
            <img
              className="carouselImg"
              key={img.id}
              src={img.url}
              alt="캐러셀 이미지"
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`,
                transition: 'transform ease-out .5s',
              }}
            />
          ))}
        </div>
        <img
          className="icon circle right"
          onClick={goToNextSlide}
          src="/assets/icon-swiper-2.svg"
          alt="우측 이동 화살표"
        />
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
  background: #f2f2f2;
  .icon {
    width: 110px;
    height: 110px;
    position: absolute;
    z-index: 10;
    top: 50%;
    transform: translate(0, -50%);
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
  .icon:hover {
    background-color: white;
  }
  .icon:active {
    background-color: #eee;
  }
  .circle {
    border-radius: 50%;
    background-color: #c4c4c4;
  }
  .icon.left {
    left: 80px;
  }
  .icon.right {
    right: 80px;
  }

  .img-container {
    position: relative;
    width: 100vw;
    overflow: hidden;
    .carouselImg {
      position: absolute;
    }
  }
`;
const ArrowIcon = styled.img`
  width: 110px;
  height: 110px;
`;
