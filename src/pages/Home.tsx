import React, { useEffect, useState } from 'react';

// Type Model
import { ProductDetail } from 'model/market';

// API
import { getAllProductsAPI } from '../api/product/getAllProductsAPI';

// 컴포넌트
import Nav from 'components/common/nav/Nav';
import Carousel from 'components/common/carousel/Carousel';
import Products from 'components/common/products/Products';
import Footer from 'components/common/footer/Footer';

// 스타일
import { styled } from 'styled-components';

const Home = () => {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  // const productImg = products.map((obj) => obj?.image); // 상품 이미지 배열
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    getAllProductsAPI(currentPage)
      .then((data) => {
        setProducts(data.results);
        console.log(data);
        setTotalPage(Math.ceil(data.count / 15));
      })
      .catch((error) => {
        console.log('상품 데이터를 불러오는데 에러가 발생했습니다', error);
      });
  }, [currentPage]);

  // 페이지 버튼들을 생성합니다.
  const pageButtons = [];
  for (let i = 1; i <= totalPage; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={currentPage === i ? 'active' : ''}
      >
        {i}
      </button>,
    );
  }

  return (
    <>
      <Nav />
      <Carousel />
      {products.length > 0 ? <Products products={products} /> : <p>Loading...</p>}
      <PageBoxDiv>{pageButtons}</PageBoxDiv>
      <Footer />
    </>
  );
};
export default Home;

const PageBoxDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  button {
    font-size: 30px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px 15px;
    margin: 0px 20px;
  }
  .active {
    background-color: lightgrey;
  }
`;
