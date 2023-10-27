import Nav from 'components/common/nav/Nav';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

const Payment = () => {
  const location = useLocation();
  const cartDatas = location.state.cartData;
  const quantityDatas = location.state.quantityData;
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  useEffect(() => {
    const total = cartDatas?.reduce((acc: any, item: any) => {
      const quantityItem = quantityDatas.find(
        (data: any) => data.product_id === item.product_id,
      );
      const quantity = quantityItem ? quantityItem.quantity : 0;
      return acc + quantity * item.price + item.shipping_fee;
    }, 0);
    setTotalPrice(total);

    const shippingFee = cartDatas?.reduce((acc: any, item: any) => {
      return acc + item.shipping_fee;
    }, 0);
    setShippingFee(shippingFee);
  }, [cartDatas, quantityDatas]);
  return (
    <>
      <Nav />
      <PaymentWrapper>
        <h1 className="title">주문 / 결제하기</h1>
        <section>
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
        </section>

        <section className="orderSheetBox">
          <h2>배송정보</h2>
          <hr />
          <div>
            <h3>주문자 정보</h3>
            <hr />
            <label htmlFor="name">
              <span>이름:</span>
              <div className="input-box">
                <input type="text" name="name" id="name" />
              </div>
            </label>
            <hr />
            <label htmlFor="phone">
              <span>휴대폰:</span>
              <div className="input-box phone">
                <input type="text" name="phone1" />
                -
                <input type="text" name="phone2" />
                -
                <input type="text" name="phone3" />
              </div>
            </label>
            <hr />

            <label htmlFor="email">
              <span>이메일:</span>
              <div className="input-box">
                <input type="email" name="email" id="email" />
              </div>
            </label>
            <hr />

            <h3>배송지 정보</h3>
            <hr />
            <div className="recipient">
              <label htmlFor="recipient">
                <span>수령인:</span>
                <div className="input-box">
                  <input type="text" name="recipient" id="recipient" />
                </div>
              </label>
              <hr />
            </div>
            <label htmlFor="phone">
              <span>휴대폰:</span>
              <div className="input-box phone">
                <input type="text" name="phone1" />
                -
                <input type="text" name="phone2" />
                -
                <input type="text" name="phone3" />
              </div>
            </label>
            <hr />
            <div className="address-input">
              <label htmlFor="postcode">
                <span>배송주소:</span>
                <div className="input-box postcode">
                  <input type="text" name="postcode" id="postcode" />
                  <button>우편번호 조회</button>
                </div>
              </label>
              <label htmlFor="postcode2">
                <span></span>
                <input type="text" name="postcode2" id="postcode2" />
              </label>
              <label htmlFor="postcode3">
                <span></span>
                <input type="text" name="postcode3" id="postcode3" />
              </label>
              <hr />
              <label htmlFor="address">
                <span>주소 :</span>
                <div className="input-box">
                  <input type="text" name="address" id="address" />
                </div>
              </label>
              <hr />
              <label htmlFor="detailAddress">
                <span>상세주소 :</span>
                <div className="input-box">
                  <input type="text" name="detailAddress" id="detailAddress" />
                </div>
              </label>
              <hr />
              <label htmlFor="msg">
                <span>배송 메시지 :</span>
                <div className="input-box">
                  <input type="text" name="msg" id="msg" />
                </div>
              </label>
              <hr />
            </div>
          </div>
        </section>

        <section className="footer">
          <div className="footer-left">
            <h3>결제수단</h3>
            <div className="pay-method">
              <label htmlFor="card">
                <input type="checkbox" name="card" id="card" />
                <span>신용/체크카드</span>
              </label>
              <label htmlFor="no-bank">
                <input type="checkbox" name="no-bank" id="no-bank" />
                <span>무통장 입금</span>
              </label>
              <label htmlFor="phone">
                <input type="checkbox" name="phone" id="phone" />
                <span>휴대폰 결제</span>
              </label>
              <label htmlFor="naverPay">
                <input type="checkbox" name="naverPay" id="naverPay" />
                <span>네이버페이</span>
              </label>
              <label htmlFor="kakaoPay">
                <input type="checkbox" name="kakaoPay" id="kakaoPay" />
                <span>카카오페이</span>
              </label>
            </div>
          </div>

          <div className="footer-right">
            <h3>최종결제 정보</h3>
            <div className="pay-info-box">
              <div className="not-gray">
                <div>
                  <p>- 상품금액</p>
                  <strong>{totalPrice - shippingFee}원</strong>
                </div>
                <div>
                  <p>- 할인금액</p>
                  <strong>0원</strong>
                </div>
                <div>
                  <p>- 배송비</p>
                  <strong>{shippingFee}원</strong>
                </div>
                <hr />
                <div className="price">
                  <p>- 결제금액</p>
                  <strong>{totalPrice}원</strong>
                </div>
              </div>

              <div className="gray">
                <div className="info-confirm-box">
                  <label htmlFor="info-confirm">
                    <input
                      type="checkbox"
                      name="info-confirm"
                      id="info-confirm"
                      onChange={() => setIsChecked(!isChecked)}
                    />
                    <span>주문 내용을 확인하였으며 정보 제공 등에 동의합니다.</span>
                  </label>
                  <PayBtn checked={isChecked}>결제하기</PayBtn>
                </div>
              </div>
            </div>
          </div>
        </section>
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
  section {
    max-width: 1400px;
    margin: 0 auto;
  }
  .tab {
    display: flex;
    font-size: 28px;
    padding: 20px 0;
    text-align: center;
    background-color: #eee;
    margin-bottom: 16px;
    .productInfo {
      width: 45%;
    }
    .discount {
      width: 20%;
    }
    .shippingFee {
      width: 20%;
    }
    .orderPrice {
      width: 20%;
    }
  }
  .cartItemBox {
    max-width: 1400px;
    display: flex;
    margin-bottom: 15px;
    border-bottom: 2px solid #c4c4c4;
    padding: 15px 0;
    img {
      width: 10%;
      border-radius: 10px;
    }
    .productInfoBox {
      margin-left: 30px;
      width: calc(35% - 30px);

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
    }
    .discount {
      width: 20%;

      display: flex;
      justify-content: center;
      align-items: center;
    }
    .shippingFee {
      width: 20%;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .price {
      width: 20%;
      font-weight: 700;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .totalPrice {
    max-width: 1400px;
    font-size: 24px;
    text-align: end;
    margin-top: 20px;
    span {
      font-size: 28px;
      color: #eb5757;
      font-weight: 700;
    }
  }
  .main {
    margin-top: 90px;
  }
  .orderSheetBox {
    margin-top: 30px;
    h2 {
      font-size: 30px;
      line-height: 30px;
      font-weight: 900;
      + hr {
        margin-top: 18px;
        margin-bottom: 36px;
      }
    }
    h3 {
      font-size: 26px;
      line-height: 22px;
      font-weight: 600;
      &:last-of-type {
        margin-top: 50px;
      }
      + hr {
        margin: 8px 0;
      }
    }
    label {
      max-width: 1000px;
      display: flex;
      .input-box {
        width: 360px;
        display: flex;
      }
      .input-box.phone {
        align-items: center;
        gap: 5px;
      }
      .input-box.postcode {
        margin-bottom: 10px;
      }
      #postcode {
        width: 50%;
        margin-right: 10px;
        + button {
          width: 50%;
          font-size: 18px;
          background-color: var(--main-color);
          border-radius: 5px;
          border: none;
          color: white;
        }
      }
      input {
        width: 100%;
        font-size: 24px;
        height: 40px;
      }
      span {
        font-size: 24px;
        line-height: 20px;
        min-width: 150px;
        margin: auto 0;
      }
      + hr {
        margin: 10px 0;
      }
    }

    .address-input {
      #postcode2,
      #postcode3 {
        width: 800px;
        margin-bottom: 10px;
      }
    }
  }

  /* footer */
  .footer {
    display: flex;
    margin-top: 70px;
    gap: 25px;
    font-size: 22px;
    h3 {
      font-size: 26px;
      line-height: 22px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .footer-left {
      flex-basis: 60%;
      margin-bottom: 400px;
      .pay-method {
        padding: 15px 10px;
        border-top: 2px solid #c4c4c4;
        border-bottom: 2px solid #c4c4c4;
        label {
          margin-right: 30px;
          input[type='checkbox'] {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            border: 1px solid #999;
            appearance: none;
            cursor: pointer;
            transition: background 0.2s;
            margin-right: 7px;
          }

          input[type='checkbox']:checked {
            background: #32e732;
            border: none;
          }
          span {
            font-size: 20px;
          }
        }
      }
    }
    .footer-right {
      margin: 0 auto;
      .pay-info-box {
        border: 3px solid var(--main-color);
        border-radius: 10px;
        .not-gray {
          padding: 25px;
          div {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            &:last-of-type {
              margin-bottom: 0;
            }
            strong {
              font-weight: 600;
            }
          }
          .price {
            margin: 30px 0;
            strong {
              color: #eb5757;
            }
          }
        }
        .gray {
          background-color: #f2f2f2;
          padding: 25px;
          .info-confirm-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            input[type='checkbox'] {
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
              border: 1px solid #999;
              appearance: none;
              cursor: pointer;
              transition: background 0.2s;
              margin-right: 7px;
            }

            input[type='checkbox']:checked {
              background: #32e732;
              border: none;
            }
          }
        }
      }
    }
  }
`;
const PayBtn = styled.button<{ checked: boolean }>`
  width: 220px;
  font-size: 24px;
  padding: 20px 0;
  color: white;
  border-radius: 10px;
  background-color: ${(props) => (props.checked ? '#32e732' : '#c4c4c4')};
  cursor: ${(props) => (props.checked ? 'pointer' : 'default')};
`;
