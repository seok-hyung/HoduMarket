import React, { useEffect, useState } from 'react';

import Nav from 'components/common/nav/Nav';
import Carousel from 'components/common/carousel/Carousel';

// import { Route, Routes } from 'react-router-dom';
import { ProductResults } from 'model/market';
import { getProductAPI } from '../../api/product/getProductAPI';

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductResults[]>([]);
  const productImg = products.map((obj) => obj?.image);

  useEffect(() => {
    getProductAPI()
      .then((data) => {
        setProducts(data.results);
      })
      .catch((error) => {
        console.log('상품 데이터를 불러오는데 에러가 발생했습니다', error);
      });
  }, []);

  return (
    <>
      <Nav />
      <Carousel images={productImg} />
    </>
  );
};

export default Home;
