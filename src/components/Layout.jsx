import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, Link } from "react-router-dom";

const Layout = ({ children, user }) => {
  return (
    <div>
      <header>
        <Header user={user} />
        <div className="main-content">
          <Outlet />
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
