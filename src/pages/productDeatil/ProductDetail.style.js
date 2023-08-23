import { styled } from 'styled-components';

export const DetailWrapperDiv = styled.div`
  margin: 80px 320px;
  .product-img {
    width: 600px;
    height: 600px;
  }
`;

export const DetailContainerDiv = styled.div`
  display: flex;
  margin-bottom: 140px;
`;
export const DetailRightDiv = styled.div`
  margin-left: 50px;
  font-size: 28px;
  width: 630px;
  height: 600px;
  .info {
    margin-bottom: 16px;
    font-size: 18px;
  }
  .name {
    font-size: 32px;
    line-height: 45px;
    margin-bottom: 20px;
  }
  .price {
    display: inline-block;
    font-size: 36px;
    margin-bottom: 138px;
    font-weight: 700;
    line-height: 45px;
  }
  .deliveryInfo {
    margin-bottom: 20px;
    font-size: 20px;
  }
  .amount {
    width: 150px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 3px solid #c4c4c4;
    border-radius: 5px;
    margin: 30px 0;

    img {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
  }
  hr {
    width: 630px;
    border: 2px solid #c4c4c4;
  }

  .total-price {
    display: flex;
    justify-content: space-between;
    margin: 30px 0 32px 0;
    width: 630px;

    .price-info {
      line-height: 23px;
      min-width: fit-content;
    }
    .total-amount {
      font-weight: 400;
      line-height: 23px;
      min-width: fit-content;
    }
    .total-amount-span {
      color: var(--main-color);
    }
    .total-price-span {
      color: var(--main-color);
      font-style: normal;
      font-weight: 700;
    }
  }
  .detail-btn {
    display: flex;
    height: 60px;
    .buy {
      flex-basis: 66%;
      border: none;
      background: var(--main-color);
      border-radius: 5px;
      color: white;
      font-size: 20px;
      margin-right: 14px;
    }
    .shop-bag {
      flex-basis: 33%;
      background: #767676;
      border-radius: 5px;
      color: white;
      font-size: 20px;
      border: none;
    }
  }
`;
