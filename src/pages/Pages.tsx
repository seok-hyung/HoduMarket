import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './home/Home';
import ProductDetail from './productDeatil/ProductDetail';

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<ProductDetail />} />
    </Routes>
  );
}
export default Pages;
