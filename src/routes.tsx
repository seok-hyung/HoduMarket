import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from 'pages/Home';
import ProductDetail from 'pages/ProductDetail';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Cart from 'pages/Cart';
import Page404 from 'pages/Page404';
import Payment from 'pages/Payment';
import SellerCenter from 'pages/SellerCenter';
import UploadProduct from 'pages/UploadProduct';
import Layout from 'components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Page404 />,
    // element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'detail/:productId',
        element: <ProductDetail />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'join',
        element: <SignUp />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'payment',
        element: <Payment />,
      },
      {
        path: 'page404',
        element: <Page404 />,
      },
      {
        path: 'seller-center',
        element: <SellerCenter />,
      },
      {
        path: 'seller-center/upload',
        element: <UploadProduct />,
      },
      {
        path: 'seller-center/upload/:product_id',
        element: <UploadProduct />,
      },
      {
        path: 'user/login',
        element: <Login />,
      },
      {
        path: 'user/signup',
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
