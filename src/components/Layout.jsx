import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';


const Layout = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const token = window.localStorage.getItem('accessToken')
            const username = window.localStorage.getItem('username')
            console.log(token)
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

        getUser();
    }, []);
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