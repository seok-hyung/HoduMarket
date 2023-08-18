import { styled } from 'styled-components';

export const ProductWrapperDiv = styled.div`
  margin: 80px 320px;
`;
export const ProductContainerUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 80px;
  justify-content: center;
  max-width: 1800px;
  margin: auto;
`;

export const ProductLi = styled.li`
  /* flex-basis: calc(33.33% - 60px); */
  width: 450px;
  min-width: 450px;
  max-width: 450px;
  margin-bottom: 80px;
  cursor: pointer;
`;

export const ProductImg = styled.img`
  width: 100%;
  height: 320px;
  /* object-fit: contain; 이미지를 상자에 맞추어 조절 */
`;
export const StoreNameP = styled.p`
  /* 가게 이름에 대한 스타일 */
  color: var(--sub-text-color);
  font-size: 16px;
  margin: 16px 0 10px 0;
`;
export const ProductNameH2 = styled.h2`
  font-size: 18px; /* 제품 이름에 대한 스타일 */
  color: var(--main-text-color);
  margin-bottom: 10px;
`;
export const ProductPriceP = styled.p`
  font-size: 24px; /* 제품 가격에 대한 스타일 */
  font-weight: bold;
  color: var(--main-text-color);
`;
export const WonSpan = styled.span`
  font-weight: normal;
  font-size: 16px;
`;
