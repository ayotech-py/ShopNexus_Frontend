import './App.css';

import React from 'react';

import './css/Header.css'
import './css/Feature.css'
import './css/Products.css'
import './css/productpage.css'
import './css/orderpage.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import { Layout } from './components';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/index';
import ProductPageController from './pages/productpage';
import OrderPage from './components/Order';
import Contact from './pages/contact';
import Signup from './pages/signup';
import Login from './components/Login';
import Order from './pages/order';

import CartProvider from './components/Cart';

function App() {
  return (
    <CartProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path='/categories/' element={<Layout />}>

          </Route>
          <Route path='/auth/' element={<Layout />}>
            <Route path="sign-up" element={<Signup />} />
            <Route path="login-in" element={<Login />} />
          </Route>
          <Route path='/products/' element={<Layout />}>
            <Route path=":name" element={<ProductPageController />} />
          </Route>
          <Route path='/cart/' element={<Layout />}>
            <Route path="cart" element={<Order />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
