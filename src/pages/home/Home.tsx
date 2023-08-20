import React, { useEffect, useState } from 'react';

// import { Route, Routes } from 'react-router-dom';
import { ProductResults } from 'model/market';
import { getProductAPI } from '../../api/product/getProductAPI';

// 컴포넌트
import Nav from 'components/common/nav/Nav';
import Carousel from 'components/common/carousel/Carousel';
import Products from 'components/common/products/Products';
import Footer from 'components/common/footer/Footer';

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductResults[]>([]);
  const productImg = products.map((obj) => obj?.image);
  console.log(products);

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
      <Products goods={products} />
      <Footer />
    </>
  );
};

export default Home;
