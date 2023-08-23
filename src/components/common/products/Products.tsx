import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsProps } from 'model/market';
import * as S from './Products.style';

// const Products: React.FC<ProductsProps> = ({ goods }) => {
const Products = ({ products }: ProductsProps) => {
  const intl = new Intl.NumberFormat();
  const navigate = useNavigate();
  return (
    <S.ProductWrapperDiv>
      <S.ProductContainerUl>
        {products.map((item) => {
          const productId = item.product_id; // 클릭한 상품의 id값
          return (
            <S.ProductLi
              key={productId}
              onClick={() => {
                navigate(`/detail/${productId}`, { state: { item } });
              }}
            >
              <S.ProductImg src={`${item.image}`} alt="상품 이미지" />
              <S.StoreNameP>{item.store_name}</S.StoreNameP>
              <S.ProductNameH2>{item.product_name}</S.ProductNameH2>
              <S.ProductPriceP>
                {intl.format(item.price)}
                <S.WonSpan>원</S.WonSpan>
              </S.ProductPriceP>
            </S.ProductLi>
          );
        })}
      </S.ProductContainerUl>
    </S.ProductWrapperDiv>
  );
};

export default Products;
