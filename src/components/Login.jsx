import { React, useState } from "react";
import "../css/Login.css";
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
} from "mdb-react-ui-kit";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://shop-nexus-api.vercel.app/customer-login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email, // assuming you have stored the email input in the 'email' state
            password: password, // assuming you have stored the password input in the 'password' state
          }),
        }
      );

      if (response.ok) {
        const { access, refresh, username } = await response.json();
        window.location.href = "/";
        window.localStorage.setItem("accessToken", access);
        window.localStorage.setItem("refreshToken", refresh);
        window.localStorage.setItem("username", username);
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
    <section className="login_part section_padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6">
            <div className="login_part_text text-center">
              <div className="login_part_text_iner">
                <h2>New to our Shop?</h2>
                <p>{`There are advances being made in science and technology
everyday, and a good example of this is the`}</p>
                <a className="btn_3" href="/auth/sign-up">
                  Create an Account
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="login_part_form">
              <div className="login_part_form_iner">
                <h3>
                  Welcome Back ! <br style={{ boxSizing: "border-box" }} />
                  {"Please Sign in now"}
                </h3>
                <form
                  className="row contact_form"
                  action="#"
                  method="post"
                  noValidate="novalidate"
                >
                  <div className="col-md-12 form-group p_star">
                    <input
                      label="Your Email"
                      id="form2"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      name="name"
                      placeholder="email"
                    />
                  </div>
                  <div className="col-md-12 form-group p_star">
                    <input
                      label="Password"
                      id="form3"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <div className="creat_account d-flex align-items-center">
                      <input id="f-option" name="selector" type="checkbox" />
                      <label htmlFor="f-option">Remember me</label>
                    </div>
                    <button
                      className="btn_3"
                      type="submit"
                      value="submit"
                      onClick={handleSubmit}
                    >
                      {"log in"}
                    </button>
                    <a
                      className="lost_pass"
                      href="https://preview.colorlib.com/theme/timezone/login.html#"
                    >
                      forget password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
