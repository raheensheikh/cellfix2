import Layout from "../components/Layout.jsx";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import images from "../assets/images/index.js";
import React, { useRef, useState, useEffect } from "react";
import GlobalButton from "../components/GlobalButton.jsx";
import Features from "../components/Features.jsx";
import DynamicTabs from "../components/DynamicTabs.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SearchField from "../components/SearchField.jsx";
import DeviceFilterSidebar from "../components/DeviceFilterSidebar.jsx";
const PhoneParts = () => {
  const tabs = [
    {
      eventKey: "apple",
      image: images.apple,
      content: (
        <>
          <SearchField />
          <Row>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.parts1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.parts2}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.parts3}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.parts1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.parts2}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.parts3}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.parts1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.parts2}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
          </Row>
        </>
      ),
    },
    {
      eventKey: "samsung",
      image: images.samsung,
      content: (
        <>
          <SearchField />
          <Row>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
          </Row>
        </>
      ),
    },

    {
      eventKey: "lg",
      image: images.lg,
      content: (
        <>
          <SearchField />
          <Row>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
          </Row>
        </>
      ),
    },
    {
      eventKey: "motorala",
      image: images.motorola,
      content: (
        <>
          <SearchField />
          <Row>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
          </Row>
        </>
      ),
    },
    {
      eventKey: "others",
      text: "others",
      content: (
        <>
          <SearchField />
          <Row>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.repair1}
                showTitle={true}
                title="Apple iphone 16 "
                btn1Text="Buy Now"
                btn2Text="Add to Cart"
                showBtnSec2={false}
                showBtnSec={true}
                showBorder={false}
              />
            </Col>
          </Row>
        </>
      ),
    },
  ];
  const devices = [
    "Iphone 16",
    "Iphone 15",
    "Iphone 14",
    "Iphone 13",
    "Iphone 12",
    "Iphone 11",
    "Iphone X",
    "Iphone 8",
    "Iphone 7",
  ];
  const [selectedDevice, setSelectedDevice] = useState(devices[0]);
  return (
    <div>
      <Layout>
        <section className="shop_section">
          <Features />
          <h2 className="heading my-4">
            Shop the best parts four your device!
          </h2>
          <Container>
            <Row>
              <Col lg={3} md={3} sm={12} className="mb-3">
                <DeviceFilterSidebar
                  devices={devices}
                  selectedDevice={selectedDevice}
                  onSelect={setSelectedDevice}
                />
              </Col>
              <Col lg={9} md={9} sm={12} className="mb-3">
                <DynamicTabs tabsData={tabs} />
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </div>
  );
};

export default PhoneParts;
