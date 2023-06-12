import React, { useContext, useState } from "react";
import { useParams } from 'react-router-dom';
import { CartContext } from "./Cart";

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCarousel,
    MDBCarouselItem,
    MDBIcon,
    MDBBtn,
    MDBInput,
    MDBTypography,

} from 'mdb-react-ui-kit';

const ProductPage = ({ data }) => {
    const { name } = useParams();
    var product = {}
    for (let i = 0; i < data.length; i++) {
        if (data[i]['name'] === name) {
            product = data[i]
            break;
        }
    }

    const { addToCart, cart } = useContext(CartContext);
    const handleAddToCart = (cartname) => {

        if (cart.includes(cartname)) {
            console.log('true')
            console.log(cart)
        } else {
            cartname['quantity'] = quantity
            addToCart(cartname);
            console.log(cart)
        }
    }
    // Send product details to the backend API
    // You can make an API request here using libraries like Axios or Fetch
    // Example:
    // axios.post('/api/cart', product);

    const [quantity, setQuantity] = useState(1);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };


    return (
        <div className="product-page-container">
            <br />
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <MDBCard>
                            <MDBCardBody className='product-page'>
                                <div className='product-image'>
                                    <MDBCarousel>
                                        <MDBCarouselItem
                                            className='w-100 d-block'
                                            itemId={1}
                                            src={product['image']}
                                            alt='...'
                                        />
                                        <MDBCarouselItem
                                            className='w-100 d-block'
                                            itemId={2}
                                            src={product['img_1']}
                                            alt='...'
                                        />
                                        <MDBCarouselItem
                                            className='w-100 d-block'
                                            itemId={3}
                                            src={product['img_2']}
                                            alt='...'
                                        />
                                        <MDBCarouselItem
                                            className='w-100 d-block'
                                            itemId={4}
                                            src={product['img_3']}
                                            alt='...'
                                        />
                                    </MDBCarousel>
                                    <br />
                                    <MDBRow className='my-slide'>
                                        <MDBCol lg='3' md='12' className='mb-4'>
                                            <img src={product['image']} className='img-fluid rounded' alt='' />
                                        </MDBCol>

                                        <MDBCol lg='3' md='4' className='mb-4'>
                                            <img src={product['img_1']} className='img-fluid rounded' alt='' />
                                        </MDBCol>

                                        <MDBCol lg='3' md='4' className='mb-4'>
                                            <img src={product['img_2']} className='img-fluid rounded' alt='' />
                                        </MDBCol>
                                        <MDBCol lg='3' md='4' className='mb-4'>
                                            <img src={product['img_3']} className='img-fluid rounded' alt='' />
                                        </MDBCol>
                                    </MDBRow>
                                </div>

                                <div className="product-detail">
                                    <div className=" seller-badge d-flex align-items-center p-3">
                                        <div
                                            className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                                            style={{ width: "35px", height: "35px" }}
                                        ><img src={product['seller']['business_logo']} alt="product" /></div>
                                        <p className="lead mb-0">{product['seller']['business_name']}</p>
                                    </div>
                                    <MDBCol md="12">
                                        <h5>{product['name']}</h5>
                                        <div className="d-flex flex-row">
                                            <div className="text-danger mb-1 me-2">
                                                <MDBIcon fas icon="star" />
                                                <MDBIcon fas icon="star" />
                                                <MDBIcon fas icon="star" />
                                                <MDBIcon fas icon="star" />
                                            </div>
                                            <span>310</span>
                                        </div>
                                        <div className="mt-1 mb-0 text-muted small">
                                            <span>100% cotton</span>
                                            <span className="text-primary"> • </span>
                                            <span>Light weight</span>
                                            <span className="text-primary"> • </span>
                                            <span>
                                                Best finish
                                                <br />
                                            </span>
                                        </div>
                                        <div className="mb-2 text-muted small">
                                            <span>Unique design</span>
                                            <span className="text-primary"> • </span>
                                            <span>For men</span>
                                            <span className="text-primary"> • </span>
                                            <span>
                                                Casual
                                                <br />
                                            </span>
                                        </div>
                                        <p className="text mb-4 mb-md-0">
                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                                        </p>
                                    </MDBCol>
                                    <MDBTypography tag="h3">Price: ${product['price']}</MDBTypography>
                                    <MDBCol lg="4" md="4" className="mb-4 mb-lg-0">
                                        <div className="d-flex mb-4" style={{ maxWidth: "200px" }}>
                                            <MDBBtn className="px-3 me-2" onClick={handleDecrease}>
                                                <MDBIcon fas icon="minus" />
                                            </MDBBtn>
                                            <MDBInput defaultValue={1} min={0} type="number" label="Quantity" value={quantity} />
                                            <MDBBtn className="px-3 ms-2" onClick={handleIncrease}>
                                                <MDBIcon fas icon="plus" />
                                            </MDBBtn>
                                        </div>
                                    </MDBCol>
                                    <div className="d-flex justify-content-between mb-5 total">
                                        <MDBTypography tag="h3" className="text-uppercase">
                                            Total price
                                        </MDBTypography>
                                        <MDBTypography tag="h3">${product['price'] * quantity}.00</MDBTypography>
                                    </div>
                                    <div className='my-btn'>
                                        <MDBBtn className="my-sub-btn" color="dark" block size="lg" onClick={() => handleAddToCart(product)}>Add to Cart</MDBBtn>
                                    </div>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div >
    )
}

export default ProductPage;
