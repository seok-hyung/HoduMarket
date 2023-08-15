import React, { useEffect, useState } from 'react';

import Nav from 'components/common/nav/Nav';

import { Route, Routes } from 'react-router-dom';
import { Product } from 'model/product';
import { getProductAPI } from '../../api/product/getProductAPI';
import { styled } from 'styled-components';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const carouselImg = products.map((item: Product) => item.results.image);
  useEffect(() => {
    getProductAPI()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log('상품 데이터를 불러오는데 에러가 발생했습니다', error);
      });
  });
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<></>} />
      </Routes>
    </>
  );
};

export default Home;
