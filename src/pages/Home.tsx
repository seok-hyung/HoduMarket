import React, { useState } from 'react';

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

const MAX_PRODUCTS_PER_PAGE = 15;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const { products, totalPages, fetchProductsByPage } = useGetProducts();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProductsByPage(page);
  };

  return (
    <>
      <Nav setSearchValue={setSearchValue} />
      <Carousel />
      {products.length > 0 ? (
        <Products products={products} />
      ) : (
        <Skeleton count={MAX_PRODUCTS_PER_PAGE} />
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Footer />
      <ScrollToTopBtn />
    </>
  );
};
export default Home;
