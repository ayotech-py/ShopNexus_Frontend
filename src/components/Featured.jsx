import React, { useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { Outlet, Link } from "react-router-dom";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBDropdown,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";

const Categories = [
  "Health & Beauty",
  "Home & Office",
  "Appliances",
  "Phones & Tablets",
  "Computing",
  "Electronics",
  "Fashion",
  "Baby Products",
  "Gaming",
  "Sporting Goods",
  "Other categories",
];

const Features = ({ shopId }) => {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <div className="feature-section">
      <div className="categories">
        <MDBCol lg="12" className="mb-4 mb-lg-4">
          <div className="category-head">
            <h5
              style={{
                fontSize: "1.3rem",
                paddingBottom: "10px",
              }}
            >
              OUR CATEGORIES
            </h5>
          </div>
          <ul className="category-list">
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
      </div>
      <div className="banner">
        <MDBCarousel showIndicators showControls fade>
          <MDBCarouselItem
            className="w-100 d-block"
            itemId={1}
            src="https://i.ytimg.com/vi/f64GdOxJjPE/maxresdefault.jpg"
            alt="..."
          >
            <h5></h5>
            <p></p>
          </MDBCarouselItem>

          <MDBCarouselItem
            className="w-100 d-block"
            itemId={2}
            src="https://img.freepik.com/free-psd/black-friday-super-sale-web-banner-template_106176-1671.jpg"
            alt="..."
          >
            <h5></h5>
            <p></p>
          </MDBCarouselItem>

          <MDBCarouselItem
            className="w-100 d-block"
            itemId={3}
            src="https://marketplace.canva.com/EAFED0hv9G0/1/0/1600w/canva-blue-pink-modern-special-offer-sale-banner-J5VkNReQ8WA.jpg"
            alt="..."
          >
            <h5></h5>
            <p></p>
          </MDBCarouselItem>
        </MDBCarousel>
      </div>
    </div>
  );
};

export default Features;
