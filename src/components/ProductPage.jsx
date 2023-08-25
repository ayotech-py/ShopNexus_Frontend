import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "mdb-react-ui-kit";

const ProductPage = ({ data, user }) => {
  const { name } = useParams();
  const customer = window.localStorage.getItem("username");

  var product = {};
  for (let i = 0; i < data.length; i++) {
    if (data[i]["id"] === name) {
      product = data[i];
      break;
    }
  }

  const { addToCart, cart, updateCart } = useContext(CartContext);
  const token = window.localStorage.getItem("accessToken");
  const username = window.localStorage.getItem("username");
  const handleAddToCart = (cartname) => {
    if (user) {
      const handleUser = async () => {
        try {
          const response = await fetch(
            "https://aaayotech.pythonanywhere.com/orderitems/",
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + token,
                user: username,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                product: cartname["id"],
                customer: customer,
              }),
            }
          );

          let data = await response.json();
          if (response.status === 200) {
            alert(data["message"]);
          } else {
            alert(data["message"]);
          }
        } catch (error) {
          // Handle fetch error, e.g., display an error message
        }
      };
      handleUser();
      updateCart(cart);
    } else {
      var cart_id = [];
      if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
          cart_id.push(cart[i]["id"]);
        }
      }
      if (cart_id.includes(cartname["id"])) {
        //do something("ture");
      } else {
        cartname["quantity"] = quantity;
        addToCart(cartname);
      }
    }
  };

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
    <div className="product-page-container" style={{ marginTop: "70px" }}>
      <br />
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="product-page">
                <div className="product-image">
                  <MDBCarousel>
                    <MDBCarouselItem
                      className="w-100 d-block carousel-image"
                      itemId={1}
                      src={product["image"]}
                      alt="..."
                    />
                    <MDBCarouselItem
                      className="w-100 d-block carousel-image"
                      itemId={2}
                      src={product["img_1"]}
                      alt="..."
                    />
                    <MDBCarouselItem
                      className="w-100 d-block carousel-image"
                      itemId={3}
                      src={product["img_2"]}
                      alt="..."
                    />
                    <MDBCarouselItem
                      className="w-100 d-block carousel-image"
                      itemId={4}
                      src={product["img_3"]}
                      alt="..."
                    />
                  </MDBCarousel>
                  <br />
                  <div
                    className="my-slide sub-image"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <MDBCol lg="3" md="4" className="mb-4">
                      <img
                        src={product["image"]}
                        className="img-fluid rounded"
                        alt=""
                      />
                    </MDBCol>

                    <MDBCol lg="3" md="4" className="mb-4">
                      <img
                        src={product["img_1"]}
                        className="img-fluid rounded"
                        alt=""
                      />
                    </MDBCol>

                    <MDBCol lg="3" md="4" className="mb-4">
                      <img
                        src={product["img_2"]}
                        className="img-fluid rounded"
                        alt=""
                      />
                    </MDBCol>
                    <MDBCol lg="3" md="4" className="mb-4">
                      <img
                        src={product["img_3"]}
                        className="img-fluid rounded"
                        alt=""
                      />
                    </MDBCol>
                  </div>
                </div>

                <div className="product-detail">
                  <div className=" seller-badge d-flex align-items-center p-3">
                    <div
                      className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                      style={{ width: "35px", height: "35px" }}
                    >
                      <img
                        src={product["seller"]["business_logo"]}
                        alt="product"
                      />
                    </div>
                    <p className="lead mb-0">
                      {product["seller"]["business_name"]}
                    </p>
                  </div>
                  <br />
                  <MDBCol md="12">
                    <h3>{product["name"]}</h3>
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
                    <p
                      className="text mb-4 mb-md-0"
                      style={{
                        width: "100%",
                        fontSize: "18px",
                      }}
                    >
                      {product["description"]}
                    </p>
                  </MDBCol>

                  <div
                    className="my-btn price-section"
                    style={{
                      color: "red",
                    }}
                  >
                    <MDBTypography
                      tag="h3"
                      style={{ fontSize: "30px", fontFamily: "georgia" }}
                    >
                      Price: <span>&#8358;</span>
                      {product["price"]
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </MDBTypography>

                    <MDBBtn
                      className="my-sub-btn"
                      color="dark"
                      block
                      size="lg"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </MDBBtn>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default ProductPage;
