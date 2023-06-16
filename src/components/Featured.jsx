import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
} from "mdb-react-ui-kit";

const Categories = [
    "Electronics",
    "Fashion",
    "Home & Furniture",
    "Beauty & Personal Care",
    "Health & Wellness",
    "Baby & Kids",
    "Books & Media",
    "Sports & Outdoors",
    "Automotive",
    "Groceries & Food",
    "Pet Supplies",
    "Home Appliances",
    "Office Supplies",
    "Arts & Crafts",
    "Jewelry & Watches"
];

const Features = ({ shopId }) => {
    return (
        <div className="feature-section">
            <div className="categories">
                <MDBCol lg="12" className="mb-4 mb-lg-4">
                    <div className="category-head">
                        <p><MDBIcon fas icon="align-justify" /></p>
                        <h5>Categories</h5>
                    </div>
                    <ul className="category-list">
                        {Categories.map((category) => <a href={`/categories/${category}`}><li className="cat-list">{category}</li></a>)}
                    </ul>
                </MDBCol>
            </div >
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
                        <p>

                        </p>
                    </MDBCarouselItem>
                </MDBCarousel>
            </div>
        </div >
    )
}

export default Features