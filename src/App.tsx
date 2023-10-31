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
    </Routes>
  );
}

export default App;
