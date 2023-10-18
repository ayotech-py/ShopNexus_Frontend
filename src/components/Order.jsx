import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState, useContext } from "react";
import { CartContext } from "./Cart";
import { Link, redirect } from "react-router-dom";

const OrderPage = ({ user, refreshUser }) => {
  const { cart, removeFromCart, addToCart, updateCart } =
    useContext(CartContext);
  //const [userOrder, setUserOrder] = useState(1);
  const [quantity, setCart] = useState(1);
  const customer = window.localStorage.getItem("username");
  const token = window.localStorage.getItem("accessToken");
  const username = window.localStorage.getItem("username");

  const handleAddToCart = (cartname) => {
    var cart_id = [];
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        cart_id.push(cart[i]["id"]);
      }
    }
    if (cart_id.includes(cartname["id"])) {
      //do something
    } else {
      cartname["quantity"] = quantity;
      addToCart(cartname);
    }
  };

  const fetchCart = async () => {
    const token = window.localStorage.getItem("accessToken");
    const username = window.localStorage.getItem("username");
    const response = await fetch(
      "https://shop-nexus-api.vercel.app/get-user-details/",
      {
        headers: {
          Authorization: "Bearer " + token,
          user: username,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const userOrder = await response.json();
      console.log(userOrder["data"]);
      if (userOrder && userOrder["data"]["orderitems"].length > 0) {
        userOrder["data"]["orderitems"].map((product) =>
          handleAddToCart(product.product)
        );
      }
    }
  };

  const handleIncrease = (itemId) => {
    var init_quantity = 0;
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        item["quantity"] = item["quantity"] + 1;
        init_quantity = item["quantity"];
      }
      return item;
    });
    const handleUser = async () => {
      try {
        const response = await fetch(
          "https://shop-nexus-api.vercel.app/orderitems/1/",
          {
            method: "PUT",
            headers: {
              Authorization: "Bearer " + token,
              user: username,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              product: itemId,
              customer: customer,
              quantity: init_quantity,
            }),
          }
        );

        if (response.status == 200) {
          refreshUser();
        } else {
          //alert("An Error Ocurred");
        }
      } catch (error) {
        // Handle fetch error, e.g., display an error message
      }
    };
    handleUser();
    setCart(updatedCart);
  };

  const handleDecrease = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        item["quantity"] = item["quantity"] - 1;
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDelete = (itemId) => {
    refreshUser();
    if (user) {
      const handleUser = async () => {
        try {
          const response = await fetch(
            "https://shop-nexus-api.vercel.app/orderitems/1/",
            {
              method: "DELETE",
              headers: {
                Authorization: "Bearer " + token,
                user: username,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                product: itemId,
                customer: customer,
              }),
            }
          );

          if (response.status == 200) {
            //Do nothing
          } else {
            //alert("An Error Ocurred");
          }
        } catch (error) {
          // Handle fetch error, e.g., display an error message
        }
      };
      handleUser();
      refreshUser();
      //window.location.reload();
    }
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        cart.splice(cart.indexOf(item), 1);
      }
      return;
    });
    if (user) {
      fetchCart();
    } else {
      setCart(updatedCart);
      removeFromCart(cart);
    }
  };

  var totalSum = 0;

  if (cart) {
    totalSum = cart.reduce((accumulator, currentItem) => {
      const subtotal = currentItem.price * currentItem.quantity;
      return accumulator + subtotal;
    }, 0);
  }

  const checkout = async () => {
    const response = await fetch(
      "https://shop-nexus-api.vercel.app/make_payment/",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          user: username,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: customer,
        }),
      }
    );
    if (response.status == 200) {
      const data = await response.json();
      const redirect = data["redirect_url"];
      window.location.href = redirect;
    }
  };

  return (
    <div className="orderpage" style={{ marginTop: "70px" }}>
      <section className="h-100 gradient-custom">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center my-4">
            <MDBCol md="8">
              <MDBCard className="mb-4 cart-container">
                <MDBCardHeader className="py-3">
                  <MDBTypography tag="h5" className="mb-0">
                    Cart - {cart.length} items
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                  {cart.length > 0 ? (
                    cart.map((element) => (
                      <MDBRow>
                        <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                          <MDBRipple
                            rippleTag="div"
                            rippleColor="light"
                            className="bg-image rounded hover-zoom hover-overlay"
                          >
                            <img
                              src={user ? element["image"] : element["image"]}
                              className="w-100"
                            />
                            <a href="#!">
                              <div
                                className="mask"
                                style={{
                                  backgroundColor: "rgba(251, 251, 251, 0.2)",
                                }}
                              ></div>
                            </a>
                          </MDBRipple>
                        </MDBCol>

                        <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                          <p>
                            <strong>{element["name"]}</strong>
                          </p>

                          <MDBBtn
                            className="delete-btn"
                            onClick={() => handleDelete(element.id)}
                          >
                            <MDBIcon fas icon="trash" />
                          </MDBBtn>

                          <MDBBtn>
                            <MDBIcon fas icon="heart" />
                          </MDBBtn>
                        </MDBCol>
                        <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                          <div
                            className="d-flex mb-4"
                            style={{ maxWidth: "300px" }}
                          >
                            <MDBBtn
                              className="px-3 me-2"
                              onClick={() => handleDecrease(element.id)}
                            >
                              <MDBIcon fas icon="minus" />
                            </MDBBtn>

                            <MDBInput
                              defaultValue={1}
                              min={0}
                              type="number"
                              label="Quantity"
                              value={element["quantity"]}
                            />

                            <MDBBtn
                              className="px-3 ms-2"
                              onClick={() => handleIncrease(element.id)}
                            >
                              <MDBIcon fas icon="plus" />
                            </MDBBtn>
                          </div>

                          <p
                            className="text-start text-md-center"
                            style={{ fontSize: "1.3rem" }}
                          >
                            <strong>
                              <span>₦</span>
                              {parseInt(element["price"] * element["quantity"])
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              .00
                            </strong>
                          </p>
                        </MDBCol>
                        <hr className="my-4" />
                      </MDBRow>
                    ))
                  ) : (
                    <MDBContainer className="my-5">
                      <MDBRow className="justify-content-center">
                        <MDBCol md="6">
                          <MDBCard>
                            <MDBCardBody className="text-center">
                              <h1 className="h4">Empty Cart</h1>
                              <p className="text-muted mb-4">
                                Your Cart is Empty, Check out our products
                              </p>
                              <Link to="/">
                                <MDBBtn color="primary">
                                  Go Back to Products
                                </MDBBtn>
                              </Link>
                            </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                      </MDBRow>
                    </MDBContainer>
                  )}
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4">
                <MDBCardBody>
                  <p>
                    <strong>Expected shipping delivery</strong>
                  </p>
                  <p className="mb-0">12.10.2020 - 14.10.2020</p>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody>
                  <p>
                    <strong>We accept</strong>
                  </p>
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa"
                  />
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express"
                  />
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard"
                  />
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                    alt="PayPal acceptance mark"
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4">
              {cart.length > 0 ? (
                <MDBCard className="mb-4">
                  <MDBCardHeader>
                    <MDBTypography tag="h5" className="mb-0">
                      Summary
                    </MDBTypography>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <MDBListGroup flush>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products
                        <span>
                          <span>&#8358;</span>
                          {totalSum
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>
                          <span>&#8358;</span> 1,000
                        </span>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                          <strong>
                            <p className="mb-0">(including VAT)</p>
                          </strong>
                        </div>
                        <span>
                          <strong>
                            <span>&#8358;</span>
                            {(totalSum + 1000)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </strong>
                        </span>
                      </MDBListGroupItem>
                    </MDBListGroup>
                    {user ? (
                      <MDBBtn block size="lg" onClick={checkout}>
                        Go to checkout
                      </MDBBtn>
                    ) : (
                      <Link to={"/auth/login-in"}>
                        <MDBBtn block size="lg">
                          Please login to proceed
                        </MDBBtn>
                      </Link>
                    )}
                  </MDBCardBody>
                </MDBCard>
              ) : (
                <></>
              )}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
};

export default OrderPage;
