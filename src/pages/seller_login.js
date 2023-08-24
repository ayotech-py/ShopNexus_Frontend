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
            const response = await fetch('https://aaayotech.pythonanywhere.com/seller-login/', {
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
        <MDBContainer fluid>

            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center my-input'>

                            <h3 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log in to your dashboard</h3>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="envelope me-3" size='lg' />
                                <MDBInput label='Your Email' id='form2' type='email' value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="lock me-3" size='lg' />
                                <MDBInput label='Password' id='form3' type='password' value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className="my-btn">
                                <MDBBtn className='mb-5' size='lg' onClick={handleSubmit}>Log in</MDBBtn>
                            </div>

                            <a className="small text-muted" href="#!">Forgot password?</a>
                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <Link to="/auth/seller-sign-up"> <a href="" style={{ color: '#393f81' }}>Register here</a></Link></p>


                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
}

export default SellerLogin;