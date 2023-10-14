import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import React, { useEffect, useState } from 'react';
import { userTokenState } from 'atoms/Atoms';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { CartListProduct, ProductDetail } from 'model/market';
import { styled } from 'styled-components';

import { getCartItemAPI } from 'api/cart/getCartItemAPI';
import { getDetailProductAPI } from 'api/product/getDetailProductAPI';
import { putCartItemAPI } from 'api/cart/putCartItemAPI';

const CartList = () => {
  const navigate = useNavigate();
  const token = useRecoilValue(userTokenState);
  const [cartItemList, setCartItemList] = useState<CartListProduct[]>([]);
  const [cartItemDeatails, setCartItemDetails] = useState<ProductDetail[]>([]);
  const [amounts, setAmounts] = useState<{ [key: string]: number }>({});
  // console.log(cartItemList);
  console.log(cartItemDeatails);
  // console.log(amounts);

  useQuery('cartItems', () => getCartItemAPI(token), {
    onSuccess: (data) => {
      setCartItemList(data.results);

      if (data.results.length > 0) {
        const newAmounts = data.results.reduce(
          (acc: { [key: string]: number }, curr: CartListProduct) => ({
            ...acc,
            [curr.product_id]: curr.quantity,
          }),
          {},
        );
        setAmounts(newAmounts);
      }
    },
    onError: (error) => {
      console.error('장바구니 상품을 가져오는데 문제가 발생했습니다.', error);
    },
  });

  useEffect(() => {
    if (cartItemList.length > 0) {
      const fetchDetails = async () => {
        const detailsArr = await Promise.all(
          cartItemList.map((item) => getDetailProductAPI(item.product_id)),
        );
        setCartItemDetails(detailsArr);
      };

      fetchDetails();
    }
  }, [cartItemList]);

  // quantity 조절 함수
  const handleIncrement = (productId: any) => {
    const newQuantity = (amounts[productId] || 0) + 1;
    const cartItem = cartItemList.find((item) => item.product_id === productId);
    if (!cartItem) return;

    const formData = {
      product_id: productId,
      quantity: newQuantity,
      is_active: true,
    };
    putCartItemAPI(token, cartItem?.cart_item_id, formData)
      .then(() => {
        setAmounts((prev) => ({ ...prev, [productId]: newQuantity }));
      })
      .catch((error) => {
        console.error('수량 +1하는데 에러가 있습니다.', error);
        setAmounts((prev) => ({ ...prev, [productId]: amounts[productId] || 0 }));
      });
  };

  const handleDecrement = (productId: any) => {
    if ((amounts[productId] || 0) > 0) {
      const newQuantity = amounts[productId] - 1;
      const cartItem = cartItemList.find((item) => item.product_id === productId);
      if (!cartItem || newQuantity < 0) return;
      const formData = {
        product_id: productId,
        quantity: newQuantity,
        is_active: true,
      };
      putCartItemAPI(token, cartItem?.cart_item_id, formData)
        .then(() => {
          setAmounts((prev) => ({ ...prev, [productId]: newQuantity }));
        })
        .catch((error) => {
          console.error('수량 -1을 하는데 에러가 있습니다.', error);
          setAmounts((prev) => ({ ...prev, [productId]: amounts[productId] }));
        });
    }
  };

  // 모달로 확인한 값이 바뀌는 경우
  const [isChangeModalValue, setIsChangeModalValue] = useState<boolean>(false);

  // 전체 선택상태 일때
  const [isAllCheck, setAllIsCheck] = useState<boolean>(true);

  // 전체 선택 체크박스를 눌렀을 때
  const [isClickAllCheck, setIsClickAllCheck] = useState<boolean>(true);

  // 장바구니 아이템이 하나라도 비활성화 시 전체 체크박스 상태 변경
  useEffect(() => {
    const isCheckArr = cartItemList.map((cartItem) => cartItem.is_active);
    isCheckArr.includes(false) ? setAllIsCheck(false) : setAllIsCheck(true);
  }, [cartItemList]);

  // cartItem checkbox 클릭시 전체 체크박스 상태 변경
  const handleCheckBoxClick = () => {
    if (isClickAllCheck) {
      setAllIsCheck(false);
      setIsClickAllCheck(false);
      cartItemList.map((cartItem) => {
        cartItem.is_active = false;
      });
    } else {
      setAllIsCheck(true);
      setIsClickAllCheck(true);
      cartItemList.map((cartItem) => {
        cartItem.is_active = true;
      });
    }
  };

  const [isOrderBtnClick, setIsOrderBtnClick] = useState(false);
  const handleOrderBtnClick = () => {
    setIsOrderBtnClick(true);
  };

  useEffect(() => {
    if (isOrderBtnClick) {
      // is_active가 true인 아이템만 필터링
      const orderList = cartItemList.filter((cartItem) => cartItem.is_active);
      const orderListId = orderList.map((cartItem) => cartItem.product_id);
      const orderListQuantity = orderList.map((cartItem) => cartItem.quantity);
      const order_kind = 'cart_order';
      navigate('/payment', { state: { orderListId, orderListQuantity, order_kind } });
    }
  }, [isOrderBtnClick]);
  return (
    <CartWrapper>
      <div className="tab-title">장바구니</div>
      <ul className="tab-list-ul">
        <li className="checkbox-li">
          <label htmlFor="checkbox"></label>
          <input type="checkbox" id="checkbox" />
        </li>
        <li className="product-info-li">상품정보</li>
        <li className="quantity-li">수량</li>
        <li className="price-li">상품금액</li>
      </ul>
      {cartItemDeatails.length ? (
        cartItemDeatails.map((detail, index) => (
          <div className="cart-item" key={index}>
            <div className="checkbox">
              <input type="checkbox" />
            </div>
            <div className="cartImg-box">
              <img id="cart-img" src={`${detail.image}`} alt="" />
            </div>
            <div className="product-info">
              <h2 className="store-name">{detail.store_name}</h2>
              <p className="product-name">{detail.product_name}</p>
              <p className="price">{detail.price}원</p>
              <div className="delivery-box">
                <p>택배배송 /</p>
                <p>무료배송</p>
              </div>
            </div>
            <div className="amount">
              <img
                onClick={() => handleDecrement(detail.product_id)}
                src="/assets/icon-minus-line.svg"
                id="minus-img"
                alt="마이너스 이미지"
              />
              <div>{amounts[detail.product_id]}</div>
              <img
                onClick={() => handleIncrement(detail.product_id)}
                src="/assets/icon-plus-line.svg"
                id="plus-img"
                alt="플러스 이미지"
              />
            </div>
            <div className="price-box">
              <p className="price">
                {Number(detail.price) * amounts[detail.product_id]}원
              </p>
              <button className="order-btn">주문하기</button>
            </div>
          </div>
        ))
      ) : (
        // cartItemList?.map((cartItem) => {
        //   return (
        //     <CartItem
        //       key={cartItem.cart_item_id}
        //       cartProduct={cartItem}
        //       setCartItemList={setCartItemList}
        //       setIsChangeModalValue={setIsChangeModalValue}
        //       isOrderBtnClick={isOrderBtnClick}
        //       isClickAllCheck={isClickAllCheck}
        //     />
        <div className="empty-cart">
          <strong>장바구니에 담긴 상품이 없습니다.</strong>
          <p>원하는 상품을 장바구니에 담아보세요.</p>
        </div>
      )}

      <ul className="final-price-ul">
        <li>
          <p>총 상품 금액</p>
          <strong>46,500원</strong>
        </li>
        <li className="icon-li minus">
          <img src="assets/icon-minus-line.svg" alt="마이너스 이미지" />
        </li>
        <li>
          <p>상품 할인</p>
          <strong>0원</strong>
        </li>
        <li className="icon-li plus">
          <img src="assets/icon-plus-line.svg" alt="플러스 이미지" />
        </li>
        <li>
          <p>배송비</p>
          <strong>0원</strong>
        </li>
        <li>
          <p>결제 예정 금액</p>
          <strong id="final-price-strong">46,500원</strong>
        </li>
      </ul>
      <button className="final-order-btn">주문하기</button>
    </CartWrapper>
  );
};

