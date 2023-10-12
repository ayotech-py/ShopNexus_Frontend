import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

const Invoice = () => {
    const token = window.localStorage.getItem('accessToken')
    const username = window.localStorage.getItem('username')
    const [data, setData] = useState(null);  
    const [reference_id, setReference] = useState(null)

    useEffect(() => {
        const getReceipt = async() => {
          const last_response = await fetch(`https://shop-nexus-fpb869sps-ayotech-py.vercel.app/last_payment`, {
              headers: {
                  'Authorization': 'Bearer ' + token,
                  'user': username,
                  'Content-Type': 'application/json',
              },
          });
          if (last_response.status == 200) {
              const data = await last_response.json();
              //do something(data)
              setReference(data['data'])
              //do something(`make i check: ${reference_id}`)
                const response = await fetch(`https://shop-nexus-fpb869sps-ayotech-py.vercel.app/make_payment/?ref_id=${data['data']}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'user': username,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status == 200) {
                    const data = await response.json();
                    setData(data)
                }
          }
        }
    
        getReceipt();
    }, [])
  return (
    (data ? (
    <MDBContainer className="py-5">
      <MDBCard>
        <MDBCardBody className="mx-4">
          <MDBContainer>
            <p className="my-5 text-center" style={{ fontSize: "30px" }}>
              Thank for your purchase
            </p>
            <MDBRow>
              <MDBTypography listUnStyled>
                <li className="text-black">{data.name}</li>
                <li className="text-muted mt-1">
                  <span className="text-black">Invoice</span> {data.transaction_id}
                </li>
                <li className="text-black mt-1">{data.time.substring(0,10)}</li>
              </MDBTypography>
              <hr />
              <MDBCol xl="10">
                <p>Products</p>
              </MDBCol>
              <MDBCol xl="2">
                <p className="float-end"><span>&#8358;</span> {data.amount}</p>
              </MDBCol>
              <hr />
            </MDBRow>
            <MDBRow>
              <MDBCol xl="10">
                <p>Delivery</p>
              </MDBCol>
              <MDBCol xl="2">
                <p className="float-end"><span>&#8358;</span> 1000</p>
              </MDBCol>
              <hr />
            </MDBRow>
            <MDBRow className="text-black">
              <MDBCol xl="12">
                <p className="float-end fw-bold">Total: <span>&#8358;</span>{data.amount + 1000}</p>
              </MDBCol>
              <hr style={{ border: "2px solid black" }} />
            </MDBRow>
            <div className="text-center" style={{ marginTop: "90px" }}>
              <a>
                <u className="text-info">View in browser</u>
              </a>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    ) : (
      <></>
    ))
  );
}

export default Invoice;