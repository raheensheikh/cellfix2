import Layout from "../components/Layout.jsx";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import images from "../assets/images/index.js";
import React, { useRef, useState, useEffect } from "react";
import GlobalButton from "../components/GlobalButton.jsx";
import Locations from "../components/Locations.jsx";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();
  const btn2Route = "/checkout";
  const btn3Route = "/checkout";
  const [selectedColor, setSelectedColor] = useState("#cbb5a3");

  const colors = ["#cbb5a3", "#d3ccc2", "#4e4e4e", "#f0eeea"];

  return (
    <div>
      <Layout>
        <section className="details_section">
          <Container>
            <Row>
              <Col lg={5}>
                <div className="detailImage">
                  <Image src={images.repair1} />
                </div>
              </Col>
              <Col lg={7}>
                <h2 className="heading">
                  Apple iPhone 16 Pro Max, US Version, 256GB, Desert Titanium -
                  Unlocked (Renewed)
                </h2>
                <p className="title2">About This Item</p>
                <ul className="itmeDesc">
                  <li>
                    his pre-owned product is not Apple certified, but has been
                    professionally inspected, tested and cleaned by
                    Amazon-qualified suppliers.
                  </li>
                  <li>
                    There will be no visible cosmetic imperfections when held at
                    an arm’s length. There will be no visible cosmetic
                    imperfections when held at an arm’s length.
                  </li>
                  <li>
                    This product will have a battery which exceeds 80% capacity
                    relative to new.‰
                  </li>
                  <li>
                    Accessories will not be original, but will be compatible and
                    fully functional. Product may come in generic Box.
                  </li>
                  <li>
                    This product is eligible for a replacement or refund within
                    90 days of receipt if you are not satisfied.
                  </li>
                </ul>
                <ul className="itemFeatures">
                  <li className="d_flexBetween">
                    <p className="boldTitle">Brand</p>
                    <p className="text">Apple</p>
                  </li>
                  <li className="d_flexBetween">
                    <p className="boldTitle">Operating System</p>
                    <p className="text">Apple</p>
                  </li>
                  <li className="d_flexBetween">
                    <p className="boldTitle">Ram Memory Installed Size </p>
                    <p className="text">8 GB</p>
                  </li>
                  <li className="d_flexBetween">
                    <p className="boldTitle">Memory Storage Capacity</p>
                    <p className="text">256 GB</p>
                  </li>
                  <li className="d_flexBetween">
                    <p className="boldTitle">Screen Size </p>
                    <p className="text">6.9 Inches</p>
                  </li>
                  <li className="d_flexBetween">
                    <p className="boldTitle">Resolution</p>
                    <p className="text">2868 x 1320 pixels</p>
                  </li>
                  <li className="d_flexBetween">
                    <p className="boldTitle">Model Name</p>
                    <p className="text">iPhone 16 Pro Max</p>
                  </li>
                  <li className="d_flexBetween">
                    <p className="boldTitle">Wireless Carrier</p>
                    <p className="text">Unlocked for All Carriers</p>
                  </li>
                  <li className="d_flexBetween">
                    <p className="boldTitle">Cellular Technology </p>
                    <p className="text">5G</p>
                  </li>
                  <li className="d_flexBetween">
                    <p className="boldTitle">Color</p>
                    <p className="text"> Desert Titanium</p>
                  </li>
                </ul>
                <p className="title2 my-2">Pick Your Favorite Color</p>
                <div className="color-options my-3">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className={`color-circle ${
                        selectedColor === color ? "selected" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
                <div className="btn_sec d_flex">
                  <GlobalButton
                    text="Buy Now"
                    border="none"
                    onClick={() => navigate(btn3Route)}
                  />
                  <GlobalButton
                    text="Add To Cart"
                    color="#fff"
                    textColor="#000"
                    border="1px solid #000"
                    onClick={() => navigate(btn2Route)}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </div>
  );
};

export default Details;
