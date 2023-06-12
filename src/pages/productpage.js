import ProductPage from '../components/ProductPage';
import React, { useState, useEffect } from 'react';
import { getProduct } from '.';

export const ProductPageController = () => {
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
            {product ? (
                <ProductPage data={product} />
            ) : (<p>Loading...</p>)}
        </div>
    )
}

export default ProductPageController;