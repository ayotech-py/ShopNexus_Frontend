import React from "react";

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

const Features = () => {
    return (
        <div className="feature-section">
            <div className="categories">
                <ul className="category-list">
                    {Categories.map((category) => <li className="cat-list">{category}</li>)}
                </ul>
            </div>
            <div className="banner">
                <img src="https://img.freepik.com/free-psd/black-friday-super-sale-facebook-cover-template_106176-1544.jpg" alt="feature_banner" srcset="" />
            </div>
        </div>
    )
}

export default Features