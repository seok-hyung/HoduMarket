import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsProps } from 'model/market';
import * as S from './Products.style';

const Products: React.FC<ProductsProps> = ({ goods }) => {
  const intl = new Intl.NumberFormat();
  const navigate = useNavigate();
  return goods.length > 0 ? (
    <S.ProductWrapperDiv>
      <S.ProductContainerUl>
        {goods.map((item) => {
          return (
            <S.ProductLi
              key={item.product_id}
              onClick={() => {
                navigate(`/detail/${item.product_id}`);
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
  ) : (
    <p>Loading...</p>
  );
};

export default Products;
