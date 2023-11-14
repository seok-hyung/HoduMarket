import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import ProductDetail from 'pages/ProductDetail';
import Login from 'pages/Login';
import Join from 'pages/Join';
import Cart from 'pages/Cart';
import Page404 from 'pages/Page404';
import Payment from 'pages/Payment';
import SellerCenter from 'pages/SellerCenter';
import UploadProduct from 'pages/UploadProduct';
import EditProduct from 'pages/EditProduct';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/page404" element={<Page404 />} />
      <Route path="/seller-center" element={<SellerCenter />} />
      <Route path="/seller-center/upload" element={<UploadProduct />} />
      <Route path="/seller-center/edit/:product_id" element={<EditProduct />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
