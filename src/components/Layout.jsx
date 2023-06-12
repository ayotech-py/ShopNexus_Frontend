import React from "react";

import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';


const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <Header count={5} />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout