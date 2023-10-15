import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./Cart";

const SellerPage = (user) => {
  const { name } = useParams();
  const [data, setData] = useState(null);
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

  useEffect(() => {
    const getSellerProduct = async () => {
      const token = process.env.REACT_APP_AUTH_KEY;
      console.log(token);
      const response = await fetch(
        `https://shop-nexus-api.vercel.app/seller-product-fetch/?name=${name}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.log(data);
      } else {
      }
    };

    getSellerProduct();
  }, []);

  return (
    <div
      className="gradient-custom-2"
      style={{ backgroundColor: "#9de2ff", marginTop: "70px" }}
    >
      {data ? (
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "160px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "110px" }}
                  >
                    <MDBCardImage
                      src={data["seller"]["business_logo"]}
                      alt="Generic placeholder image"
                      className="mt-4 mb-2 img-thumbnail"
                      fluid
                      style={{
                        width: "150px",
                        zIndex: "1",
                        borderRadius: "100px",
                      }}
                    />
                    <MDBBtn
                      outline
                      color="dark"
                      style={{
                        height: "36px",
                        overflow: "visible",
                        padding: "5px",
                      }}
                    >
                      Rate Seller
                    </MDBBtn>
                  </div>
                  <div className="ms-3" style={{ marginTop: "90px" }}>
                    <MDBTypography tag="h5">
                      {data["seller"]["business_name"]}
                    </MDBTypography>
                    <MDBCardText>
                      {data["seller"]["business_category"]}
                    </MDBCardText>
                  </div>
                </div>
                <div
                  className="p-4 text-black ratings-banner"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <MDBCardText className="mb-1 h6">
                        {data["seller"]["rating"]}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Ratings
                      </MDBCardText>
                    </div>
                    {data["seller"]["business_reg_no"] ? (
                      <div className="px-3">
                        <MDBCardText className="mb-1 h6">
                          {data["seller"]["business_reg_no"]}
                        </MDBCardText>
                        <MDBCardText className="small text-muted mb-0">
                          Reg No
                        </MDBCardText>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div>
                      <MDBCardText className="mb-1 h6">
                        {data["product"].length}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Products
                      </MDBCardText>
                    </div>
                  </div>
                  <div
                    className="p-4"
                    style={{
                      marginLeft: "-25px",
                      marginTop: "-20px",
                      marginBottom: "-30px",
                    }}
                  >
                    <MDBCardText
                      className="font-italic mb-1"
                      style={{ fontSize: "13px" }}
                    >
                      <strong>Description: </strong>
                      {data["seller"]["about"]}
                    </MDBCardText>
                    <MDBCardText
                      className="font-italic mb-1"
                      style={{ fontSize: "13px" }}
                    >
                      <strong>Email:</strong> {data["seller"]["email"]}
                    </MDBCardText>
                  </div>
                </div>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <div
            className="product"
            style={{
              marginTop: "20px",
            }}
          >
            <div className="product-seller-grid">
              {data["product"].map((product) => (
                <MDBCol className="product-card" style={{ height: "100%" }}>
                  <MDBCard>
                    <div className="d-flex justify-content-between align-items-center business-card">
                      <p className="lead mb-0 business-name">
                        {product["seller"]["business_name"].length > 15
                          ? product["seller"]["business_name"].substring(
                              0,
                              13
                            ) + "..."
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
                    <MDBCardBody
                      className="product-card-body"
                      style={{
                        height: "210px",
                      }}
                    >
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
                        <p className="small text-danger">
                          <s>
                            <span>&#8358;</span>{" "}
                            {parseInt(
                              product["price"] * 0.1 +
                                parseInt(product["price"])
                            )
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </s>
                        </p>
                      </div>

                      <div className="mb-3" style={{ textAlign: "center" }}>
                        <h6 className="mb-0">
                          {product["name"].substring(0, 22)} ...
                        </h6>
                        <h6
                          className="mb-0 price"
                          style={{ paddingTop: "10px", color: "red" }}
                        >
                          <span>&#8358;</span>{" "}
                          {product["price"]
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </h6>
                      </div>

                      <div class="d-flex justify-content-between align-items-center mb-2 footer">
                        <p class="text-muted mb-0">
                          Available:{" "}
                          <span class="fw-bold">{product["count"]}</span>
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
            </div>
          </div>
        </MDBContainer>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SellerPage;
