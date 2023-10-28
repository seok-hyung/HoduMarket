import React, { useEffect, useState } from 'react';

// 컴포넌트
import Nav from 'components/common/nav/Nav';
import Carousel from 'components/common/carousel/Carousel';
import Products from 'components/common/products/Products';
import Footer from 'components/common/footer/Footer';
import Pagination from 'components/common/pagination/Pagiation';

// 커스텀 훅
import { useGetProducts } from 'hooks/UseGetProducts';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { products, totalPage } = useGetProducts(currentPage);

  return (
    <>
      <Nav />
      <Carousel />
      {products.length > 0 ? <Products products={products} /> : <p>Loading...</p>}
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <Footer />
    </>
  );
};
export default Home;
