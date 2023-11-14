import React from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { product_id } = useParams();
  console.log(product_id);
  return <div></div>;
};

export default EditProduct;
