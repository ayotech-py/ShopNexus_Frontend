import { React, useState, useRef } from 'react';
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
    MDBCheckbox
} from 'mdb-react-ui-kit';
import { json } from 'react-router-dom';

const SellerSignup = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [bio, setBio] = useState('');
    const [about, setAbout] = useState('');
    const [businessname, setBusinessName] = useState('');
    const [businessreg, setBusinessReg] = useState('');
    const [businesscategory, setBusinessCategory] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const form = useRef(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== repeatPassword) {
            alert('Passwords do not match. Please retype the password.');
            return;
        }
        try {
            const data = {
                'name': name,
                'email': email,
                'phone': phone,
                'address': address,
                'bio': bio,
                'about': about,
                'businessname': businessname,
                'businesscategory': businesscategory,
                'businessreg': businessreg,
                'image': selectedImage,
                'password': password,
            }

            console.log(data)

            const response = await fetch('http://127.0.0.1:8000/seller-register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const { success } = await response.json();
                alert(success);
                window.location.href = '/auth/seller-login';
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

                            <h3 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Become a Seller</h3>
                            <form onSubmit={handleSubmit}>

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="user me-3" size='lg' />
                                    <MDBInput label='Your Name' id='name' type='text' value={name}
                                        onChange={(e) => setName(e.target.value)} style={{ width: "400px" }} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size='lg' />
                                    <MDBInput label='Your Email' id='form2' type='email' value={email}
                                        onChange={(e) => setEmail(e.target.value)} style={{ width: "400px" }} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="phone me-3" size='lg' />
                                    <MDBInput label='Your Phone' id='form3' type='number' value={phone}
                                        onChange={(e) => setPhone(e.target.value)} style={{ width: "400px" }} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="house me-3" size='lg' />
                                    <MDBInput label='Your Address' id='form4' type='text' value={address}
                                        onChange={(e) => setAddress(e.target.value)} style={{ width: "400px" }} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="user me-3" size='lg' />
                                    <MDBInput label='Bio' id='form5' type='text' value={bio}
                                        onChange={(e) => setBio(e.target.value)} style={{ width: "400px" }} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="user me-3" size='lg' />
                                    <MDBInput label='About' id='form6' type='text' value={about}
                                        onChange={(e) => setAbout(e.target.value)} style={{ width: "400px" }} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="user me-3" size='lg' />
                                    <MDBInput label='Business Name' id='form7' type='text' value={businessname}
                                        onChange={(e) => setBusinessName(e.target.value)} style={{ width: "400px" }} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="user me-3" size='lg' />
                                    <MDBInput label='Business Reg No' id='form8' type='text' value={businessreg}
                                        onChange={(e) => setBusinessReg(e.target.value)} style={{ width: "400px" }} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="user me-3" size='lg' />
                                    <MDBInput label='Business Category' id='form9' type='text' value={businesscategory}
                                        onChange={(e) => setBusinessCategory(e.target.value)} style={{ width: "400px" }} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="image me-3" size='lg' />
                                    <div className="mb-3" style={{ width: "400px" }}>
                                        <label htmlFor="imageUpload" className="form-label">Business Logo</label>
                                        <br />
                                        <input
                                            id="imageUpload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="lock me-3" size='lg' />
                                    <MDBInput label='Password' id='form10' type='password' value={password}
                                        onChange={(e) => setPassword(e.target.value)} style={{ width: "400px" }} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="key me-3" size='lg' />
                                    <MDBInput label='Repeat your password' id='form11' type='password' value={repeatPassword}
                                        onChange={(e) => setRepeatPassword(e.target.value)} style={{ width: "400px" }} />
                                </div>

                                <div className='mb-4'>
                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='I agree all statements in Terms of service' />
                                </div>

                                <div className="my-btn">
                                    <button type="submit" className="btn btn-primary">Submit</button>

                                </div>
                            </form>
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


export default SellerSignup;