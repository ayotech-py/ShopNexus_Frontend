import React, { useContext } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { CartContext } from "./Cart";

const Products = ({ data }) => {
    const { addToCart, cart } = useContext(CartContext);

    return (
        <div class="product">
            <MDBContainer fluid className="my-5">
                <MDBRow>
                    {data.map((product) =>
                        <MDBCol md="12" lg="3" className="mb-4 mb-lg-4">
                            <MDBCard>
                                <div className="d-flex justify-content-between p-3">
                                    <p className="lead mb-0">{product['seller']['business_name']}</p>
                                    <div
                                        className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                                        style={{ width: "35px", height: "35px" }}
                                    ><img src={product['seller']['business_logo']} alt="product" /></div>
                                </div>
                                <Link to={`/products/${product['id']}`}>
                                    <MDBCardImage
                                        src={product['image']}
                                        position="top"
                                        alt="Laptop"
                                    />
                                </Link>
                                <MDBCardBody>
                                    <div className="d-flex justify-content-between">
                                        <p className="small">
                                            <a href="#!" className="text-muted">
                                                {product['category']}
                                            </a>
                                        </p>
                                        <p className="small text-danger">
                                            <s>${product['price'] - 1000}</s>
                                        </p>
                                    </div>

                                    <div className="d-flex justify-content-between mb-3">
                                        <h6 className="mb-0">{product['name']}</h6>
                                        <h6 className="text-dark mb-0">${product['price']}</h6>
                                    </div>

                                    <div class="d-flex justify-content-between mb-2">
                                        <p class="text-muted mb-0">
                                            Available: <span class="fw-bold">{product['count']}</span>
                                        </p>
                                        <div class="ms-auto text-warning">
                                            <MDBIcon fas icon="star" />
                                            <MDBIcon fas icon="star" />
                                            <MDBIcon fas icon="star" />
                                            <MDBIcon fas icon="star" />
                                            <MDBIcon fas icon="star" />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center align-items-center pb-2 mb-4 my-btn">
                                        <MDBBtn className="mb-5" color="primary" onClick={() => handleAddToCart(product, cart, addToCart)}>Add to Cart</MDBBtn>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    )}

                </MDBRow>
            </MDBContainer>
        </div >
    )
}


const handleAddToCart = (cartname, cart, addToCart) => {
    if (cart.includes(cartname)) {
        console.log('true')
    } else {
        cartname['quantity'] = 1
        addToCart(cartname);
    }

    // Send product details to the backend API
    // You can make an API request here using libraries like Axios or Fetch
    // Example:
    // axios.post('/api/cart', product);
};

export default Products