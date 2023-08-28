import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './home/Home';
import ProductDetail from './productDeatil/ProductDetail';
import ShopCart from 'components/shopCart/ShopCart';
import Login from './login/Login';
import Join from './join/Join';

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
    </Routes>
  );
}
export default Pages;
