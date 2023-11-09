import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsProps } from 'model/market';
import { styled } from 'styled-components';

// const Products: React.FC<ProductsProps> = ({ goods }) => {
const Products = ({ products }: ProductsProps) => {
  const intl = new Intl.NumberFormat();
  const navigate = useNavigate();
  return (
    <ProductWrapperDiv>
      <ul className="productsUl">
        {products.map((item) => {
          const productId = item.product_id; // 클릭한 상품의 id값
          return (
            <li
              key={productId}
              onClick={() => {
                navigate(`/detail/${productId}`, { state: { item } });
              }}
            >
              <img src={`${item.image}`} alt="상품 이미지" />
              <div className="productInfo">
                <p className="store-name-p">{item.store_name}</p>
                <h2 className="product-name-h2">{item.product_name}</h2>
                <p className="price-p">
                  {intl.format(item.price)}
                  <span className="won">원</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </ProductWrapperDiv>
  );
};

export default Products;

const ProductWrapperDiv = styled.div`
  margin-top: 100px;
  .productsUl {
    max-width: 70vw;
    display: flex;
    gap: 70px;
    justify-content: space-between;
    margin: auto;
    flex-wrap: wrap;

    li {
      flex-basis: calc(33% - 60px);
      border-radius: 10px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      cursor: pointer;
      img {
        border-radius: 10px;
        width: 100%;
        height: auto; // 높이를 자동으로 조절하도록 변경했습니다.
        object-fit: cover; // 이미지가 컨테이너를 채우도록 설정했습니다.
        aspect-ratio: 1;
        /* border: 1px solid rgb(196, 196, 196); */
      }
      .productInfo {
        padding: 30px;
        .store-name-p {
          color: var(--main-disabled-color);
          font-size: 28px;
          margin-bottom: 16px;
        }
        .product-name-h2 {
          font-size: 34px;
          color: var(--main-text-color);
          margin-bottom: 14px;
        }
        .price-p {
          font-size: 32px;
          font-weight: bold;
          color: var(--main-text-color);
          .won {
            font-weight: normal;
            margin-left: 5px;
            font-size: 22px;
          }
        }
      }

      @media (max-width: 1600px) {
        // 화면 너비가 900px 이하일 때 한 줄에 두 개의 상품이 나타나도록 설정합니다.
        flex-basis: calc(50% - 60px);
      }

      @media (max-width: 1000px) {
        // 화면 너비가 600px 이하일 때 한 줄에 하나의 상품이 나타나도록 설정합니다.
        flex-basis: 100%;
      }
    }
  }
`;
