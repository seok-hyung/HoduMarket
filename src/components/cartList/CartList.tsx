import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userTokenState } from 'atoms/Atoms';
import { useNavigate } from 'react-router-dom';
import { CartListProduct, ProductDetail } from 'model/market';
import { styled } from 'styled-components';

//API
import { getCartItemAPI } from 'api/cart/getCartItemAPI';
import { getDetailProductAPI } from 'api/product/getDetailProductAPI';
import { putCartItemAPI } from 'api/cart/putCartItemAPI';
import { deleteCartItemAPI } from 'api/cart/deleteCartItemAPI';

const CartList = () => {
  const navigate = useNavigate();
  const token = useRecoilValue(userTokenState);
  const [cartItemList, setCartItemList] = useState<CartListProduct[]>([]);
  const [cartItemDetails, setCartItemDetails] = useState<ProductDetail[]>([]);
  const [amounts, setAmounts] = useState<{ [key: string]: number }>({});
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [isAllChecked, setIsAllChecked] = useState<boolean>(true); // 전체 선택
  const [totalPrice, setTotalPrice] = useState<number>(0); // 결제 예정 금액
  const [totalShippingFee, setTotalShippingFee] = useState<number>(0); // 총 배송비
  const [modalState, setModalState] = useState(false); //모달
  const openModal = () => setModalState(true);
  const closeModal = () => setModalState(false);

  useQuery('cartItems', () => getCartItemAPI(token), {
    onSuccess: (data) => {
      setCartItemList(data?.results);
      if (data?.results.length > 0) {
        const newAmounts = data?.results.reduce(
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
    if (cartItemList?.length > 0) {
      const fetchDetails = async () => {
        const detailsArr = await Promise.all(
          cartItemList.map((item) => getDetailProductAPI(item.product_id)),
        );
        setCartItemDetails(detailsArr);
      };

      fetchDetails();
    }
  }, [cartItemList]);

  useEffect(() => {
    if (cartItemList?.length > 0) {
      const newCheckedItems = cartItemList.reduce(
        (acc: { [key: string]: boolean }, curr: CartListProduct) => ({
          ...acc,
          [curr.product_id]: checkedItems[curr.product_id] || false,
        }),
        {},
      );
      setCheckedItems(newCheckedItems);
    }
  }, [cartItemList]);

  // 채크박스 변화생길때마다 모든 채크박스 상태확인
  useEffect(() => {
    const allChecked = Object.values(checkedItems).every((item) => item === true);
    setIsAllChecked(allChecked);
  }, [checkedItems]);

  const toggleAllCheckboxes = () => {
    const newCheckedItems = Object.keys(checkedItems).reduce((acc, curr) => {
      return { ...acc, [curr]: !isAllChecked };
    }, {});
    setCheckedItems(newCheckedItems);
  };

  const handleCheckChange = (productId: string | number) => {
    setCheckedItems({ ...checkedItems, [productId]: !checkedItems[productId] });
  };

  // quantity(수량) 조절 함수
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
        //깃 이슈#17 에러 해결
        const newCartItemList = [...cartItemList];
        cartItem.quantity = newQuantity;
        setCartItemList(newCartItemList);
        // 에러 해결
      })
      .catch((error) => {
        console.error('수량 +1하는데 에러가 있습니다.', error);
        setAmounts((prev) => ({ ...prev, [productId]: amounts[productId] || 0 }));
      });
  };

  const handleDecrement = (productId: any) => {
    if ((amounts[productId] || 0) > 1) {
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
          //깃 이슈#17 에러 해결
          const newCartItemList = [...cartItemList];
          cartItem.quantity = newQuantity;
          setCartItemList(newCartItemList);
        })
        .catch((error) => {
          console.error('수량 -1을 하는데 에러가 있습니다.', error);
          setAmounts((prev) => ({ ...prev, [productId]: amounts[productId] }));
        });
    } else {
      // 수량이 0이 되는 경우
      openModal();
    }
  };

  // 최종금액 및 배송비 처리
  useEffect(() => {
    let price = 0;
    let shippingFee = 0;

    cartItemDetails.forEach((item) => {
      if (checkedItems[item.product_id]) {
        price += item.price * (amounts[item.product_id] || 0);
        shippingFee += item.shipping_fee;
      }
    });
    setTotalPrice(price);
    setTotalShippingFee(shippingFee);
  }, [cartItemDetails, amounts, checkedItems]);

  // 장바구니상품 개별 삭제
  const delEachProduct = async (productId: number) => {
    const cartItem = cartItemList.find((item) => item.product_id === productId);
    if (!cartItem) return;

    try {
      await deleteCartItemAPI(token, cartItem.cart_item_id);
      setCartItemList((prev) => prev.filter((item) => item.product_id !== productId));
      setCartItemDetails((prev) => prev.filter((item) => item.product_id !== productId));
    } catch (error) {
      console.error('상품 삭제 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <CartWrapper>
      <div className="tab-title">장바구니</div>
      <ul className="tab-list">
        <li className="checkbox">
          <label htmlFor="checkbox"></label>
          <input
            type="checkbox"
            id="checkbox"
            checked={isAllChecked}
            onChange={toggleAllCheckboxes}
          />
        </li>
        <li className="productInfo">상품정보</li>
        <li className="quantity">수량</li>
        <li className="price">상품금액</li>
      </ul>
      {cartItemDetails?.length ? (
        cartItemDetails.map((detail, index) => (
          <div className="cart-item" key={index}>
            <img
              className="del-img"
              src="assets/icon-delete.svg"
              alt="삭제(X) 이미지"
              onClick={() => delEachProduct(detail.product_id)}
            />
            <div className="checkbox">
              <input
                type="checkbox"
                checked={checkedItems[detail.product_id]}
                onChange={() => handleCheckChange(detail.product_id)}
              />
            </div>
            <div className="cartImg-box">
              <img className="cart-img" src={`${detail.image}`} alt="" />
            </div>
            <div className="product-info">
              <h2 className="store-name">{detail.store_name}</h2>
              <p className="product-name">{detail.product_name}</p>
              <p className="price">{detail.price}원</p>
              <div className="delivery-box">
                {detail.shipping_fee === 0 ? (
                  <p>무료배송</p>
                ) : (
                  <p>택배배송 / {detail.shipping_fee}원</p>
                )}
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
        <div className="empty-cart">
          <strong>장바구니에 담긴 상품이 없습니다.</strong>
          <p>원하는 상품을 장바구니에 담아보세요.</p>
        </div>
      )}

      <ul className="final-price-ul">
        <li>
          <p>총 상품 금액</p>
          <strong>{totalPrice}원</strong>
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
          <strong>{totalShippingFee}원</strong>
        </li>
        <li>
          <p>결제 예정 금액</p>
          <strong id="final-price-strong">{totalPrice + totalShippingFee}원</strong>
        </li>
      </ul>
      <button
        className="final-order-btn"
        onClick={() => {
          const checkedCartData = cartItemDetails.filter(
            (item) => checkedItems[item.product_id],
          );
          const checkedQuantityData = cartItemList.filter(
            (item) => checkedItems[item.product_id],
          );
          navigate('/payment', {
            state: { cartData: checkedCartData, quantityData: checkedQuantityData },
          });
        }}
      >
        주문하기
      </button>

      {modalState && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <img src="assets/icon-delete.svg" alt="삭제(X) 아이콘" onClick={closeModal} />
            <p>1개 이상부터 구매할 수 있어요</p>
            <button onClick={closeModal}>확인</button>
          </div>
        </div>
      )}
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
  .cart-img {
    width: 160px;
    height: 160px;
  }
  .tab-list {
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
  .checkbox {
    margin-right: 314px;
  }
  .productInfo {
    margin-right: 379px;
  }
  .quantity {
    margin-right: 238px;
  }
  .price {
  }

  .cart-item {
    width: 1280px;
    display: flex;
    margin: auto;
    font-size: 24px;
    padding: 25px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    margin-bottom: 20px;
    position: relative;
    &:last-of-type {
      margin-bottom: 0;
    }
    .del-img {
      position: absolute;
      width: 28px;
      height: 28px;
      top: 20px;
      right: 18px;
      cursor: pointer;
    }
    .checkbox {
      margin-right: 40px;
      display: flex;
      align-items: center;
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
        color: #eb5757;
        font-weight: 700;
      }
      .order-btn {
        width: 150px;
        border-radius: 5px;
        font-size: 20px;
        padding: 15px;
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
      }
      &::before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        width: 54px;
        height: 54px;
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
  .modalContent {
    width: 600px;
    padding: 40px;
    p {
      font-size: 24px;
      font-weight: 600;
      margin: 30px auto;
    }
    button {
      width: 100px;
      padding: 10px;
      font-size: 20px;
      border: 1px var(--sub-text-color) solid;
      border-radius: 5px;
      background-color: var(--main-color);
      color: white;
      border: none;
      float: right;
    }
    img {
      position: absolute;
      top: -70px;
      right: 20px;
      width: 30px;
      cursor: pointer;
    }
  }
`;
