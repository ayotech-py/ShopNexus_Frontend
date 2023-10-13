import { React, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== repeatPassword) {
      alert("Passwords do not match. Please retype the password.");
      return;
    }
    try {
      const response = await fetch(
        "https://shop-nexus-api.vercel.app/customer-register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email, // assuming you have stored the email input in the 'email' state
            phone: phone,
            address: address,
            password: password, // assuming you have stored the password input in the 'password' state
          }),
        }
      );

      if (response.ok) {
        const { success } = await response.json();
        alert(success);
        window.location.href = "/auth/login-in";
        // Do something with the tokens
      } else {
        // Handle error response, e.g., display an error message
        const { error } = await response.json();
        alert(error);
        // Handle the error response
      }
    } catch (error) {
      // Handle fetch error, e.g., display an error message
    }
  };

  return (
    <MDBContainer fluid style={{ marginTop: "120px" }}>
      <div style={{ borderRadius: "25px", color: "black" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol className="order-2 order-lg-1 d-flex flex-column align-items-center my-input">
              <h3 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Sign up
              </h3>

              <div
                className="d-flex flex-row align-items-center mb-4 "
                style={{ width: "350px" }}
              >
                <MDBIcon fas icon="user me-3" size="lg" />
                <MDBInput
                  label="Your Name"
                  id="form1"
                  type="text"
                  className="w-100"
                  value={name}
                  style={{ height: "50px" }}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div
                className="d-flex flex-row align-items-center mb-4"
                style={{ width: "350px" }}
              >
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  label="Your Email"
                  id="form2"
                  type="email"
                  value={email}
                  style={{ height: "50px" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div
                className="d-flex flex-row align-items-center mb-4"
                style={{ width: "350px" }}
              >
                <MDBIcon fas icon="phone me-3" size="lg" />
                <MDBInput
                  label="Your Phone"
                  id="form2"
                  type="number"
                  value={phone}
                  style={{ height: "50px" }}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div
                className="d-flex flex-row align-items-center mb-4"
                style={{ width: "350px" }}
              >
                <MDBIcon fas icon="house me-3" size="lg" />
                <MDBInput
                  label="Your Address"
                  id="form2"
                  type="text"
                  value={address}
                  style={{ height: "50px" }}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div
                className="d-flex flex-row align-items-center mb-4"
                style={{ width: "350px" }}
              >
                <MDBIcon fas icon="lock me-3" size="lg" />
                <MDBInput
                  label="Password"
                  id="form3"
                  type="password"
                  value={password}
                  style={{ height: "50px" }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div
                className="d-flex flex-row align-items-center mb-4"
                style={{ width: "350px" }}
              >
                <MDBIcon fas icon="key me-3" size="lg" />
                <MDBInput
                  label="Repeat your password"
                  id="form4"
                  type="password"
                  value={repeatPassword}
                  style={{ height: "50px" }}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="I agree all statements in Terms of service"
                />
              </div>

              <div className="my-btn">
                <MDBBtn className="mb-5" size="lg" onClick={handleSubmit}>
                  Register
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </div>
    </MDBContainer>
  );
};

export default Signup;
