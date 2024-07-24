import { useState, useEffect } from 'react';
import { getAllProductsAPI } from '../api/product/getAllProductsAPI';
import { ProductDetailForm } from 'model/market';

// 상품 데이터 및 페이지 데이터 가져오는 커스텀 훅 (Home.tsx)
const MAX_PRODUCTS_PER_PAGE = 15;

export const useGetProducts = () => {
  const [products, setProducts] = useState<ProductDetailForm[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductsByPage = async (page: number) => {
    setIsLoading(true);
    try {
      const data = await getAllProductsAPI(page);
      if (data.results) {
        setProducts(data.results);
        setTotalPages(Math.ceil(data.count / MAX_PRODUCTS_PER_PAGE));
      }
    } catch (error) {
      console.error('상품 데이터를 가져오는데 문제가 있습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsByPage(1);
  }, []);

  return { products, totalPages, isLoading, fetchProductsByPage };
};
