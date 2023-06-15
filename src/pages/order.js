import React, { useState, useEffect } from 'react';

import OrderPage from "../components/Order";


const Order = () => {
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
                alert('incorect')
                // Handle the error response
            }
        };

        getUser();
    }, []);
    return (
        <div>
            <OrderPage user={user} />
        </div>
    )
}

export default Order