export default CartList;

const CartWrapper = styled.div`
  .tab-title {
    font-size: 36px;
    margin: 54px 0 52px 0;
    text-align: center;
    font-weight: 700;
  }
  #cart-img {
    width: 160px;
    height: 160px;
  }
  .tab-list-ul {
    width: 1280px;
    display: flex;
    margin: auto;
    font-size: 24px;
    padding: 25px;
    background-color: #eee;
    margin-bottom: 35px;
  }
  input[type='checkbox'] {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #999;
    appearance: none;
    cursor: pointer;
    transition: background 0.2s;
    &:checked {
      background-color: var(--main-color);
      border: none;
    }
  }
  .checkbox-li {
    margin-right: 314px;
  }
  .product-info-li {
    margin-right: 379px;
  }
  .quantity-li {
    margin-right: 238px;
  }
  .price-li {
  }

  .cart-item {
    width: 1280px;
    display: flex;
    margin: auto;
    font-size: 24px;
    padding: 25px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    margin-bottom: 10px;
    &:last-of-type {
      margin-bottom: 0;
    }
    .checkbox {
      margin-right: 40px;
    }
    .cartImg-box {
      margin-right: 36px;
    }
    .product-info {
      flex-basis: 490px;

      .store-name {
        color: var(--main-disabled-color);
        font-size: 20px;
        margin-bottom: 10px;
      }
      .product-name {
        font-size: 24px;
        line-height: 22px;
        margin-bottom: 10px;
        font-weight: 400;
      }
      .price {
        font-size: 24px;
        line-height: 22px;
        margin-bottom: 40px;
        font-weight: 700;
      }
      .delivery-box {
        display: flex;
        gap: 3px;
        font-size: 20px;
        color: var(--main-disabled-color);
      }
    }
    .amount {
      width: 150px;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border: 3px solid #c4c4c4;
      border-radius: 5px;
      margin: auto 120px auto 0;

      img {
        cursor: pointer;
        width: 20px;
        height: 20px;
      }
    }
    .price-box {
      width: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 30px;
      .price {
        color: red;
        font-weight: 700;
      }
      .order-btn {
        width: 130px;
        height: 40px;
        border-radius: 5px;
        background-color: var(--main-color);
        color: white;
      }
    }
  }
  .empty-cart {
    text-align: center;
    margin: 200px 0;
    strong {
      display: inline-block;
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 17px;
    }
    p {
      font-size: 24px;
      color: var(--main-disabled-color);
    }
  }

  // 최종 가격 박스 CSS
  .final-price-ul {
    width: 1280px;
    height: 150px;
    background-color: #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 80px auto 40px auto;
    position: relative;

    #final-price-strong {
      font-size: 36px;
      color: red;
      line-height: 45px;
    }
    li:not(.icon-li) {
      flex-basis: 25%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 14px;
      p {
        font-size: 22px;
        line-height: 20px;
      }
      strong {
        font-size: 26px;
        font-weight: 700;
        line-height: 30px;
      }
    }
    li.icon-li {
      position: absolute;
      width: 34px;
      height: 34px;
      img {
        position: absolute;
        z-index: 100;
      }
      &::before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        width: 54px;
        height: 54px;
        z-index: 10;
        border-radius: 50%;
        background-color: white;
      }
    }
    li.icon-li.minus {
      left: calc(25% - 13.5px);
    }
    li.icon-li.plus {
      left: calc(50% - 13.5px);
    }
  }
  .final-order-btn {
    width: 220px;
    height: 68px;
    background-color: var(--main-color);
    border-radius: 5px;
    font-size: 24px;
    color: white;
    font-weight: 700;
    display: block;
    margin: 40px auto;
  }
`;
