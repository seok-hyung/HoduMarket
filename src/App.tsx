import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import ProductDetail from 'pages/ProductDetail';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Cart from 'pages/Cart';
import Page404 from 'pages/Page404';
import Payment from 'pages/Payment';
import SellerCenter from 'pages/SellerCenter';
import UploadProduct from 'pages/UploadProduct';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<SignUp />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/page404" element={<Page404 />} />
      <Route path="/seller-center" element={<SellerCenter />} />
      <Route path="/seller-center/upload" element={<UploadProduct />} />
      {/* 상품 수정 페이지 */}
      <Route path="/seller-center/upload/:product_id" element={<UploadProduct />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
