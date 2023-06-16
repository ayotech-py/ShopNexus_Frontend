import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';


const Layout = ({ children, user }) => {

    return (
        <div>
            <header>
                <Header user={user} />
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