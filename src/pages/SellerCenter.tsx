import SellerNav from 'components/common/nav/SellerNav';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getSellerProductsAPI } from 'api/product/getSellerProductsAPI';
import { useRecoilValue } from 'recoil';
import { userTokenState } from 'atoms/Atoms';
import Footer from 'components/common/footer/Footer';
import { useNavigate } from 'react-router-dom';

const SellerCenter = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navItems = ['판매중인 상품', '주문/배송', '문의/리뷰', '통계', '스토어 설정'];
  const token = useRecoilValue(userTokenState);
  const navigate = useNavigate();
  useEffect(() => {
    getSellerProductsAPI(token).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <>
      <SellerNav />
      <Wrapper>
        <main>
          <div className="titDiv">
            <h1>
              대시보드 <span>백엔드 글로벌</span>
            </h1>
            <button
              onClick={() => {
                navigate('/seller-center/upload ');
              }}
            >
              <img src="assets/icon-plus.svg" alt="" />
              상품 업로드
            </button>
          </div>
          <section>
            <nav>
              <ul>
                {navItems.map((text, index) => (
                  <StyledLi
                    key={text}
                    onClick={() => setActiveIndex(index)}
                    isActive={index === activeIndex}
                  >
                    {text}
                  </StyledLi>
                ))}
              </ul>
            </nav>
            <article>
              <ul className="tabUl white">
                <li className="productInfoTab">상품정보</li>
                <li className="priceTab">판매가격</li>
                <li className="amountTab">수량</li>
                <li className="deleteTab">삭제</li>
              </ul>

              <div className="item white">
                <img src="https://via.placeholder.com/70x70" alt="판매상품 이미지" />
                <div className="productInfoDiv">
                  <p className="productName">딥러닝 개발자 무릎 담요</p>
                  <p className="stock">재고 : 370개</p>
                </div>
                <p className="price">17,500원</p>
                <div className="editBtnDiv">
                  <button className="editBtn">수정</button>
                </div>
                <div className="delBtnDiv">
                  <button className="delBtn">삭제</button>
                </div>
              </div>
            </article>
          </section>
        </main>
      </Wrapper>
      <Footer isSellerCenter={true} />
    </>
  );
};

export default SellerCenter;

const Wrapper = styled.div`
  max-width: 90vw;
  margin: auto;
  .titDiv {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 50px 0;
    h1 {
      font-weight: bold;
      font-size: 40px;
      line-height: 44px;
      span {
        color: var(--main-color);
      }
    }
    button {
      background-color: var(--main-color);
      font-size: 24px;
      color: white;
      border-radius: 5px;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 32px;
        margin-right: 10px;
      }
    }
  }
  section {
    display: flex;
    gap: 30px;
    nav {
    }
    article {
      width: 100%;
      border: 1px solid #c4c4c4;
      background-color: #f2f2f2;
      min-height: 65vh;
      margin-bottom: 60px;
      .tabUl.white {
        background-color: white;
      }
      .tabUl {
        width: 100%;
        display: flex;
        text-align: center;
        font-size: 30px;
        line-height: 28px;
        border-bottom: 1px solid #c4c4c4;
        li {
          padding: 20px 0;
        }
        .productInfoTab {
          width: 55%;
        }
        .priceTab {
          width: 25%;
        }
        .amountTab {
          width: 15%;
        }
        .deleteTab {
          width: 15%;
        }
      }

      .item.white {
        background-color: white;
      }
      .item {
        display: flex;
        border-bottom: 1px solid #c4c4c4;
        img {
          width: 100px;
          border-radius: 50%;
          margin: 16px 30px;
        }
        .productInfoDiv {
          width: calc(55% - 145px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 18px;

          .productName {
            font-size: 26px;
            font-weight: bold;
            line-height: 22px;
          }
          .stock {
            color: #767676;
            font-size: 26px;
            line-height: 20px;
          }
        }
        .price,
        .editBtnDiv,
        .delBtnDiv {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .price {
          width: 25%;
          font-size: 20px;
          font-weight: bold;
        }
        .editBtnDiv {
          width: 15%;
        }
        .editBtn {
          padding: 12px 30px;
          font-size: 20px;
          background-color: var(--main-color);
          color: white;
          border-radius: 5px;
        }
        .delBtnDiv {
          width: 15%;
        }
        .delBtn {
          padding: 12px 30px;
          font-size: 20px;
          border: 1px solid #c4c4c4;
          border-radius: 5px;
        }
      }
    }
  }
`;
type StyledLiProps = {
  isActive: boolean;
};

const StyledLi = styled.li<StyledLiProps>`
  width: 250px;
  font-size: 26px;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 12px;
  border: 1px solid black;
  background-color: ${(props) => (props.isActive ? 'var(--main-color)' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : 'black')};
  &:hover {
    background-color: #effff3;
    color: black;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;
