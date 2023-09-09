import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './ProductDetail.style';
import TabContent from 'components/tabContent/TabContent';

const ProductDetail = () => {
  const location = useLocation();
  const productInfo = location.state?.item;
  const intl = new Intl.NumberFormat();
  let [amount, setAmount] = useState(1);
  let [totalPrice, setTotalPrice] = useState(productInfo.price);

  const handleIncrement = () => {
    setAmount(amount + 1);
  };
  const handleDecrement = () => {
    setAmount(amount - 1);
  };

  return (
    <>
      <S.DetailWrapperDiv>
        <S.DetailContainerDiv>
          <div>
            <img
              className="product-img"
              src={`${productInfo.image}`}
              alt="상세페이지 이미지"
            />
          </div>

          <S.DetailRightDiv>
            <p className="info ">{productInfo.product_info}</p>
            <p className="name">{productInfo.product_name}</p>
            <p className="price">{intl.format(productInfo.price)}</p>
            <span>원</span>
            <p className="deliveryInfo">택배 배송 / 무료배송</p>
            <hr />
            <div className="amount">
              <img onClick={handleDecrement} src="/assets/icon-minus-line.svg" alt="" />
              <div>{amount}</div>
              <img onClick={handleIncrement} src="/assets/icon-plus-line.svg" alt="" />
            </div>
            <hr />
            <div className="total-price">
              <div className="price-info">총 상품 금액</div>
              <div className="total-amount">
                총 수량 <span className="total-amount-span">{amount}</span>개 |
                <span className="total-price-span">
                  {intl.format(totalPrice * amount)}
                </span>
                원
              </div>
            </div>
            <div className="detail-btn">
              <button className="buy">바로 구매</button>
              <button className="shop-bag">장바구니</button>
            </div>
          </S.DetailRightDiv>
        </S.DetailContainerDiv>
        <TabContent />
      </S.DetailWrapperDiv>
    </>
  );
};

export default ProductDetail;
