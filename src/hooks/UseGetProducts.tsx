import { useState, useEffect } from 'react';
import { getAllProductsAPI } from '../api/product/getAllProductsAPI';
import { ProductDetailForm } from 'model/market';

// 상품 데이터 및 페이지 데이터 가져오는 커스텀 훅 (Home.tsx)
export const useGetProducts = () => {
  const [products, setProducts] = useState<ProductDetailForm[]>([]);

  const fetchAllProducts = async () => {
    let currentPage = 1;
    let fetchedProducts: ProductDetailForm[] = [];
    const MAX_PRODUCTS_PER_PAGE = 15; // 페이지당 최대 상품 수 명시
    let hasMoreProducts = true;
    while (hasMoreProducts) {
      const data = await getAllProductsAPI(currentPage);
      if (data.results) {
        fetchedProducts = [...fetchedProducts, ...data.results];
      }
      if (data.results.length < MAX_PRODUCTS_PER_PAGE) {
        hasMoreProducts = false;
      } else currentPage++;
    }
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return { products };
};
