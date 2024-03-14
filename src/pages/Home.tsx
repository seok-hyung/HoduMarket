import React, { useEffect, useState } from 'react';

// 컴포넌트
import Nav from 'components/common/nav/Nav';
import Carousel from 'components/common/carousel/Carousel';
import Products from 'components/common/products/Products';
import Footer from 'components/common/footer/Footer';
import Pagination from 'components/common/pagination/Pagiation';
import ScrollToTopBtn from 'components/common/scrollToTopBtn/ScrollToTopBtn';
import Skeleton from 'components/common/skeleton/Skeleton';

// 커스텀 훅
import { useGetProducts } from 'hooks/UseGetProducts';
import { getSearchProducstAPI } from 'api/product/getSearchProductsAPI';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const { products } = useGetProducts(); // 전체 상품 데이터 가져오기

  const filteredProducts = products.filter((product) =>
    product.product_name.includes(searchValue),
  );
  useEffect(() => {
    getSearchProducstAPI(searchValue).then((res) => {
      console.log(res);
    });
  }, [searchValue]);
  const MAX_PRODUCTS_PER_PAGE = 15; // 페이지당 최대 상품 수 명시
  const totalPage = Math.ceil(filteredProducts.length / MAX_PRODUCTS_PER_PAGE);
  // 현재 페이지에 해당하는 상품들만 선택
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * MAX_PRODUCTS_PER_PAGE,
    currentPage * MAX_PRODUCTS_PER_PAGE,
  );

  return (
    <>
      <Nav setSearchValue={setSearchValue} />
      <Carousel />
      {products.length > 0 ? (
        <Products products={paginatedProducts} />
      ) : (
        <Skeleton count={MAX_PRODUCTS_PER_PAGE} />
        // <p>Loading...</p>
      )}
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <Footer />
      <ScrollToTopBtn />
    </>
  );
};
export default Home;
