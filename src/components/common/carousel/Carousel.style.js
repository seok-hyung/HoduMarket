import { styled } from 'styled-components';

export const CarouselContainerDiv = styled.div`
  position: relative;
  width: 100vw;
  height: 500px;
  /* transition: all 1s; */
  /* transform: translateX(-100vw); */
  background: #f2f2f2;
  display: flex;
`;

export const CarouselImg = styled.img`
  margin-left: 50%;
  transform: translate(-50%, 0);
`;

export const LeftIconImg = styled.img`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translate(0, -50%);
  cursor: pointer;
`;

export const RightIconImg = styled.img`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translate(0, -50%);
  cursor: pointer;
`;
