import React from 'react';
import Nav from 'components/common/nav/Nav';
import CartList from 'components/cartList/CartList';
import Footer from 'components/common/footer/Footer';

const Cart = () => {
  return (
    <>
      <Nav />
      <CartList />
      <Footer />
    </>
  );
};

export default Cart;
