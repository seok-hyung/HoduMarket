import { useState, useEffect } from 'react';
import { getAllProductsAPI } from '../api/product/getAllProductsAPI';
import { ProductDetail } from 'model/market';

// 상품 데이터 및 페이지 데이터 가져오는 커스텀 훅 (Home.tsx)
export const useGetProducts = (currentPage: number) => {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    getAllProductsAPI(currentPage)
      .then((data) => {
        setProducts(data.results);
        setTotalPage(Math.ceil(data.count / 15));
      })
      .catch((error) => {
        console.log('상품 데이터를 불러오는데 에러가 발생했습니다', error);
      });
  }, [currentPage]);

  return { products, totalPage };
};
