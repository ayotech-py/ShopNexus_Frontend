import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBProgress,
  MDBProgressBar,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

const Order = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    const username = window.localStorage.getItem("username");
    const getInvoice = async () => {
      const response = await fetch("http://127.0.0.1:8000/orders/", {
        headers: {
          Authorization: "Bearer " + token,
          user: username,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data["status"] == 200) {
        console.log(data);
        setData(data);
      }
    };
    getInvoice();
  }, []);
  var totalSum = 0;
  if (data) {
    totalSum = data.orders.reduce((accumulator, currentItem) => {
      const subtotal = currentItem.product.price * currentItem.quantity;
      return accumulator + subtotal;
    }, 0);
  } else {
    totalSum = 0;
  }
  return (
    <div>
      <section
        className="h-100 gradient-custom"
        style={{ backgroundColor: "#eee" }}
      >
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="10" xl="8">
              <MDBCard style={{ borderRadius: "10px" }}>
                <MDBCardHeader className="px-4 py-5">
                  <MDBTypography tag="h5" className="text-muted mb-0">
                    Thanks for your Order
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p
                      className="lead fw-normal mb-0"
                      style={{ color: "#a8729a" }}
                    >
                      Order Details
                    </p>
                  </div>

                  {data ? (
                    data.orders.map((order) => (
                      <MDBCard className="shadow-0 border mb-4">
                        <MDBCardBody>
                          <MDBRow>
                            <MDBCol md="2">
                              <MDBCardImage
                                src={
                                  "http://127.0.0.1:8000" +
                                  order["product"]["image"]
                                }
                                fluid
                                alt="Phone"
                              />
                            </MDBCol>
                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-center align-items-center"
                            >
                              <p className="text-muted mb-0">
                                {order["product"]["name"].substring(0, 17)}
                              </p>
                            </MDBCol>
                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-center align-items-center"
                            >
                              <p className="text-muted mb-0 small">
                                {order["product"]["category"]}
                              </p>
                            </MDBCol>
                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-center align-items-center"
                            >
                              <p className="text-muted mb-0 small">
                                Qty: {order["quantity"]}
                              </p>
                            </MDBCol>
                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-center align-items-center"
                            >
                              <p className="text-muted mb-0 small">
                                <span>&#8358;</span>{" "}
                                {order["quantity"] * order["product"]["price"]}
                              </p>
                            </MDBCol>
                          </MDBRow>
                          <hr
                            className="mb-4"
                            style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                          />
                          <MDBRow className="align-items-center">
                            <MDBCol md="2">
                              <p className="text-muted mb-0 small">
                                Track Order
                              </p>
                            </MDBCol>
                            <MDBCol md="10">
                              <MDBProgress
                                style={{ height: "6px", borderRadius: "16px" }}
                              >
                                <MDBProgressBar
                                  style={{
                                    borderRadius: "16px",
                                    backgroundColor: "#a8729a",
                                  }}
                                  width={20}
                                  valuemin={0}
                                  valuemax={100}
                                />
                              </MDBProgress>
                              <div className="d-flex justify-content-around mb-1">
                                <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                  Out for delivary
                                </p>
                                <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                  Delivered
                                </p>
                              </div>
                            </MDBCol>
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>
                    ))
                  ) : (
                    <></>
                  )}

                  <div className="d-flex row pt-2">
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Total</span>
                      <br /> <span>&#8358;</span> {totalSum}
                      .00
                    </p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Delivery Charges</span>{" "}
                      <br />
                      <span>&#8358;</span> 1000
                    </p>
                  </div>
                </MDBCardBody>
                <MDBCardFooter
                  className="border-0 px-4 py-5"
                  style={{
                    backgroundColor: "#a8729a",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  <MDBTypography
                    tag="h5"
                    className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"
                  >
                    Total paid:{" "}
                    <span className="h2 mb-0 ms-2">
                      <span>&#8358;</span> {totalSum + 1000}
                    </span>
                  </MDBTypography>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
};

export default Order;
