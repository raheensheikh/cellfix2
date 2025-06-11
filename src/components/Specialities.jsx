import React from "react";
import { Col, Row } from "react-bootstrap";
import { Image } from "react-bootstrap";
import GlobalButton from "./GlobalButton.jsx";
import images from "../assets/images/index.js";
import { Navigate, useNavigate } from "react-router-dom";

const Specialities = ({
  showTitle = true,
  headingText = "Cost-Effective  Repair  Solutions for Smartphones, tablets, laptops & gaming consoles.",
  paragraphText = "Home of the 15 minute device repair",
  showBtnSec = true,
  showBtnSec2 = false,
  showheadbtn = false,
  imageSrc,
  btn1Text = "Start a Repair",
  btn2Text = "Buy Product",
  btn3Text = "Buy Now",
  highlightWords = ["Repair", "Solutions"], // new prop
  btn1Click,
  btn2Click,
  btn3Click,
}) => {
  const navigate = useNavigate();

  return (
    <div className="specialitiesSection">
      <Row>
        <Col lg={8} md={8} sm={8}>
          <div className="homeSlides_content">
            {showTitle && <p className="tilte">14+ years of experiance</p>}
            {showheadbtn && <div className="headTitle">Build Your Pc For</div>}

            <h2 className="headingBold">
              {headingText.split(" ").map((word, index) =>
                highlightWords.includes(word.replace(/[.,]/g, "")) ? (
                  <span key={index} className="redText">
                    {word + " "}
                  </span>
                ) : (
                  word + " "
                )
              )}
            </h2>

            <p className="para">{paragraphText}</p>

            {showBtnSec && (
              <div className="btn_sec d_flex">
                <GlobalButton
                  text={btn1Text}
                  color="#fff"
                  textColor="#000"
                  onClick={btn1Click}
                />
                <GlobalButton
                  text={btn2Text}
                  border="1px solid"
                  onClick={btn2Click}
                />
              </div>
            )}

            {showBtnSec2 && (
              <div className="btn_sec btnSec2">
                <GlobalButton
                  text={btn3Text}
                  color="#E0131A"
                  textColor="#fff"
                  onClick={btn3Click}
                />
              </div>
            )}
          </div>
        </Col>

        <Col lg={4} md={4} sm={4}>
          <div className="homeSlides_img">
            {imageSrc && <Image src={imageSrc} alt="Speciality" />}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Specialities;
