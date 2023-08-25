import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBCard,
  MDBCardBody,
  MDBNavbar,
  MDBNavbarBrand,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBModalContent,
  MDBModalDialog,
} from "mdb-react-ui-kit";

import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

import {
  FaThLarge,
  FaShopping,
  Cart,
  FaChartLine,
  FaBox,
  FaTruck,
  FaBell,
  FaCog,
  FaShoppingCart,
} from "react-icons/fa";
import { resolvePath } from "react-router-dom";

const SellerDashboard = ({ user, products }) => {
  const [activePage, setActivePage] = useState("dashboard");
  const handlePageChange = (page) => {
    setActivePage(page);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [orders, setOrders] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedImages, setSelectedImages] = useState(["", "", "", "", ""]);
  const [showEditModal, setShowEditModal] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [editFields, setEditFields] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    count: ",",
  });

  const handleEditClick = (product) => {
    setEditProduct(product);
    setEditFields({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      count: product.count,
    });
    setShowEditModal(true);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    // Save the edited product logic goes here
    setShowEditModal(false);
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [productFields, setProductFields] = useState({
    name: "",
    description: "",
    images: [],
    count: "",
    price: "",
    category: "",
  });

  const ProducthandleFieldChange = (e) => {
    const { name, value } = e.target;
    setProductFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const ProducthandleAddClick = () => {
    setShowAddModal(true);
  };

  const ProducthandleSaveClick = () => {
    // Logic to save the product goes here
    productFields.images = selectedImages;
    const data = {
      images: productFields.images,
      name: productFields.name,
      description: productFields.description,
      price: productFields.price,
      category: productFields.category,
      quantity: productFields.count,
    };
    const token = window.localStorage.getItem("accessTokenSeller");
    const username = window.localStorage.getItem("username");
    const response = fetch("https://aaayotech.pythonanywhere.com/products/", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        user: username,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    response.then((response) => {
      if (response.status == 200) {
        alert("Product successfully Updated");
        setShowAddModal(false);
      } else {
        alert("An error occurred, please try again");
        setShowAddModal(false);
      }
    });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImages((prevState) => {
        const updatedImages = [...prevState];
        updatedImages[index] = reader.result;
        return updatedImages;
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  var totalSum = 0;

  if (products) {
    var totalSum = products.reduce((accumulator, currentItem) => {
      const subtotal = currentItem.price * currentItem.count;
      return accumulator + subtotal;
    }, 0);
  }

  const toggleDropdown = (order) => {
    if (selectedOrder && selectedOrder.id === order.product.id) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(order.product);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const token = window.localStorage.getItem("accessTokenSeller");
      const username = window.localStorage.getItem("username");
      const response = fetch(
        "https://aaayotech.pythonanywhere.com/seller-orders/",
        {
          headers: {
            Authorization: "Bearer " + token,
            user: username,
            "Content-Type": "application/json",
          },
        }
      );

      (await response).json().then((response) => {
        //do something(response);
        setOrders(response);
      });
    };
    fetchOrder();
  }, []);
  //do something(orders);

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <MDBCard className="mb-3">
            <MDBCardBody>
              <h4 className="mb-4">Dashboard Overview</h4>
              <MDBRow>
                <MDBCol md="4">
                  <h6 className="text-uppercase">Total Products</h6>
                  <p className="display-4">
                    {products ? products.length : "0"}
                  </p>
                </MDBCol>
                <MDBCol md="4">
                  <h6 className="text-uppercase">Total Products Sold</h6>
                  <p className="display-4">{orders.length}</p>
                </MDBCol>
                <MDBCol md="4">
                  <h6 className="text-uppercase">Total Revenue</h6>
                  <p className="display-4">
                    <span>&#8358;</span> {products ? totalSum : "00"}.00
                  </p>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        );
      case "products":
        return (
          <MDBCard className="mb-3">
            <MDBCardBody>
              <h4 className="mb-4">
                <FaBox className="me-2" /> Product Management
              </h4>
              <MDBBtn onClick={ProducthandleAddClick}>Add Product</MDBBtn>
              <br />
              <MDBModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
              >
                <MDBModalDialog>
                  <MDBModalContent>
                    <MDBModalHeader>Add Product</MDBModalHeader>
                    <MDBModalBody>
                      <form>
                        <MDBInput
                          label="Product Name"
                          name="name"
                          value={productFields.name}
                          onChange={ProducthandleFieldChange}
                          required
                        />
                        <br />
                        <MDBInput
                          label="Product Description"
                          name="description"
                          value={productFields.description}
                          onChange={ProducthandleFieldChange}
                          required
                        />
                        <br />
                        <MDBInput
                          id="imageUpload"
                          type="file"
                          accept="image/"
                          name="Product Image"
                          onChange={(e) => handleImageChange(e, 0)}
                          required
                        />
                        <br />
                        <MDBInput
                          id="imageUpload"
                          type="file"
                          accept="image/"
                          name="Image1"
                          onChange={(e) => handleImageChange(e, 1)}
                          required
                        />
                        <br />
                        <MDBInput
                          id="imageUpload"
                          type="file"
                          accept="image/"
                          name="Image2"
                          onChange={(e) => handleImageChange(e, 2)}
                          required
                        />
                        <br />
                        <MDBInput
                          id="imageUpload"
                          type="file"
                          accept="image/"
                          name="Image3"
                          onChange={(e) => handleImageChange(e, 3)}
                          required
                        />
                        <br />
                        <MDBInput
                          id="imageUpload"
                          type="file"
                          accept="image/"
                          name="Image4"
                          onChange={(e) => handleImageChange(e, 4)}
                          required
                        />
                        <br />
                        <MDBInput
                          label="Count"
                          type="number"
                          name="count"
                          value={productFields.count}
                          onChange={ProducthandleFieldChange}
                          required
                        />
                        <br />
                        <MDBInput
                          type="number"
                          label="Price"
                          name="price"
                          value={productFields.price}
                          onChange={ProducthandleFieldChange}
                          required
                        />
                        <br />
                        <MDBInput
                          label="Category"
                          name="category"
                          value={productFields.category}
                          onChange={ProducthandleFieldChange}
                          required
                        />
                      </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color="primary" onClick={ProducthandleSaveClick}>
                        Save
                      </MDBBtn>
                      <MDBBtn
                        color="secondary"
                        onClick={() => setShowAddModal(false)}
                      >
                        Cancel
                      </MDBBtn>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
              <br />
              <div className="container">
                <div className="row">
                  {products.map((product) => (
                    <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                      <MDBCard style={{ width: "18rem" }}>
                        <MDBCardImage
                          top
                          src={product.image}
                          alt={product.name}
                        />
                        <MDBCardBody>
                          <MDBCardTitle>{product.name}</MDBCardTitle>
                          <MDBCardText>
                            Quantity: {product.count}
                            <br />
                            Price:{" "}
                            {product.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </MDBCardText>
                          <MDBBtn
                            color="primary"
                            onClick={() => handleEditClick(product)}
                          >
                            Edit
                          </MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </div>
                  ))}
                </div>

                {editProduct && (
                  <MDBModal
                    show={showEditModal}
                    toggle={() => setShowEditModal(false)}
                  >
                    <MDBModalDialog>
                      <MDBModalContent>
                        <MDBModalHeader toggle={() => setShowEditModal(false)}>
                          Edit Product
                        </MDBModalHeader>
                        <MDBModalBody>
                          <form>
                            <MDBInput
                              label="Product Name"
                              name="name"
                              value={editFields.name}
                              onChange={handleFieldChange}
                              required
                            />
                            <br />
                            <MDBInput
                              label="Product Description"
                              name="description"
                              value={editFields.description}
                              onChange={handleFieldChange}
                              required
                            />
                            <br />
                            <MDBInput
                              label="Product Price"
                              name="price"
                              type="number"
                              value={editFields.price}
                              onChange={handleFieldChange}
                              required
                            />
                            <br />
                            <MDBInput
                              label="Product Category"
                              name="category"
                              value={editFields.category}
                              onChange={handleFieldChange}
                              required
                            />
                            <br />
                            <MDBInput
                              label="Product Count"
                              name="count"
                              type="number"
                              value={editFields.count}
                              onChange={ProducthandleFieldChange}
                              required
                            />
                          </form>
                        </MDBModalBody>
                        <MDBModalFooter>
                          <MDBBtn
                            color="primary"
                            onClick={ProducthandleSaveClick}
                          >
                            Save
                          </MDBBtn>
                          <MDBBtn
                            color="secondary"
                            onClick={() => setShowEditModal(false)}
                          >
                            Cancel
                          </MDBBtn>
                        </MDBModalFooter>
                      </MDBModalContent>
                    </MDBModalDialog>
                  </MDBModal>
                )}
              </div>
            </MDBCardBody>
          </MDBCard>
        );
      case "orders":
        return (
          <MDBCard className="mb-3">
            <MDBCardBody>
              <h4 className="mb-4">
                <FaShoppingCart className="me-2" /> Order Management
              </h4>
              <div>
                {orders ? (
                  orders.map((order) => (
                    <div key={order.product.id} className="mb-3">
                      <img
                        style={{ width: "200px", height: "200px" }}
                        src={
                          "https://aaayotech.pythonanywhere.com" +
                          order.product.image
                        }
                        alt={order.product.name}
                        className="product-image mt-3"
                      />
                      <div>
                        <strong>Product: </strong>
                        {order.product.name}
                      </div>
                      <div>
                        <strong>Product ID: </strong>
                        {order.product.id}
                      </div>
                      <MDBDropdown
                        isOpen={
                          selectedOrder && selectedOrder.id === order.product.id
                        }
                        className="mt-3"
                      >
                        <MDBDropdownToggle
                          onClick={() => toggleDropdown(order)}
                          color="primary"
                        >
                          {selectedOrder &&
                          selectedOrder.id === order.product.id
                            ? "Hide Customer Details"
                            : "Show Customer Details"}
                        </MDBDropdownToggle>
                        {selectedOrder &&
                          selectedOrder.id === order.product.id && (
                            <MDBDropdownMenu>
                              <MDBDropdownItem>
                                <strong>Customer Name: </strong>
                                {order.customer.name}
                              </MDBDropdownItem>
                              <MDBDropdownItem>
                                <strong>Customer Phone: </strong>
                                {"0" + order.customer.phone}
                              </MDBDropdownItem>
                              <MDBDropdownItem>
                                <strong>Customer Address: </strong>
                                {order.customer.address}
                              </MDBDropdownItem>
                            </MDBDropdownMenu>
                          )}
                      </MDBDropdown>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </MDBCardBody>
          </MDBCard>
        );
      case "statistics":
        return (
          <MDBCard className="mb-3">
            <MDBCardBody>
              <h4 className="mb-4">
                <FaChartLine className="me-2" /> Sales Analytics
              </h4>
              {/* Sales Analytics content */}
            </MDBCardBody>
          </MDBCard>
        );
      case "settings":
        return (
          <MDBCard className="mb-3">
            <MDBCardBody>
              <h4 className="mb-4">
                <FaCog className="me-2" /> Settings and Account Management
              </h4>
              {/* Account Settings Form */}
            </MDBCardBody>
          </MDBCard>
        );
      default:
        return null;
    }
  };

  return (
    <MDBContainer fluid>
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">ShopNexus Seller Dashboard</MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
      <br />
      <MDBRow>
        <MDBCol md="3">
          <MDBCard className="mb-3" style={{ padding: "20px" }}>
            {/* Sidebar */}
            <div>
              <div id="header-content" class="pl-3">
                {user ? (
                  <>
                    <img
                      src={user[0]["business_logo"]}
                      alt="avatar"
                      class="rounded-circle img-fluid mb-3"
                      style={{ width: "100px" }}
                    />
                    <h4>
                      <span style={{ whitespace: "nowrap" }}>
                        {user[0]["business_name"]}
                      </span>
                    </h4>
                    <p>{user[0]["email"]}</p>
                  </>
                ) : (
                  <>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCrF38eUbnQeSEjiEJmUNJPvCZ1iHInjDfk10-xtKdAA&s"
                      alt="avatar"
                      class="rounded-circle img-fluid mb-3"
                      style={{ width: "100px" }}
                    />
                    <h4>
                      <span style={{ whitespace: "nowrap" }}>username</span>
                    </h4>
                    <p>email@gmail.com</p>
                  </>
                )}
              </div>
            </div>
            <MDBListGroup className="mb-3">
              <MDBListGroupItem
                active={activePage === "dashboard"}
                onClick={() => handlePageChange("dashboard")}
              >
                <FaThLarge className="me-2" /> Dashboard
              </MDBListGroupItem>
              <MDBListGroupItem
                active={activePage === "products"}
                onClick={() => handlePageChange("products")}
              >
                <FaBox className="me-2" /> Products
              </MDBListGroupItem>
              <MDBListGroupItem
                active={activePage === "orders"}
                onClick={() => handlePageChange("orders")}
              >
                <FaShoppingCart className="me-2" /> Orders
              </MDBListGroupItem>
              <MDBListGroupItem
                active={activePage === "statistics"}
                onClick={() => handlePageChange("statistics")}
              >
                <FaChartLine className="me-2" /> Statistics
              </MDBListGroupItem>
              <MDBListGroupItem
                active={activePage === "settings"}
                onClick={() => handlePageChange("settings")}
              >
                <FaCog className="me-2" /> Settings
              </MDBListGroupItem>
            </MDBListGroup>
          </MDBCard>
        </MDBCol>
        <MDBCol md="9">{renderContent()}</MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SellerDashboard;
