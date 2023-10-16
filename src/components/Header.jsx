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
  MDBCol,
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
      //do something
    } else {
      cartname["quantity"] = quantity;
      addToCart(cartname);
    }
  };

  const fetchCart = async () => {
    const token = window.localStorage.getItem("accessToken");
    const username = window.localStorage.getItem("username");
    const response = await fetch(
      "https://shop-nexus-api.vercel.app/get-user-details/",
      {
        headers: {
          Authorization: "Bearer " + token,
          user: username,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const userOrder = await response.json();
      console.log(userOrder["data"]);
      if (userOrder && userOrder["data"]["orderitems"].length > 0) {
        userOrder["data"]["orderitems"].map((product) =>
          handleAddToCart(product.product)
        );
      }
    } else {
    }
  };

  fetchCart();

  const searchPage = () => {
    if (search) {
      window.location.href = `/search/${search}`;
    }
  };

  const logOut = () => {
    window.localStorage.clear("accessToken");
    window.localStorage.clear("refressToken");
    window.location.reload();
    window.location.href = "/";
  };

  return (
    <header className="header-section">
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid className="nav-container">
          <div className="brand-name">
            <Link to="/">
              <MDBNavbarBrand>MiChoice</MDBNavbarBrand>
            </Link>
          </div>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="toggle"
          >
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
            <MDBIcon
              style={{ color: "black", paddingLeft: "20px" }}
              onClick={() => setShowBasic(!showBasic)}
              icon="bars"
              fas
            />
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
                <h5
                  style={{
                    paddingTop: "10px",
                    color: "black",
                    fontSize: "1rem",
                  }}
                  className="h5-lg"
                >
                  MY MICHOICE ACCOUNT
                </h5>
                {user ? (
                  <MDBNavbarItem>
                    <MDBDropdown>
                      <div className="contact">
                        <MDBIcon fas icon="user-alt" />
                        <MDBDropdownToggle
                          tag="a"
                          className="nav-link"
                          role="button"
                          style={{
                            color: "black",
                            fontSize: ".9rem",
                            paddingLeft: "10px",
                          }}
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
                      <div
                        className="contact"
                        style={{
                          color: "black",
                        }}
                      >
                        <MDBIcon fas icon="user-alt" />
                        <MDBDropdownToggle
                          tag="a"
                          className="nav-link"
                          role="button"
                          style={{
                            color: "black",
                            fontSize: ".9rem",
                            paddingLeft: "10px",
                          }}
                        >
                          {" "}
                          Account
                        </MDBDropdownToggle>
                      </div>
                      <MDBDropdownMenu onClick={() => setShowBasic(!showBasic)}>
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
                  <div
                    className="contact"
                    style={{
                      color: "black",
                    }}
                  >
                    <MDBIcon fas icon="phone" />
                    <Link to="/contact">
                      <MDBNavbarLink
                        style={{
                          color: "black",
                          fontSize: ".9rem",
                          paddingLeft: "10px",
                        }}
                      >
                        {" "}
                        Contact Us
                      </MDBNavbarLink>
                    </Link>
                  </div>
                  <MDBCol lg="12" className="mb-4 mb-lg-4 feature-lg">
                    <div
                      style={{ paddingLeft: "0px", paddingBottom: "10px" }}
                      className="category-head"
                    >
                      <h5
                        style={{
                          color: "black",
                          fontSize: "1rem",
                        }}
                      >
                        OUR CATEGORIES
                      </h5>
                    </div>
                    <ul
                      style={{ listStyle: "none", paddingLeft: "0px" }}
                      className="category-list"
                    >
                      <li>
                        <a href={`/categories/Health & Beauty`}>
                          <i class="fas fa-heart"></i> Health & Beauty
                        </a>
                      </li>
                      <li>
                        <a href={`/categories/Home & Office`}>
                          <i class="fas fa-home"></i> Home & Office
                        </a>
                      </li>
                      <li>
                        <a href={`/categories/Appliances`}>
                          <i class="fas fa-blender"></i> Appliances
                        </a>
                      </li>
                      <li>
                        <a href={`/categories/Phones & Tablets`}>
                          <i class="fas fa-mobile-alt"></i> Phones & Tablets
                        </a>
                      </li>
                      <li>
                        <a href={`/categories/Computing`}>
                          <i class="fas fa-laptop"></i> Computing
                        </a>
                      </li>
                      <li>
                        <a href={`/categories/Electronics`}>
                          <i class="fas fa-tv"></i> Electronics
                        </a>
                      </li>
                      <li>
                        <a href={`/categories/Fashion`}>
                          <i class="fas fa-tshirt"></i> Fashion
                        </a>
                      </li>
                      <li>
                        <a href={`/categories/Baby Products`}>
                          <i class="fas fa-baby"></i> Baby Products
                        </a>
                      </li>
                      <li>
                        <a href={`/categories/Gaming`}>
                          <i class="fas fa-gamepad"></i> Gaming
                        </a>
                      </li>
                      <li>
                        <a href={`/categories/Sporting Goods`}>
                          <i class="fas fa-futbol"></i> Sporting Goods
                        </a>
                      </li>
                      <li>
                        <a href={`/categories/Other categories`}>
                          <i class="fas fa-tags"></i> Other categories
                        </a>
                      </li>
                    </ul>
                  </MDBCol>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
            <Link to="/cart/cart" className="cart-lg">
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
    </header>
  );
};

export default Header;
