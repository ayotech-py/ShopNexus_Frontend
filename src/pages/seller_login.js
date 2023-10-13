import { React, useState } from 'react';
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
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const SellerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://shop-nexus-api.vercel.app/seller-login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email, // assuming you have stored the email input in the 'email' state
                    password: password, // assuming you have stored the password input in the 'password' state
                }),
            });

            if (response.ok) {
                const { access, refresh, username } = await response.json();
                window.localStorage.clear('accessToken');
                window.localStorage.clear('refreshToken');
                window.localStorage.setItem('accessTokenSeller', access);
                window.localStorage.setItem('refreshTokenSeller', refresh);
                window.localStorage.setItem('username', username);
                window.location.href = '/seller-dashboard';
                // Do something with the tokens
            } else {
                // Handle error response, e.g., display an error message
                const { error } = await response.json();
                alert(error)
                // Handle the error response
            }
        } catch (error) {
            // Handle fetch error, e.g., display an error message
        }
    };

    return (
        <MDBContainer fluid style={{ marginTop: "120px" }}>

            <div className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol className='order-2 order-lg-1 d-flex flex-column align-items-center my-input'>

                            <h3 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log in to your dashboard</h3>

                            <div className="d-flex flex-row align-items-center mb-4" style={{ width: "350px" }}>
                                <MDBIcon fas icon="envelope me-3" size='lg' />
                                <MDBInput label='Your Email' id='form2' type='email' value={email} style={{height: "50px"}}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4" style={{ width: "350px" }}>
                                <MDBIcon fas icon="lock me-3" size='lg' />
                                <MDBInput label='Password' id='form3' type='password' value={password} style={{height: "50px"}}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className="my-btn">
                                <MDBBtn className='mb-5' size='lg' onClick={handleSubmit}>Log in</MDBBtn>
                            </div>

                            <a className="small text-muted" href="#!">Forgot password?</a>
                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <Link to="/auth/seller-sign-up"> <a href="" style={{ color: '#393f81' }}>Register here</a></Link></p>


                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </div>

        </MDBContainer>
    );
}

export default SellerLogin;