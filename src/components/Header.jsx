import React, { useState, useContext } from 'react';
import { CartContext } from './Cart';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'
import { Outlet, Link } from "react-router-dom";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
} from 'mdb-react-ui-kit';


const Header = ({ count }) => {
    const [showBasic, setShowBasic] = useState(false);
    const { cart } = useContext(CartContext);
    return (
        <div className="header-section">
            <MDBNavbar expand='lg' light bgColor='light'>
                <MDBContainer fluid className='nav-container'>
                    <div className='brand-name'>
                        <Link to="/"><MDBNavbarBrand>ShopNexus</MDBNavbarBrand></Link>

                    </div>

                    <MDBNavbarToggler
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowBasic(!showBasic)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>

                    <div className="search">
                        <input type="text" placeholder="fashion, electronics, phones, home" />
                        <div className="search-btn">
                            <CiSearch fontSize={25} color="white" />
                        </div>
                    </div>
                    <div className='right-nav'>

                        <MDBCollapse navbar show={showBasic}>
                            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>

                                <MDBNavbarItem>
                                    <MDBDropdown>
                                        <div className="contact">
                                            <MDBIcon fas icon="user-alt" />
                                            <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                                                Account
                                            </MDBDropdownToggle>
                                        </div>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem link>Login as Buyer</MDBDropdownItem>
                                            <Link to="/auth/login-in"><MDBDropdownItem link>Login as Seller</MDBDropdownItem></Link>
                                            <Link to="/auth/sign-up"><MDBDropdownItem link>Create an Account</MDBDropdownItem></Link>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavbarItem>

                                <MDBNavbarItem>
                                    <div className="contact">
                                        <MDBIcon fas icon="user-alt" />
                                        <Link to="/contact"><MDBNavbarLink>Contact Us</MDBNavbarLink></Link>
                                    </div>
                                </MDBNavbarItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                        <Link to='/cart/cart'>
                            <button type="button" className="cart">
                                <AiOutlineShoppingCart />
                                <span>{cart.length}</span>
                            </button>
                        </Link>
                    </div>
                </MDBContainer>
            </MDBNavbar>
            <Outlet />
        </div>
    )
}

export default Header