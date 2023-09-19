import { styled } from 'styled-components';

export const CarouselContainerDiv = styled.div`
  margin-top: 3px;
  position: relative;
  width: 100vw;
  height: 500px;
  background: #f2f2f2;
  display: flex;
`;

export const CarouselImg = styled.img`
  margin-left: 50%;
  transform: translate(-50%, 0);
  object-fit: contain;
`;

export const LeftIconImg = styled.img`
  width: 30%;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translate(0, -50%);
  cursor: pointer;
  object-fit: contain;
`;

export const RightIconImg = styled.img`
  width: 30%;
  position: absolute;
  object-fit: contain;
  top: 50%;
  right: 20px;
  transform: translate(0, -50%);
  cursor: pointer;
`;
