import React, { useState, useEffect } from 'react';

import Featured from '../components/Featured';
import Products from '../components/Products';

const Home = () => {
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getProduct();
                setProduct(result.product);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const getUser = async () => {
            const token = window.localStorage.getItem('accessToken')
            const username = window.localStorage.getItem('username')
            const response = await fetch('https://shop-nexus-fpb869sps-ayotech-py.vercel.app/get-user-details/', {
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
                // Handle the error response
            }
        };

        getUser();
    }, []);

    return (
        <div>
            <Featured />
            {product ? (
                <Products data={product} user={user} />
            ) : (<p>Loading...</p>)}
        </div>
    )
}

export const getProduct = async () => {
    const response = await fetch('https://shop-nexus-fpb869sps-ayotech-py.vercel.app/products/',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
    const product = await response.json()
    return { product };
}

export default Home