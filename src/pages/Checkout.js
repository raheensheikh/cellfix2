import Layout from "../components/Layout.jsx";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import images from "../assets/images/index.js";
import React, { useRef, useState, useEffect } from "react";
import GlobalButton from "../components/GlobalButton.jsx";
import { useNavigate } from "react-router-dom";
import OrderItem from "../components/OrderItem.jsx";
import TotalCost from "../components/TotalCost.jsx";
import LabeledInput from "../components/LabeledInput.jsx";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";
import Modal from "../components/Modal.jsx";
const Checkout = () => {
  const navigate = useNavigate();
  const btn2Route = "/checkout";
  const btn3Route = "/wishlist";
  const [activeCard, setActiveCard] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [isModalSuccess, setModalSuccess] = useState(false);
  const getCart = async () => {
    const { response, error } = await apiHelper("GET", "cart/view", {}, null);
    if (response) {
      setCartData(response.data.response.data);
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const handleIncrement = async (item) => {
    const body = {
      cart_id: item.id,
      type: "increase",
    };
    const { response, error } = await apiHelper(
      "POST",
      "cart/update-quantity",
      {},
      body
    );
    if (response) {
      setCartData(response.data.response.data);
    } else {
      toast.error(error);
    }
  };

  const handleDecrement = async (item) => {
    const body = {
      cart_id: item.id,
      type: "decrease",
    };
    const { response, error } = await apiHelper(
      "POST",
      "cart/update-quantity",
      {},
      body
    );
    if (response) {
      setCartData(response.data.response.data);
    } else {
      toast.error(error);
    }
  };

  const cardImages = [
    images.card1,
    images.card2,
    images.card3,
    images.card4,
    images.card5,
  ];

  const handleCardClick = (index) => {
    setActiveCard(index);
  };
  return (
    <div>
      <Layout>
        <section className="checkout_section">
          <Container>
            <Row>
              <Col lg={6} md={8} className="mb-3">
                <div className="orderDetails">
                  <h2 className="heading">order details</h2>
                  {cartData.items?.map((item) => (
                    <OrderItem
                      key={item.product.id}
                      image={item.product.image}
                      title={item.product.title}
                      price={item.product.price}
                      showCloseButton={true}
                      quantity={item.quantity}
                      onIncrement={() => handleIncrement(item)}
                      onDecrement={() => handleDecrement(item)}
                      onRemove={() => console.log("sdf")}
                    />
                  ))}
                  <TotalCost
                    subtotal={cartData.subtotal?.toFixed(2)}
                    shipping={cartData.shipping?.toFixed(2)}
                    total={cartData.total?.toFixed(2)}
                  />
                </div>
                <div className="btn_sec d_flex mt-3">
                  <GlobalButton
                    text="Complete Purchase"
                    border="none"
                    onClick={() => setModalSuccess(true)}
                  />
                  <GlobalButton
                    text="Cancel"
                    color="#fff"
                    textColor="#000"
                    border="1px solid #000"
                    onClick={() => navigate(btn2Route)}
                  />
                </div>
              </Col>
              <Col lg={6} md={8} className="mb-3">
                <h2 className="heading">Complete your order</h2>
                <p className="redText ">Personal Details</p>
                <Row>
                  <Col lg={6} md={6}>
                    <LabeledInput
                      label="First Name"
                      placeholder="First Name"
                      className="inputfield"
                    />
                  </Col>
                  <Col lg={6} md={6}>
                    <LabeledInput
                      label="Last Name"
                      placeholder="Last Name"
                      className="inputfield"
                    />
                  </Col>
                  <Col lg={6} md={6}>
                    <LabeledInput
                      label="Email"
                      placeholder="Enter Your Email"
                      className="inputfield"
                    />
                  </Col>
                  <Col lg={6} md={6}>
                    <LabeledInput
                      label="Phone Number"
                      placeholder="Enter Your Phone Number"
                      className="inputfield"
                    />
                  </Col>
                  <p className="redText ">Payment Details</p>
                  <div className="d_flex paymentCards mb-3">
                    {cardImages.map((img, index) => (
                      <div
                        key={index}
                        className={`cards ${
                          activeCard === index ? "active" : ""
                        }`}
                        onClick={() => handleCardClick(index)}
                      >
                        <Image src={img} alt={`Card ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                  <Col lg={6} md={6}>
                    <LabeledInput
                      label="Card Holder Name"
                      placeholder="Enter Card Holder Name"
                      className="inputfield"
                    />
                  </Col>
                  <Col lg={6} md={6}>
                    <LabeledInput
                      label="Card Number"
                      placeholder="Enter Card Number"
                      className="inputfield"
                    />
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <LabeledInput
                      label="CVV"
                      placeholder="Example: 4567"
                      className="inputfield"
                    />
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <LabeledInput
                      label="Expiry Date"
                      placeholder="MM/YY"
                      className="inputfield"
                    />
                  </Col>
                  <p className="redText my-3">Shipping Address</p>
                  <Col lg={12} md={12}>
                    <LabeledInput
                      label="Address Line 1"
                      placeholder="Your Complete address..."
                      className="inputfield"
                    />
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <LabeledInput
                      label="City"
                      placeholder="Enter City"
                      className="inputfield"
                    />
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <LabeledInput
                      label="State"
                      placeholder="Enter State"
                      className="inputfield"
                    />
                  </Col>
                  <Col lg={6} md={6}>
                    <LabeledInput
                      label="Landmark"
                      placeholder="Any Landmark (famous place or mall)"
                      className="inputfield"
                    />
                  </Col>
                  <Col lg={6} md={6}>
                    <LabeledInput
                      label="Postal Code"
                      placeholder="ZIP Code (231216)"
                      className="inputfield"
                    />
                  </Col>
                  {/* <GlobalButton
                    text="Checkout"
                    border="none"
                    onClick={() => navigate(btn3Route)}
                  /> */}
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <Modal
          isOpen={isModalSuccess}
          onClose={() => setModalSuccess(false)}
          showHeader={false}
          heading="Contact Us"
        >
          <div className="successModal">
            <Image src={images.check} alt="Success" />
            <h2 className="heading">Your order has been placed successfully</h2>
            <p className="para">
              your order will be delivered to you as soon as possible
            </p>
            <div className="btn_sec">
              <GlobalButton
                text="Back to Shopping Orders"
                border="1px solid #000"
                onClick={() => navigate("/")}
              />
            </div>
          </div>
        </Modal>
      </Layout>
    </div>
  );
};

export default Checkout;
