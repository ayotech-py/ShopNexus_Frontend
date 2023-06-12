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
                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
                        alt="..."
                    >
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </MDBCarouselItem>

                    <MDBCarouselItem
                        className="w-100 d-block"
                        itemId={2}
                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
                        alt="..."
                    >
                        <h5>Second slide label</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </MDBCarouselItem>

                    <MDBCarouselItem
                        className="w-100 d-block"
                        itemId={3}
                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
                        alt="..."
                    >
                        <h5>Third slide label</h5>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </MDBCarouselItem>
                </MDBCarousel>
            </div>
        </div >
    )
}

export default Features