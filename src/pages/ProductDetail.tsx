import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userTokenState } from 'atoms/Atoms';
import { ProductDetailForm } from 'model/market';
// 공용 컴포넌트
import TabContent from 'components/tabContent/TabContent';
import Nav from 'components/common/nav/Nav';
import Footer from 'components/common/footer/Footer';

// API
import { postCartItemAPI } from 'api/cart/postCartItemAPI';
import { getCartItemAPI } from 'api/cart/getCartItemAPI';
import { getDetailProductAPI } from 'api/product/getDetailProductAPI';

const ProductDetail = () => {
  const intl = new Intl.NumberFormat();
  const token = useRecoilValue(userTokenState);
  let [amount, setAmount] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetailForm>();
  const [modalState, setModalState] = useState(false);
  const openModal = () => setModalState(true);
  const closeModal = () => setModalState(false);
  useEffect(() => {
    getDetailProductAPI(productId).then((data) => {
      setProduct(data);
    });
  }, [productId, product]);

  // 수량
  const handleIncrement = () => {
    if (product) {
      if (amount < product.stock) {
        setAmount(amount + 1);
        setTotalPrice((amount + 1) * product?.price);
      }
    }
  };
  const handleDecrement = () => {
    if (product) {
      if (amount > 1) {
        setAmount(amount - 1);
        setTotalPrice((amount - 1) * product?.price);
      }
    }
  };
  let formdata = product
    ? {
        product_id: product.product_id,
        quantity: amount,
        check: isInCart,
      }
    : undefined;

  let [totalPrice, setTotalPrice] = useState(product ? product.price : 0);
  const handleCartBtn = () => {
    if (product) {
      getCartItemAPI(token).then((res) => {
        if (res.results.some((item: any) => item.product_id === product.product_id)) {
          setIsInCart(true);
          postCartItemAPI(token, formdata);
          openModal();
        } else {
          setIsInCart(false);
          postCartItemAPI(token, formdata);
        }
      });
    }
  };

  const handleBuyBtn = () => {
    if (product) {
      navigate('/payment', {
        state: {
          cartData: [product],
          quantityData: [{ product_id: product.product_id, quantity: amount }],
        },
      });
    }
  };

  // init 체크
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//developers.kakao.com/sdk/js/kakao.min.js';
    script.onload = () => {
      window.Kakao.init('18623218c742bd8317f31216a17b1094'); // 발급받은 앱 키
    };
    document.body.appendChild(script);
  }, []);
  useEffect(() => {
    // product가 정의되었을 때만 shareKakao를 실행합니다.
    if (product) {
      shareKakao();
    }
  }, [product]);
  let shareKakao = function () {
    if (product) {
      window.Kakao.Link.sendScrap({
        requestUrl: `https://hodumarket24.netlify.app/detail/${product.product_id}`,
        templateId: 102981,
        templateArgs: {
          ID: `${product.product_id}`,
          PROFILE: `${product.image}`,
          THUMB: `${product.image}`,
          TITLE: `${product.product_name}`,
          PRICE: `${product.price}`,
          DESC: `${product.products_info}`,
        },
      });
    }
  };

  return (
    <>
      <Nav />
      <DetailWrapperDiv>
        <DetailContainerDiv>
          <div className="detail-left-div">
            <img
              className="product-img"
              src={`${product?.image}`}
              alt="상세페이지 이미지"
            />
          </div>

          <div className="detail-right-div">
            <p className="info">{product?.store_name}</p>
            <p className="name">{product?.product_name}</p>
            <p className="price">
              {product?.price}
              <span>원</span>
            </p>
            <div className="circle" onClick={shareKakao}>
              <img src="/assets/share.svg" alt="공유하기 버튼" id="share" />
            </div>
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
  max-width: 70vw;
`;

const DetailContainerDiv = styled.div`
  display: flex;
  margin-bottom: 140px;
  .detail-left-div {
    width: 50%;
    height: 860px;
    margin-right: 50px;
    img {
      width: 100%;
      border-radius: 10px;
    }
  }

  .detail-right-div {
    display: flex;
    flex-direction: column;
    min-width: calc(50% - 50px);
    font-size: 40px;
    position: relative;
    .info {
      color: var(--sub-text-color);
      margin-bottom: 2rem;
      font-size: 38px;
    }
    .name {
      margin-bottom: 2.5rem;
    }
    .price {
      display: inline-block;
      margin-bottom: 13rem;
      font-weight: 700;
    }
    .deliveryInfo {
      margin-bottom: 3rem;
      font-size: 32px;
    }
    .amount {
      width: 180px;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border: 3px solid #c4c4c4;
      border-radius: 5px;
      margin: 3rem 0;

      img {
        cursor: pointer;
        width: 20px;
      }
    }
    .circle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: #f0f0f0;
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
    }
    #share {
      width: 50px;
      height: 50px;
    }
    hr {
      border: 2px solid #c4c4c4;
    }

    .total-price {
      display: flex;
      justify-content: space-between;
      margin: 4rem 0;
      .price-info {
        min-width: fit-content;
      }
      .total-amount {
        font-weight: 400;

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
