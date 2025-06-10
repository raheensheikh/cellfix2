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
const Checkout = () => {
  const navigate = useNavigate();
  const btn2Route = "/checkout";
  const btn3Route = "/wishlist";
  const [activeCard, setActiveCard] = useState(null);

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
                  <OrderItem
                    image={images.repair1}
                    title="Intel Core i9-14900K New Gaming Desktop Processor"
                    price="449.00"
                  />
                  <OrderItem
                    image={images.repair1}
                    title="Intel Core i9-14900K New Gaming Desktop Processor"
                    price="449.00"
                  />
                  <TotalCost />
                </div>
                <div className="btn_sec d_flex mt-3">
                  <GlobalButton
                    text="Complete Purchase"
                    border="none"
                    onClick={() => navigate(btn3Route)}
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
                  <Col lg={6} md={6} >
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
                   <GlobalButton
                    text="Checkout"
                    border="none"
                    onClick={() => navigate(btn3Route)}
                  />
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </div>
  );
};

export default Checkout;
