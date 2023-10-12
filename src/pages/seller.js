import React, { useState, useEffect } from 'react';
import SellerDashboard from "../components/Seller";


const Seller = () => {
    const [seller, setSeller] = useState(null);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        //do something("run nahhh")
        const getSeller = async () => {
            const token = window.localStorage.getItem('accessTokenSeller');
            const username = window.localStorage.getItem('username');
            const response = await fetch('https://shop-nexus-api.vercel.app/seller/', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'user': username,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setSeller(data);
                //do something(data)
            } else {
                // Handle error response, e.g., display an error message
                // const { error } = await response.json();
                // alert('Username or Email doesn't exist');
                // Handle the error response
            }
        };

        getSeller();
    }, []);

    useEffect(() => {
        //do something("run nahhh")
        const getSellerProduct = async () => {
            const token = window.localStorage.getItem('accessTokenSeller');
            const username = window.localStorage.getItem('username');
            const response = await fetch('https://shop-nexus-api.vercel.app/seller-product/', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'user': username,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
                //do something(data)
            } else {
                // Handle error response, e.g., display an error message
                // const { error } = await response.json();
                // alert('Username or Email doesn't exist');
                // Handle the error response
            }
        };

        getSellerProduct();
    }, []);



    //do something(product)
    return (
        <div>
            <SellerDashboard user={seller} products={product} />
        </div>
    )
}

export default Seller