import { useState, useEffect } from 'react';
import { getAllProductsAPI } from '../api/product/getAllProductsAPI';
import { ProductDetailForm } from 'model/market';

// 상품 데이터 및 페이지 데이터 가져오는 커스텀 훅 (Home.tsx)
export const useGetProducts = () => {
  const [products, setProducts] = useState<ProductDetailForm[]>([]);
  const fetchAllProducts = async () => {
    let currentPage = 1;
    let fetchedProducts: ProductDetailForm[] = [];
    let shouldContinue = true;
    while (shouldContinue) {
      const data = await getAllProductsAPI(currentPage);
      if (data && data.results) {
        fetchedProducts = [...fetchedProducts, ...data.results];
        if (data.results.length < 15) {
          shouldContinue = false;
        } else currentPage++;
      } else {
        console.error('데이터를 제대로 불러오지 못했습니다.');
        shouldContinue = false;
      }
    }
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return { products };
};
