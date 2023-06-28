import React, { useState, useContext } from "react";
import { CartContext } from "./Cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
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
} from "mdb-react-ui-kit";

const Header = ({ user }) => {
  const [showBasic, setShowBasic] = useState(false);
  const { addToCart, cart, updateCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState("");

  const handleAddToCart = (cartname) => {
    var cart_id = [];
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        cart_id.push(cart[i]["id"]);
      }
    }
    if (cart_id.includes(cartname["id"])) {
      console.log("Item already in cart");
    } else {
      cartname["quantity"] = quantity;
      addToCart(cartname);
    }
  };
  if (user && user["orderitems"].length > 0) {
    user["orderitems"].map((product) => handleAddToCart(product.product));
  }

  const searchPage = () => {
    if (search) {
      window.location.href = `/search/${search}`;
      console.log(search);
    }
  };

  const logOut = () => {
    window.localStorage.clear("accessToken");
    window.localStorage.clear("refressToken");
    window.location.reload();
    window.location.href = "/";
  };

  return (
    <div className="header-section">
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid className="nav-container">
          <div className="brand-name">
            <Link to="/">
              <MDBNavbarBrand>ShopNexus</MDBNavbarBrand>
            </Link>
          </div>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <div className="search">
            <input
              type="text"
              placeholder="fashion, electronics, phones, home"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="search-btn" onClick={searchPage}>
              <CiSearch fontSize={25} color="white" />
            </div>
          </div>

          <div className="right-nav">
            <MDBCollapse navbar show={showBasic}>
              <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                {user ? (
                  <MDBNavbarItem>
                    <MDBDropdown>
                      <div className="contact">
                        <MDBIcon fas icon="user-alt" />
                        <MDBDropdownToggle
                          tag="a"
                          className="nav-link"
                          role="button"
                        >
                          Hi, {user.name}
                        </MDBDropdownToggle>
                      </div>
                      <MDBDropdownMenu>
                        <Link to="/customer/profile">
                          <MDBDropdownItem link>Profile</MDBDropdownItem>
                        </Link>
                        <Link to="/cart/cart">
                          <MDBDropdownItem link>Cart</MDBDropdownItem>
                        </Link>
                        <Link to="/customer/orders">
                          <MDBDropdownItem link>Orders</MDBDropdownItem>
                        </Link>
                        <MDBDropdownItem onClick={logOut} link>
                          Log-out
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarItem>
                ) : (
                  <MDBNavbarItem>
                    <MDBDropdown>
                      <div className="contact">
                        <MDBIcon fas icon="user-alt" />
                        <MDBDropdownToggle
                          tag="a"
                          className="nav-link"
                          role="button"
                        >
                          Account
                        </MDBDropdownToggle>
                      </div>
                      <MDBDropdownMenu>
                        <Link to="/auth/seller-login">
                          <MDBDropdownItem link>
                            Login as Seller
                          </MDBDropdownItem>
                        </Link>
                        <Link to="/auth/login-in">
                          <MDBDropdownItem link>Login as Buyer</MDBDropdownItem>
                        </Link>
                        <Link to="/auth/sign-up">
                          <MDBDropdownItem link>
                            Create an Account
                          </MDBDropdownItem>
                        </Link>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarItem>
                )}

                <MDBNavbarItem>
                  <div className="contact">
                    <MDBIcon fas icon="phone" />
                    <Link to="/contact">
                      <MDBNavbarLink>Contact Us</MDBNavbarLink>
                    </Link>
                  </div>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
            <Link to="/cart/cart">
              {user ? (
                <button type="button" className="cart">
                  <AiOutlineShoppingCart />
                  <span>{cart.length}</span>
                </button>
              ) : (
                <button type="button" className="cart">
                  <AiOutlineShoppingCart />
                  <span>{cart.length}</span>
                </button>
              )}
            </Link>
          </div>
        </MDBContainer>
      </MDBNavbar>
      <Outlet />
    </div>
  );
};

export default Header;
