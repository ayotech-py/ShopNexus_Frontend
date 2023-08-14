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

          if (response.status === 200) {
            alert("Item successfully added to cart");
          } else {
            alert("Item already added to cart");
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
      console.log("ture");
    } else {
      cartname["quantity"] = quantity;
      addToCart(cartname);
    }
  };

  return (
    <div class="product">
      <MDBContainer fluid className="my-5">
        <MDBRow>
          {data.map((product) => (
            <MDBCol md="12" lg="3" className="mb-4 mb-lg-4">
              <MDBCard>
                <div className="d-flex justify-content-between p-3">
                  <p className="lead mb-0">
                    {product["seller"]["business_name"]}
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
                <MDBCardBody>
                  <div className="d-flex justify-content-between">
                    <p className="small">
                      <a href="#!" className="text-muted">
                        {product["category"]}
                      </a>
                    </p>
                    <p className="small text-danger">
                      <s>
                        <span>&#8358;</span>{" "}
                        {product["price"] * 0.1 + parseInt(product["price"])}
                      </s>
                    </p>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">
                      {product["name"].substring(0, 17)} ...
                    </h6>
                    <h6 className="text-dark mb-0">
                      <span>&#8358;</span> {product["price"]}
                    </h6>
                  </div>

                  <div class="d-flex justify-content-between mb-2">
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

                  <div className="d-flex justify-content-center align-items-center pb-2 mb-4 my-btn">
                    <MDBBtn
                      className="mb-5"
                      color="primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Products;
