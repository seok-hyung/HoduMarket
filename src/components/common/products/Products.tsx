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
      <ProductContainerUl>
        {products.map((item) => {
          const productId = item.product_id; // 클릭한 상품의 id값
          return (
            <ProductLi
              key={productId}
              onClick={() => {
                navigate(`/detail/${productId}`, { state: { item } });
              }}
            >
              <img src={`${item.image}`} alt="상품 이미지" />
              <p className="store-name-p">{item.store_name}</p>
              <h2 className="product-name-h2">{item.product_name}</h2>
              <p className="price-p">
                {intl.format(item.price)}
                <span className="won">원</span>
              </p>
            </ProductLi>
          );
        })}
      </ProductContainerUl>
    </ProductWrapperDiv>
  );
};

export default Products;

const ProductWrapperDiv = styled.div`
  margin: 80px 320px;
`;
const ProductContainerUl = styled.ul`
  max-width: 1400px;
  display: flex;
  flex-wrap: wrap;
  gap: 70px;
  justify-content: center;
  margin: auto;
`;

const ProductLi = styled.li`
  flex-basis: calc(33.33% - 60px);
  min-width: calc(33.33% - 60px);
  max-width: calc(33.33% - 60px);
  margin-bottom: 80px;
  cursor: pointer;
  img {
    width: 100%;
    height: 320px;
  }
  .store-name-p {
    color: var(--main-disabled-color);
    font-size: 28px;
    margin: 16px 0 10px 0;
  }
  .product-name-h2 {
    font-size: 34px;
    color: var(--main-text-color);
    margin-bottom: 10px;
  }
  .price-p {
    font-size: 32px;
    font-weight: bold;
    color: var(--main-text-color);
    .won {
      font-weight: normal;
      font-size: 16px;
    }
  }
`;
