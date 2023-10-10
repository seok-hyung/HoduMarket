import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './home/Home';
import ProductDetail from './productDeatil/ProductDetail';
// import ShopCart from 'pages/shopCart/ShopCart';
import Login from './login/Login';
import Join from './join/Join';
import Cart from './cart/Cart';

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}
export default Pages;
