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
const ShopLaptop = () => {
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
      eventKey: "google",
      image: images.google,
      content: (
        <>
          <SearchField />
          <Row>
            <Col lg={4} md={4} sm={6} xs={6}>
              <ProductCard
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
                image={images.laptop1}
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
  return (
    <div>
      <Layout>
        <section className="shop_section my-5"></section>
        <Features />
        <h2 className="heading">
          Shop the best products from your favorite brands!
        </h2>
        <Container>
          <DynamicTabs tabsData={tabs} />
        </Container>
      </Layout>
    </div>
  );
};

export default ShopLaptop;
