import './App.css';

import React, { useState, useEffect, useRef } from 'react';

import './css/Header.css'
import './css/Feature.css'
import './css/Products.css'
import './css/productpage.css'
import './css/orderpage.css'

import { Layout } from './components';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/index';
import ProductPageController from './pages/productpage';
import Contact from './pages/contact';
import Signup from './pages/signup';
import Login from './components/Login';
import Seller from './pages/seller';
import Order from './pages/order';
import ProfilePage from './pages/profile';
import SellerSignup from './pages/seller_signup';
import SellerLogin from './pages/seller_login';
import CategoryController from './pages/category';
import SearchController from './pages/search';
import OrderItem from './pages/order_page'
import Invoice from './pages/invoice';

import CartProvider from './components/Cart';

function App() {
  const [user, setUser] = useState(null);
  const getUserRef = useRef();
  const getUser = async () => {
    const token = window.localStorage.getItem('accessToken')
    const username = window.localStorage.getItem('username')
    const response = await fetch('http://127.0.0.1:8000/get-user-details/', {
      headers: {
        'Authorization': 'Bearer ' + token,
        'user': username,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data.data)

    } else {
      // Handle error response, e.g., display an error message
      //const { error } = await response.json();
      //alert('Username or Email doesnt exist')
      // Handle the error response
    }
  };
  const token = window.localStorage.getItem('accessToken')

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserRef.current = getUser;
    }
  }, [getUser]);

  const refresh = () => {
    if (token) {
      if (getUserRef.current) {
        getUserRef.current();
      }
    }

  };

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path='/auth/' element={<Layout user={user} />}>
            <Route path="sign-up" element={<Signup />} />
            <Route path="login-in" element={<Login />} />
            <Route path="seller-sign-up" element={<SellerSignup />} />
            <Route path="seller-login" element={<SellerLogin />} />
          </Route>
          <Route path='/products/' element={<Layout user={user} />}>
            <Route path=":name" element={<ProductPageController />} />
          </Route>
          <Route path='/categories/' element={<Layout user={user} />}>
            <Route path=":name" element={<CategoryController />} />
          </Route>
          <Route path='/search/' element={<Layout user={user} />}>
            <Route path=":name" element={<SearchController />} />
          </Route>
          <Route path='/cart/' element={<Layout user={user} />}>
            <Route path="cart" element={<Order refreshUser={refresh} />} />
          </Route>
          <Route path='/customer/' element={<Layout user={user} />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<OrderItem />} />
          </Route>
          <Route path='/payment-receipt/' element={<Layout user={user} />}>
            <Route path="invoice" element={<Invoice />} />
          </Route>
          <Route path='/seller-dashboard/'>
            <Route path="" element={<Seller />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
