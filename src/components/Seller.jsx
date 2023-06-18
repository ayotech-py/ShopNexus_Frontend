import React, { useState, useEffect } from 'react';
import {
    MDBContainer, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBCard, MDBCardBody,
    MDBNavbar,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { FaThLarge, FaShoppingCart, FaChartLine, FaBox, FaTruck, FaBell, FaCog } from 'react-icons/fa';

const SellerDashboard = () => {
    const [activePage, setActivePage] = useState('dashboard');

    const handlePageChange = (page) => {
        setActivePage(page);
    };

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const token = window.localStorage.getItem('accessTokenSeller')
            const username = window.localStorage.getItem('username')
            const response = await fetch('http://127.0.0.1:8000/seller/', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'user': username,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data)

            } else {
                // Handle error response, e.g., display an error message
                //const { error } = await response.json();
                //alert('Username or Email doesnt exist')
                // Handle the error response
            }
        };
        getUser()
    }, [])
    console.log(user[0]['business_name'])
    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return (
                    <MDBCard className="mb-3">
                        <MDBCardBody>
                            <h4 className="mb-4">Dashboard Overview</h4>
                            <MDBRow>
                                <MDBCol md="4">
                                    <h6 className="text-uppercase">Total Products</h6>
                                    <p className="display-4">100</p>
                                </MDBCol>
                                <MDBCol md="4">
                                    <h6 className="text-uppercase">Total Products Sold</h6>
                                    <p className="display-4">50</p>
                                </MDBCol>
                                <MDBCol md="4">
                                    <h6 className="text-uppercase">Total Revenue</h6>
                                    <p className="display-4">$5000</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                );
            case 'products':
                return (
                    <MDBCard className="mb-3">
                        <MDBCardBody>
                            <h4 className="mb-4"><FaBox className="me-2" /> Product Management</h4>
                            {/* Product Management content */}
                        </MDBCardBody>
                    </MDBCard>
                );
            case 'orders':
                return (
                    <MDBCard className="mb-3">
                        <MDBCardBody>
                            <h4 className="mb-4"><FaShoppingCart className="me-2" /> Order Management</h4>
                            {/* Order Management content */}
                        </MDBCardBody>
                    </MDBCard>
                );
            case 'statistics':
                return (
                    <MDBCard className="mb-3">
                        <MDBCardBody>
                            <h4 className="mb-4"><FaChartLine className="me-2" /> Sales Analytics</h4>
                            {/* Sales Analytics content */}
                        </MDBCardBody>
                    </MDBCard>
                );
            case 'settings':
                return (
                    <MDBCard className="mb-3">
                        <MDBCardBody>
                            <h4 className="mb-4"><FaCog className="me-2" /> Settings and Account Management</h4>
                            {/* Account Settings Form */}
                        </MDBCardBody>
                    </MDBCard>
                )
            default:
                return null;
        }
    };

    return (
        <MDBContainer fluid>
            <MDBNavbar light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='#'>
                        <img
                            src='https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.webp'
                            height='30'
                            alt=''
                            loading='lazy'
                        />
                        ShopNexus
                    </MDBNavbarBrand>
                </MDBContainer>
            </MDBNavbar>
            <br />
            <MDBRow>
                <MDBCol md="3" >
                    <MDBCard className="mb-3" style={{ padding: '20px' }}>
                        {/* Sidebar */}
                        <div>
                            <div id="header-content" class="pl-3">
                                <img src={user[0]['business_logo']} alt="avatar" class="rounded-circle img-fluid mb-3" style={{ width: "100px" }} />

                                <h4>
                                    <span style={{ whitespace: "nowrap" }}>{user[0]['business_name']}</span>
                                </h4>
                                <p>{user[0]['email']}</p>
                            </div>
                        </div>
                        <MDBListGroup className="mb-3">
                            <MDBListGroupItem
                                active={activePage === 'dashboard'}
                                onClick={() => handlePageChange('dashboard')}
                            >
                                <FaThLarge className="me-2" /> Dashboard
                            </MDBListGroupItem>
                            <MDBListGroupItem
                                active={activePage === 'products'}
                                onClick={() => handlePageChange('products')}
                            >
                                <FaBox className="me-2" /> Products
                            </MDBListGroupItem>
                            <MDBListGroupItem
                                active={activePage === 'orders'}
                                onClick={() => handlePageChange('orders')}
                            >
                                <FaShoppingCart className="me-2" /> Orders
                            </MDBListGroupItem>
                            <MDBListGroupItem
                                active={activePage === 'statistics'}
                                onClick={() => handlePageChange('statistics')}
                            >
                                <FaChartLine className="me-2" /> Statistics
                            </MDBListGroupItem>
                            <MDBListGroupItem
                                active={activePage === 'settings'}
                                onClick={() => handlePageChange('settings')}
                            >
                                <FaCog className="me-2" /> Settings
                            </MDBListGroupItem>
                        </MDBListGroup>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="9">
                    {renderContent()}
                </MDBCol>
            </MDBRow>
        </MDBContainer >
    );
};

export default SellerDashboard;
