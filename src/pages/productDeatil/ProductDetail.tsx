import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './ProductDetail.style';
import TabContent from 'components/tabContent/TabContent';
import Nav from 'components/common/nav/Nav';
import Footer from 'components/common/footer/Footer';
import { postCartItemAPI } from 'api/cart/postCartItemAPI';
import { useRecoilValue } from 'recoil';
import { userTokenState } from 'atoms/Atoms';
import { getCartItemAPI } from 'api/cart/getCartItemAPI';
import { styled } from 'styled-components';

const ProductDetail = () => {
  const location = useLocation();
  const productInfo = location.state?.item;
  const intl = new Intl.NumberFormat();
  const token = useRecoilValue(userTokenState);
  let [amount, setAmount] = useState(1);
  let [totalPrice, setTotalPrice] = useState(productInfo.price);
  const [isInCart, setIsInCart] = useState(false);

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
  console.log(formdata);

  const handleCartBtn = async () => {
    await getCartItemAPI(token).then((res) => {
      // 현재 상품이 장바구니에 있는지 확인(상품의 고유 id로 확인)
      if (res.results.some((item: any) => item.product_id === productInfo.product_id)) {
        setIsInCart(true);
        openModal();
        return;
      }
    });
    await postCartItemAPI(token, formdata);
  };
  return (
    <>
      <Nav />
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
                <span className="total-price-span">{intl.format(totalPrice)}</span>원
              </div>
            </div>
            <div className="detail-btn">
              <button className="buy">바로 구매</button>
              <button onClick={handleCartBtn} className="shop-bag">
                장바구니
              </button>
            </div>
          </S.DetailRightDiv>
        </S.DetailContainerDiv>
        <TabContent />
      </S.DetailWrapperDiv>
      {modalState ? (
        <ModalOverlay onClick={closeModal}>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <img src="/assets/icon-delete.svg" onClick={closeModal} alt="닫기 이미지" />
            <p>이미 장바구니에 있는 상품입니다. 장바구니로 이동하시겠습니까?</p>
            <div className="btn-box">
              <button className="no-btn" onClick={closeModal}>
                아니요
              </button>
              <button
                className="yes-btn"
                onClick={() => {
                  postCartItemAPI(token, formdata);
                  closeModal();
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
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  .modal-wrapper {
    width: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
  }
  img {
    width: 22px;
    height: 22px;
  }
  p {
    font-size: 24px;
    font-weight: 600;
  }
  .btn-box {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 30px auto;
  }
  button {
    width: 100px;
    padding: 10px;
    border: 1px var(--sub-text-color) solid;
    border-radius: 5px;
  }
  .yes-btn {
    background-color: var(--main-color);
    color: white;
    border: none;
  }
`;
