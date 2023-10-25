import Nav from 'components/common/nav/Nav';
import { type } from 'os';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

const Payment = () => {
  const location = useLocation();
  const cartDatas = location.state.cartData;
  const quantityDatas = location.state.quantityData;
  const [totalPrice, setTotalPrice] = useState(0);
  // quantityDatas.find((i: any) => console.log(typeof i.product_id));
  // console.log(quantityDatas);
  // console.log(cartDatas);
  useEffect(() => {
    const total = cartDatas?.reduce((acc: any, item: any) => {
      const quantityItem = quantityDatas.find(
        (data: any) => data.product_id === item.product_id,
      );
      const quantity = quantityItem ? quantityItem.quantity : 0;
      return acc + quantity * item.price + item.shipping_fee;
    }, 0);
    setTotalPrice(total);
  }, [cartDatas, quantityDatas]);
  return (
    <>
      <Nav />
      <PaymentWrapper>
        <h2 className="title">주문 / 결제하기</h2>
        <ul className="tab">
          <li className="productInfo">상품정보</li>
          <li className="discount">할인</li>
          <li className="shippingFee">배송비</li>
          <li className="orderPrice">주문금액</li>
        </ul>
        {cartDatas?.map((item: any, index: any) => {
          const quantityItem = quantityDatas.find(
            (data: any) => data.product_id === item.product_id,
          );
          const quantity = quantityItem.quantity;
          // setTotalPrice((pre) => (pre += quantity * item.price));
          return (
            <div className="cartItemBox" key={index}>
              <img src={`${item.image}`} alt="카트 아이템 이미지" />
              <div className="productInfoBox">
                <p className="storeName">{item.store_name}</p>
                <p className="productName">{item.product_name}</p>
                <p className="quantity">수량: {quantity}개</p>
              </div>
              <div className="discount">-</div>
              <div className="shippingFee">{item.shipping_fee}원</div>
              <div className="price">{item.price}원</div>
            </div>
          );
        })}
        <div className="totalPrice">
          총 주문 금액 <span>{totalPrice}원</span>
        </div>

        <div className="orderSheetBox">
          <h2>배송정보</h2>
          <hr />
          <div>
            <h2>주문자 정보</h2>
            <label htmlFor="name">
              이름:
              <input type="text" name="name" id="name" />
            </label>

            <label htmlFor="phone">
              휴대폰:
              <div className="phone-input-box">
                <input type="text" name="phone1" />
                -
                <input type="text" name="phone2" />
                -
                <input type="text" name="phone3" />
              </div>
            </label>

            {/* 배송 주소 */}
            <h2>배송지 정보</h2>

            {/* 수령인, 휴대폰 등 필드... */}

            {/* 배송 주소 */}
            <div className="address-input">
              <label htmlFor="postcode">
                우편번호 : <button>우편번호 조회</button>
              </label>
              <br />
              <label htmlFor="address">
                주소 :
                <input type="text" name="address" id="address" />
              </label>
              <br />
              <label htmlFor="detailAddress">
                상세주소 :
                <input type="text" name="detailAddress" id="detailAddress" />
              </label>
              <br />
            </div>
          </div>
        </div>
      </PaymentWrapper>
    </>
  );
};

export default Payment;

const PaymentWrapper = styled.div`
  .title {
    font-size: 40px;
    line-height: 48px;
    font-weight: 700;
    margin: 54px auto;
    width: fit-content;
  }
  .tab {
    width: 1280px;
    display: flex;
    margin: auto;
    font-size: 24px;
    padding: 25px;
    background-color: #eee;
    margin-bottom: 35px;
    .productInfo {
      margin: auto 340px auto 240px;
    }
    .discount {
      margin-right: 180px;
    }
    .shippingFee {
      margin-right: 170px;
    }
  }
  .cartItemBox {
    width: 1280px;
    display: flex;
    margin: auto;
    margin-bottom: 15px;
    img {
      width: 100px;
      border-radius: 10px;
    }
    .productInfoBox {
      margin-left: 36px;
      width: 40%;
      .storeName {
        margin-bottom: 6px;
        color: var(--main-disabled-color);
        font-size: 20px;
      }
      .productName {
        font-size: 24px;
        line-height: 22px;
        margin-bottom: 10px;
        font-weight: 400;
      }
      .quantity {
      }
    }
    .discount {
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .shippingFee {
      width: 25%;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .price {
      width: 15%;
      font-weight: 700;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .totalPrice {
    font-size: 24px;
    width: 1280px;
    margin: auto;
    text-align: end;
    span {
      font-size: 28px;
      color: rgb(235, 87, 87);
      font-weight: 700;
    }
  }

  .orderSheetBox {
    width: 1280px;
    margin: auto;
    .phone-input-box {
      display: flex;
      justify-content: space-between;
      width: 60%;
      input {
        width: 30%;
      }
    }
    .address-input {
      margin-bottom: 20px;
    }
  }
`;
