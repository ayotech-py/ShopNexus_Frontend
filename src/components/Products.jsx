import React, { useContext, useState } from "react";
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

const Products = ({ data, user }) => {
  const { addToCart, cart, updateCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const customer = window.localStorage.getItem("username");
  const token = window.localStorage.getItem("accessToken");
  const username = window.localStorage.getItem("username");

  const handleAddToCart = (cartname) => {
    if (user) {
      const handleUser = async () => {
        try {
          const response = await fetch(
            "https://shop-nexus-api.vercel.app/orderitems/",
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
            //alert(data["message"]);
          } else {
            //alert(data["message"]);
          }
        } catch (error) {
          // Handle fetch error, e.g., display an error message
        }
      };
      handleUser();
    }
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
  };

  return (
    <div class="product">
      <MDBContainer fluid className="my-5">
        <div className="product-grid">
          {data.map((product) => (
            <MDBCol className="product-card" style={{ height: "100%" }}>
              <MDBCard>
                <div className="d-flex justify-content-between align-items-center business-card">
                  <p className="lead mb-0 business-name">
                    {product["seller"]["business_name"].length > 15
                      ? product["seller"]["business_name"].substring(0, 13) +
                        "..."
                      : product["seller"]["business_name"]}
                  </p>
                  <div
                    className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                    style={{ width: "35px", height: "35px" }}
                  >
                    <img
                      src={product["seller"]["business_logo"]}
                      alt="product"
                    />
                  </div>
                </div>
                <Link to={`/products/${product["id"]}`}>
                  <MDBCardImage
                    src={product["image"]}
                    position="top"
                    alt="Laptop"
                  />
                </Link>
                <MDBCardBody className="product-card-body">
                  <div className="d-flex justify-content-between">
                    <p className="small">
                      <a href="#!" className="text-muted">
                        {window.innerWidth < 650
                          ? product["category"].length > 11
                            ? product["category"].substring(0, 9) + "..."
                            : product["category"]
                          : product["category"]}
                      </a>
                    </p>
                    <p className="small text-danger my-price">
                      <s style={{ color: "black" }}>
                        <span>&#8358;</span>{" "}
                        {parseInt(
                          product["price"] * 0.1 + parseInt(product["price"])
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </s>
                    </p>
                  </div>

                  <div className="mb-3" style={{ textAlign: "center" }}>
                    <h6 className="mb-0 my-product-name">
                      {product["name"].substring(0, 17)} ...
                    </h6>
                    <h6
                      className="mb-0 my-price"
                      style={{ paddingTop: "10px", color: "black" }}
                    >
                      <span>&#8358;</span>{" "}
                      {product["price"]
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </h6>
                  </div>

                  <div class="d-flex justify-content-between align-items-center mb-2 footer">
                    <p class="text-muted mb-0">
                      Available: <span class="fw-bold">{product["count"]}</span>
                    </p>
                    <div class="ms-auto text-warning">
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                    </div>
                  </div>

                  <div className="d-flex justify-content-center align-items-center pb-2 mb-4">
                    <MDBBtn
                      className="mb-5"
                      color="black"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </div>
      </MDBContainer>
    </div>
  );
};

export default Products;
