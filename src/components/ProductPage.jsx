import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "./Cart";

import "../css/Products.css";

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
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

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
      <div className="product-image-description">
        <div className="product-image-2">
          <div
            className="woocommerce-product-gallery woocommerce-product-gallery--with-images woocommerce-product-gallery--columns-4 images"
            style={{
              boxSizing: "inherit",
              marginBottom: "2em",
              position: "relative",
              transition: "opacity 0.25s ease-in-out 0s",
              opacity: 1,
            }}
          >
            <div
              className="flex-viewport"
              style={{
                boxSizing: "inherit",
                transformStyle: "preserve-3d",
                marginBottom: "1em",
                overflow: "hidden",
                position: "relative",
                height: "500px",
              }}
            >
              <div
                className="woocommerce-product-gallery__wrapper"
                style={{
                  boxSizing: "inherit",
                  transition: "all 0.5s cubic-bezier(0.795, -0.035, 0, 1) 0s",
                  margin: "0px",
                  padding: "0px",
                  width: "100%",
                  transitionDuration: "0s",
                  transform: "translate3d(0px, 0px, 0px)",
                }}
              >
                <div
                  className="woocommerce-product-gallery__image flex-active-slide"
                  style={{
                    boxSizing: "inherit",
                    overflow: "hidden",
                    width: "650px",
                    marginRight: "0px",
                    cssFloat: "left",
                    display: "block",
                    position: "relative",
                  }}
                >
                  <img
                    className="wp-post-image"
                    height={758}
                    width={622}
                    sizes="(max-width: 600px) 100vw, 600px"
                    src={product["image"]}
                    title="product-14-a"
                    style={{
                      boxSizing: "inherit",
                      border: "0px",
                      verticalAlign: "middle",
                      maxWidth: "100%",
                      display: "block",
                      width: "100%",
                      height: "auto",
                      boxShadow: "none",
                    }}
                  />
                </div>
                {/* <div
                  className="woocommerce-product-gallery__image"
                  style={{
                    boxSizing: "inherit",
                    width: "622px",
                    marginRight: "0px",
                    cssFloat: "left",
                    display: "block",
                  }}
                >
                  <img
                    height={758}
                    width={622}
                    sizes="(max-width: 600px) 100vw, 600px"
                    src={product["image"]}
                    title="product-14-b"
                    style={{
                      boxSizing: "inherit",
                      border: "0px",
                      verticalAlign: "middle",
                      maxWidth: "100%",
                      display: "block",
                      width: "100%",
                      height: "auto",
                      boxShadow: "none",
                    }}
                  />
                </div>
                <div
                  className="woocommerce-product-gallery__image"
                  style={{
                    boxSizing: "inherit",
                    width: "622px",
                    marginRight: "0px",
                    cssFloat: "left",
                    display: "block",
                    border: "1px solid red",
                  }}
                >
                  <img
                    height={758}
                    width={622}
                    sizes="(max-width: 600px) 100vw, 600px"
                    src={product["image"]}
                    title="product-14-c"
                    style={{
                      boxSizing: "inherit",
                      border: "0px",
                      verticalAlign: "middle",
                      maxWidth: "100%",
                      display: "block",
                      width: "100%",
                      height: "auto",
                      boxShadow: "none",
                    }}
                  />
                </div>
                <div
                  className="woocommerce-product-gallery__image"
                  style={{
                    boxSizing: "inherit",
                    width: "622px",
                    marginRight: "0px",
                    cssFloat: "left",
                    display: "block",
                  }}
                >
                  <img
                    height={758}
                    width={622}
                    sizes="(max-width: 600px) 100vw, 600px"
                    src={product["img_4"]}
                    title="product-bg-02"
                    style={{
                      boxSizing: "inherit",
                      border: "0px",
                      verticalAlign: "middle",
                      maxWidth: "100%",
                      display: "block",
                      width: "100%",
                      height: "auto",
                      boxShadow: "none",
                    }}
                  />
                </div>{" "} */}
              </div>
            </div>
            <ol
              className="flex-control-nav flex-control-thumbs"
              style={{
                border: "0px",
                outline: "0px",
                fontSize: "100%",
                fontStyle: "inherit",
                fontWeight: "inherit",
                verticalAlign: "baseline",
                listStyle: "decimal",
                boxSizing: "border-box",
                overflow: "hidden",
                margin: "0px",
                padding: "0px",
                zoom: 1,
              }}
            >
              <li
                style={{
                  boxSizing: "inherit",
                  border: "0px",
                  outline: "0px",
                  padding: "0px",
                  fontSize: "100%",
                  fontStyle: "inherit",
                  fontWeight: "inherit",
                  verticalAlign: "baseline",
                  margin: "0px",
                  listStyle: "none",
                  cssFloat: "left",
                  width: "calc(25% - 0.75em)",
                  marginRight: "1em",
                  marginBottom: "1em",
                  clear: "left",
                }}
              >
                <img
                  className="flex-active"
                  height={144}
                  width={144}
                  src={product["img_1"]}
                  style={{
                    boxSizing: "inherit",
                    border: "0px",
                    verticalAlign: "middle",
                    maxWidth: "100%",
                    display: "block",
                    width: "100%",
                    height: "auto",
                    boxShadow: "none",
                    margin: "0px",
                    cursor: "pointer",
                    opacity: 1,
                  }}
                />
              </li>
              <li
                style={{
                  boxSizing: "inherit",
                  border: "0px",
                  outline: "0px",
                  padding: "0px",
                  fontSize: "100%",
                  fontStyle: "inherit",
                  fontWeight: "inherit",
                  verticalAlign: "baseline",
                  margin: "0px",
                  listStyle: "none",
                  cssFloat: "left",
                  width: "calc(25% - 0.75em)",
                  marginRight: "1em",
                  marginBottom: "1em",
                }}
              >
                <img
                  height={144}
                  width={144}
                  src={product["img_2"]}
                  style={{
                    boxSizing: "inherit",
                    border: "0px",
                    verticalAlign: "middle",
                    maxWidth: "100%",
                    display: "block",
                    width: "100%",
                    height: "auto",
                    boxShadow: "none",
                    margin: "0px",
                    cursor: "pointer",
                    opacity: 0.5,
                  }}
                />
              </li>
              <li
                style={{
                  boxSizing: "inherit",
                  border: "0px",
                  outline: "0px",
                  padding: "0px",
                  fontSize: "100%",
                  fontStyle: "inherit",
                  fontWeight: "inherit",
                  verticalAlign: "baseline",
                  margin: "0px",
                  listStyle: "none",
                  cssFloat: "left",
                  width: "calc(25% - 0.75em)",
                  marginRight: "1em",
                  marginBottom: "1em",
                }}
              >
                <img
                  height={144}
                  width={144}
                  src={product["img_3"]}
                  style={{
                    boxSizing: "inherit",
                    border: "0px",
                    verticalAlign: "middle",
                    maxWidth: "100%",
                    display: "block",
                    width: "100%",
                    height: "auto",
                    boxShadow: "none",
                    margin: "0px",
                    cursor: "pointer",
                    opacity: 0.5,
                  }}
                />
              </li>
              <li
                style={{
                  boxSizing: "inherit",
                  border: "0px",
                  outline: "0px",
                  padding: "0px",
                  fontSize: "100%",
                  fontStyle: "inherit",
                  fontWeight: "inherit",
                  verticalAlign: "baseline",
                  margin: "0px",
                  listStyle: "none",
                  cssFloat: "left",
                  width: "calc(25% - 0.75em)",
                  marginBottom: "1em",
                  marginRight: "0px",
                }}
              >
                <img
                  height={144}
                  width={144}
                  src={product["img_4"]}
                  style={{
                    boxSizing: "inherit",
                    border: "0px",
                    verticalAlign: "middle",
                    maxWidth: "100%",
                    display: "block",
                    width: "100%",
                    height: "auto",
                    boxShadow: "none",
                    margin: "0px",
                    cursor: "pointer",
                    opacity: 0.5,
                  }}
                />
              </li>
            </ol>
          </div>
        </div>
        <div className="product-description">
          <div
            className="summary entry-summary"
            style={{
              boxSizing: "inherit",
              marginBottom: "2em",
              cssFloat: "right",
              clear: "none",
              width: "95%",
            }}
          >
            <div className="product-detail">
              <Link to={`/seller/${product["seller"]["business_name"]}`}>
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
                  <p
                    className="lead mb-0"
                    style={{ color: "black", fontSize: "1.2rem" }}
                  >
                    {product["seller"]["business_name"]}
                  </p>
                </div>
              </Link>
            </div>
            <br />
            <nav
              className="woocommerce-breadcrumb"
              style={{
                boxSizing: "inherit",
                display: "block",
                margin: "0px 0px 1em",
                padding: "0px",
                zoom: 1,
                fontSize: "1.1rem",
                color: "rgb(119, 119, 119)",
              }}
            >
              <a
                href="#"
                style={{
                  boxSizing: "inherit",
                  backgroundColor: "transparent",
                  transition: "all 0.2s linear 0s",
                  textDecoration: "none",
                  color: "rgb(119, 119, 119)",
                }}
              >
                Home
              </a>
               / 
              <a
                href="https://websitedemos.net/be-bold-beauty-store-04/product-category/skin-care/"
                style={{
                  boxSizing: "inherit",
                  backgroundColor: "transparent",
                  transition: "all 0.2s linear 0s",
                  textDecoration: "none",
                  color: "rgb(119, 119, 119)",
                }}
              >
                {product["category"]}
              </a>
               / {product["name"]}
            </nav>
            <h1
              className="product_title entry-title"
              style={{
                boxSizing: "inherit",
                border: "0px",
                outline: "0px",
                fontStyle: "inherit",
                verticalAlign: "baseline",
                fontFamily: "Marcellus, serif",
                textTransform: "capitalize",
                color: "#000000",
                fontWeight: 400,
                fontSize: "2rem",
                display: "block",
                lineHeight: 1.2,
                padding: "0px",
                clear: "none",
                margin: "0px 0px 0.5em",
                marginTop: "0px",
                marginBottom: "0.5em",
              }}
            >
              {product["name"]}
            </h1>
            <p
              className="price"
              style={{
                boxSizing: "inherit",
                border: "0px",
                outline: "0px",
                padding: "0px",
                fontStyle: "inherit",
                verticalAlign: "baseline",
                display: "inline-block",
                margin: "0px 0px 0.2em",
                fontSize: "2rem",
                fontWeight: 700,
                marginBottom: "0.2em",
                color: "black",
              }}
            >
              <del
                aria-hidden="true"
                style={{
                  boxSizing: "inherit",
                  opacity: 0.5,
                  fontWeight: 400,
                  display: "initial",
                }}
              >
                <span
                  className="woocommerce-Price-amount amount"
                  style={{ boxSizing: "inherit" }}
                >
                  <bdi style={{ boxSizing: "inherit" }}>
                    <span>&#8358;</span>
                    {""}
                    {parseInt(
                      product["price"] * 0.1 + parseInt(product["price"])
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    .00
                  </bdi>
                </span>
              </del>{" "}
              <ins
                style={{
                  boxSizing: "inherit",
                  background: "inherit",
                  textDecoration: "inherit",
                  fontWeight: 700,
                  display: "inline-block",
                }}
              >
                <span
                  className="woocommerce-Price-amount amount"
                  style={{ boxSizing: "inherit" }}
                >
                  <bdi style={{ boxSizing: "inherit" }}>
                    <span>&#8358;</span>
                    {product["price"]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </bdi>
                </span>
              </ins>
            </p>
            <div
              className="woocommerce-product-details__short-description"
              style={{ boxSizing: "inherit" }}
            >
              <p
                style={{
                  boxSizing: "inherit",
                  border: "0px",
                  margin: "0px",
                  outline: "0px",
                  padding: "0px",
                  fontSize: "1.2rem",
                  fontStyle: "inherit",
                  fontWeight: "inherit",
                  verticalAlign: "baseline",
                  marginBottom: "0.8em",
                }}
              >
                {product["description"].substring(0, 500)}
              </p>
            </div>
            <div className="cart" style={{ boxSizing: "inherit", zoom: 1 }}>
              <div
                className="quantity buttons_added"
                style={{
                  boxSizing: "inherit",
                  display: "inline-flex",
                  margin: "0px 1em 1em 0px",
                  cssFloat: "left",
                }}
              >
                <label
                  className="screen-reader-text"
                  htmlFor="minus_qty"
                  style={{
                    boxSizing: "inherit",
                    clipPath: "inset(50%)",
                    margin: "-1px",
                    padding: "0px",
                    overflow: "hidden",
                    border: "0px",
                    width: "1px",
                    height: "1px",
                    clip: "rect(0px, 0px, 0px, 0px)",
                    top: "0px",
                    position: "absolute",
                    overflowWrap: "normal",
                  }}
                >
                  Minus Quantity
                </label>
                <a
                  id="minus_qty"
                  className="minus"
                  href="/#"
                  style={{
                    boxSizing: "inherit",
                    transition: "all 0.2s linear 0s",
                    textDecoration: "none",
                    border: "1px solid rgba(212,165,181,0.35)",
                    outline: "0px",
                    width: "38px",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    color: "#5d5b5b",
                    alignItems: "center",
                    fontWeight: 400,
                    zIndex: 3,
                    borderRightWidth: "0px",
                    marginRight: "-38px",
                  }}
                >
                  -
                </a>
                <label
                  className="screen-reader-text"
                  htmlFor="quantity_652d561ae8aae"
                  style={{
                    boxSizing: "inherit",
                    clipPath: "inset(50%)",
                    margin: "-1px",
                    padding: "0px",
                    overflow: "hidden",
                    border: "0px",
                    width: "1px",
                    height: "1px",
                    clip: "rect(0px, 0px, 0px, 0px)",
                    top: "0px",
                    position: "absolute",
                    overflowWrap: "normal",
                  }}
                >
                  Product Name 10 quantity
                </label>
                <input
                  id="quantity_652d561ae8aae"
                  className="input-text qty text"
                  name="quantity"
                  type="number"
                  autoComplete="off"
                  defaultValue="1"
                  min="1"
                  aria-label="Product quantity"
                  inputMode="numeric"
                  size={4}
                  step="1"
                  style={{
                    font: "inherit",
                    margin: "0px",
                    verticalAlign: "baseline",
                    fontFamily: '"Open Sans", sans-serif',
                    fontWeight: "inherit",
                    fontSize: "1rem",
                    lineHeight: "1.7em",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    background: "#FAFAFA",
                    transition: "all 0.2s linear 0s",
                    color: "rgb(102, 102, 102)",
                    height: "auto",
                    boxSizing: "border-box",
                    borderColor: "rgba(212,165,181,0.35)",
                    borderRadius: "0px",
                    backgroundColor: "rgb(255, 255, 255)",
                    boxShadow: "none",
                    maxWidth: "58px",
                    textAlign: "center",
                    minHeight: "35px",
                    width: "2.631em",
                    marginLeft: "38px",
                    padding: "0.3em",
                    appearance: "none",
                  }}
                />
                <label
                  className="screen-reader-text"
                  htmlFor="plus_qty"
                  style={{
                    boxSizing: "inherit",
                    clipPath: "inset(50%)",
                    margin: "-1px",
                    padding: "0px",
                    overflow: "hidden",
                    border: "0px",
                    width: "1px",
                    height: "1px",
                    clip: "rect(0px, 0px, 0px, 0px)",
                    top: "0px",
                    position: "absolute",
                    overflowWrap: "normal",
                  }}
                >
                  {" "}
                  Plus Quantity
                </label>
                <a
                  id="plus_qty"
                  className="plus"
                  href="/#"
                  style={{
                    boxSizing: "inherit",
                    transition: "all 0.2s linear 0s",
                    textDecoration: "none",
                    border: "1px solid rgba(212,165,181,0.35)",
                    outline: "0px",
                    width: "38px",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    color: "#5d5b5b",
                    alignItems: "center",
                    fontWeight: 400,
                    zIndex: 3,
                    borderLeftWidth: "0px",
                    marginRight: "6px",
                  }}
                >
                  +
                </a>
              </div>
              <button
                className="single_add_to_cart_button button alt"
                name="add-to-cart"
                onClick={() => handleAddToCart(product)}
                style={{
                  boxSizing: "inherit",
                  font: "inherit",
                  appearance: "button",
                  cursor: "pointer",
                  fontSize: "100%",
                  borderImage: "initial",
                  background: "rgb(230, 230, 230)",
                  borderRadius: "0px",
                  border: "0px",
                  borderStyle: "solid",
                  borderWidth: "0px",
                  borderColor: "#000000",
                  color: "#FFFFFF",
                  backgroundColor: "#000000",
                  fontFamily: "inherit",
                  fontWeight: 500,
                  lineHeight: "1em",
                  textTransform: "uppercase",
                  margin: "0px",
                  overflow: "visible",
                  position: "relative",
                  left: "auto",
                  display: "inline-block",
                  backgroundImage: "none",
                  boxShadow: "none",
                  textShadow: "none",
                  verticalAlign: "middle",
                  cssFloat: "left",
                  width: "auto",
                  marginBottom: "1em",
                  marginLeft: "unset",
                  padding: "10px 20px",
                }}
              >
                Add to cart
              </button>
            </div>
            <br />
            <br />
            <div
              className="product_meta"
              style={{
                boxSizing: "inherit",
                borderTop: "1px solid rgba(212,165,181,0.35)",
                margin: "0px 0px 0.8em",
                paddingTop: "0.5em",
                fontSize: "1.1rem",
                marginBottom: "0.8em",
              }}
            >
              <span
                className="posted_in"
                style={{
                  boxSizing: "inherit",
                  textDecoration: "inherit",
                  display: "inline-block",
                  marginRight: "15px",
                  alignItems: "center",
                  fontWeight: 500,
                }}
              >
                Categories:{" "}
                <a
                  href="#"
                  rel="tag"
                  style={{
                    boxSizing: "inherit",
                    backgroundColor: "transparent",
                    transition: "all 0.2s linear 0s",
                    color: "#000000",
                    textDecoration: "none",
                    fontWeight: 400,
                  }}
                >
                  {product["category"]}
                </a>
              </span>
            </div>
          </div>
        </div>
        {/* <MDBContainer>
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
                  <Link to={`/seller/${product["seller"]["business_name"]}`}>
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
                      <p className="lead mb-0" style={{ color: "black" }}>
                        {product["seller"]["business_name"]}
                      </p>
                    </div>
                  </Link>
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
      </MDBContainer> */}
      </div>
      <div className="description-section">
        <div className="ds-header">
          <ul
            className="tabs wc-tabs"
            role="tablist"
            style={{
              border: "0px",
              outline: "0px",
              fontSize: "100%",
              fontStyle: "inherit",
              fontWeight: "inherit",
              verticalAlign: "baseline",
              boxSizing: "border-box",
              listStyle: "none",
              padding: "0px",
              margin: "0px 0px 1em",
              overflow: "hidden",
              position: "relative",
              zoom: 1,
            }}
          >
            <li
              id="tab-title-description"
              className="description_tab active"
              aria-controls="tab-description"
              role="tab"
              style={{
                boxSizing: "inherit",
                outline: "0px",
                fontSize: "1.2rem",
                fontStyle: "inherit",
                fontWeight: "inherit",
                verticalAlign: "baseline",
                border: "0px",
                background: "0px 0px",
                margin: "0px 1em 0px 0px",
                padding: "0px",
                borderRadius: "0px",
                position: "relative",
                zIndex: 2,
                borderBottomColor: "rgb(255, 255, 255)",
                display: "inline-block",
              }}
            >
              <a
                href="#"
                style={{
                  boxSizing: "inherit",
                  backgroundColor: "transparent",
                  transition: "all 0.2s linear 0s",
                  padding: "0.5em 0px",
                  textDecoration: "none",
                  display: "inline-block",
                  fontWeight: 700,
                  color: "rgb(81, 81, 81)",
                  textShadow: "inherit",
                }}
              >
                {"Description"}
              </a>
            </li>
            <li
              id="tab-title-reviews"
              className="reviews_tab"
              aria-controls="tab-reviews"
              role="tab"
              style={{
                boxSizing: "inherit",
                outline: "0px",
                fontSize: "1.2rem",
                fontStyle: "inherit",
                fontWeight: "inherit",
                verticalAlign: "baseline",
                border: "0px",
                background: "0px 0px",
                margin: "0px 1em 0px 0px",
                padding: "0px",
                borderRadius: "0px",
                position: "relative",
                zIndex: 0,
                display: "inline-block",
              }}
            >
              <a
                href="#"
                style={{
                  boxSizing: "inherit",
                  backgroundColor: "transparent",
                  transition: "all 0.2s linear 0s",
                  padding: "0.5em 0px",
                  textDecoration: "none",
                  display: "inline-block",
                  fontWeight: 700,
                  color: "rgb(81, 81, 81)",
                }}
              >
                {"Reviews (0)"}
              </a>
            </li>
          </ul>
          <div />

          <div className="ds-section">
            <h2
              class="elementor-heading-title elementor-size-default"
              style={{ color: "black" }}
            >
              More about the product
            </h2>
            <p
              style={{
                border: "0px",
                margin: "0px",
                outline: "0px",
                padding: "0px",
                fontSize: "1.3rem",
                fontStyle: "inherit",
                fontWeight: "inherit",
                verticalAlign: "baseline",
                boxSizing: "border-box",
                marginBottom: "0.8em",
              }}
            >
              {product["description"]}
            </p>
          </div>
          <div className="related-products">
            <section
              className="related products"
              style={{ boxSizing: "inherit", display: "block" }}
            >
              <h2
                style={{
                  boxSizing: "inherit",
                  border: "0px",
                  margin: "0px",
                  outline: "0px",
                  padding: "0px",
                  fontStyle: "inherit",
                  verticalAlign: "baseline",
                  clear: "both",
                  fontSize: "2.6875rem",
                  fontWeight: "normal",
                  fontFamily: "Marcellus, serif",
                  lineHeight: "1em",
                  color: "#000000",
                  marginBottom: "0.7em",
                }}
              >
                Related products
              </h2>
              <MDBContainer fluid className="my-5">
                <div className="product-grid">
                  {data.map((product) => (
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
                        <MDBCardBody className="product-card-body">
                          <div className="d-flex justify-content-between">
                            <p className="small">
                              <a href="#!" className="text-muted">
                                {window.innerWidth < 650
                                  ? product["category"].length > 11
                                    ? product["category"].substring(0, 9) +
                                      "..."
                                    : product["category"]
                                  : product["category"]}
                              </a>
                            </p>
                            <p className="small text-danger">
                              <s style={{ color: "black" }}>
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
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
