import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import TabContent from 'components/tabContent/TabContent';
import Nav from 'components/common/nav/Nav';
import Footer from 'components/common/footer/Footer';
import { postCartItemAPI } from 'api/cart/postCartItemAPI';
import { useRecoilValue } from 'recoil';
import { userTokenState } from 'atoms/Atoms';
import { getCartItemAPI } from 'api/cart/getCartItemAPI';

const ProductDetail = () => {
  const location = useLocation();
  const productInfo = location.state?.item;
  const intl = new Intl.NumberFormat();
  const token = useRecoilValue(userTokenState);
  let [amount, setAmount] = useState(1);
  let [totalPrice, setTotalPrice] = useState(productInfo.price);
  const [isInCart, setIsInCart] = useState(false);
  const navigate = useNavigate();

  // 모달
  const [modalState, setModalState] = useState(false);
  const openModal = () => setModalState(true);
  const closeModal = () => setModalState(false);

  // 수량
  const handleIncrement = () => {
    setAmount(amount + 1);
    setTotalPrice((amount + 1) * productInfo.price);
  };
  const handleDecrement = () => {
    setAmount(amount - 1);
    setTotalPrice((amount - 1) * productInfo.price);
  };
  const formdata = {
    product_id: productInfo.product_id,
    quantity: amount,
    check: isInCart,
  };
  // console.log(formdata);
  console.log(productInfo);

  const handleCartBtn = () => {
    getCartItemAPI(token).then((res) => {
      // 현재 상품이 장바구니에 있는지 확인(상품의 고유 id로 확인)
      if (res.results.some((item: any) => item.product_id === productInfo.product_id)) {
        setIsInCart(true);
        postCartItemAPI(token, formdata);
        openModal();
      } else {
        // 장바구니에 현재 상품이 없을때만 실행
        setIsInCart(false);
        postCartItemAPI(token, formdata);
      }
    });
  };

  const handleBuyBtn = () => {
    navigate('/payment', {
      state: {
        // 장바구니에서 주문서로 데이터를 배열로 보내기 떄문에 데이터 형태를 맞춰야 함
        cartData: [productInfo],
        quantityData: [{ product_id: productInfo.product_id, quantity: amount }],
      },
    });
  };
  return (
    <>
      <Nav />
      <DetailWrapperDiv>
        <DetailContainerDiv>
          <div className="detail-left-div">
            <img
              className="product-img"
              src={`${productInfo.image}`}
              alt="상세페이지 이미지"
            />
          </div>

          <div className="detail-right-div">
            <p className="info">{productInfo.store_name}</p>
            <p className="name">{productInfo.product_name}</p>
            <p className="price">
              {intl.format(productInfo.price)}
              <span>원</span>
            </p>
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
                <span className="total-price-span">{intl.format(totalPrice)}</span>원
              </div>
            </div>
            <div className="detail-btn">
              <button onClick={handleBuyBtn} className="buy">
                바로 구매
              </button>
              <button onClick={handleCartBtn} className="shop-bag">
                장바구니
              </button>
            </div>
          </div>
        </DetailContainerDiv>
        <TabContent />
      </DetailWrapperDiv>
      {modalState ? (
        <ModalOverlay onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src="/assets/icon-delete.svg" onClick={closeModal} alt="닫기 이미지" />
            <p>이미 장바구니에 있는 상품입니다.</p>
            <p>장바구니로 이동하시겠습니까?</p>
            <div className="btn-box">
              <button className="no-btn" onClick={closeModal}>
                아니요
              </button>
              <button
                className="yes-btn"
                onClick={() => {
                  navigate('/cart');
                }}
              >
                예
              </button>
            </div>
          </div>
        </ModalOverlay>
      ) : null}

      <Footer />
    </>
  );
};

export default ProductDetail;

const DetailWrapperDiv = styled.div`
  margin: 80px auto;
  max-width: 65vw;
`;

const DetailContainerDiv = styled.div`
  display: flex;
  margin-bottom: 140px;
  min-width: 65vw;
  .detail-left-div {
    min-width: 50%;
    max-width: 50%;
    margin-right: 50px;
    img {
      object-fit: cover;
    }
  }

  .detail-right-div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: calc(50% - 50px);
    font-size: 28px;
    .info {
      color: var(--sub-text-color);
      margin-bottom: 16px;
      font-size: 24px;
    }
    .name {
      font-size: 36px;
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
      }
    }
    hr {
      border: 2px solid #c4c4c4;
    }

    .total-price {
      display: flex;
      justify-content: space-between;
      margin: 30px 0 32px 0;

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
        font-style: normal;
        font-weight: 700;
      }
      .total-price-span {
        color: var(--main-color);
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        margin-left: 5px;
      }
    }
    .detail-btn {
      display: flex;
      .buy,
      .shop-bag {
        padding: 20px 0;
      }
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
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  .modal {
    width: 450px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 60px;
    border-radius: 10px;
  }
  img {
    width: 30px;
    height: 30px;
    position: absolute;
    cursor: pointer;
    top: 25px;
    right: 25px;
  }
  p {
    font-size: 24px;
    font-weight: 600;
    &:first-of-type {
      margin-bottom: 15px;
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 30px;
  }
  button {
    width: 120px;
    padding: 10px;
    font-size: 20px;
    border: 1px var(--sub-text-color) solid;
    border-radius: 5px;
  }
  .yes-btn {
    background-color: var(--main-color);
    color: white;
    border: none;
  }
`;
