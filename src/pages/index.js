import React, { useState, useEffect } from 'react';

import Featured from '../components/Featured';
import Products from '../components/Products';

const Home = () => {
    const [product, setProduct] = useState(null);

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

    return (
        <div>
            <Featured />
            {product ? (
                <Products data={product} />
            ) : (<p>Loading...</p>)}
        </div>
    )
}

export const getProduct = async () => {
    const response = await fetch('http://127.0.0.1:8000/products/',
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