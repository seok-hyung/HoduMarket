import React, { useState } from 'react';

// 컴포넌트
import Nav from 'components/common/nav/Nav';
import Carousel from 'components/common/carousel/Carousel';
import Products from 'components/common/products/Products';
import Footer from 'components/common/footer/Footer';
import Pagination from 'components/common/pagination/Pagiation';

// 커스텀 훅
import { useGetProducts } from 'hooks/UseGetProducts';
import ScrollToTopBtn from 'components/common/scrollToTopBtn/ScrollToTopBtn';
import Skeleton from 'components/common/skeleton/Skeleton';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const { products } = useGetProducts(); // 전체 상품 데이터를 가져옵니다.

  const filteredProducts = products.filter((product) =>
    product.product_name.includes(searchValue),
  );
  const totalPage = Math.ceil(filteredProducts.length / 15);
  // 현재 페이지에 해당하는 상품들만 선택합니다.
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * 15,
    currentPage * 15,
  );
  return (
    <>
      <Nav setSearchValue={setSearchValue} />
      <Carousel />
      {products.length > 0 ? (
        <Products products={paginatedProducts} />
      ) : (
        <Skeleton count={15} />
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
