import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
// import { useRouter } from "next/router";
import GlobalButton from "./GlobalButton";
import { Navigate, useNavigate } from "react-router-dom";

const Unlock = ({
  heading = "Phone unlocking",
  description = "Unlock your phone safely and effortlessly with our professional service. We support all models and networks, providing a fast, secure, and hassle-free experience so you can enjoy full device freedom!",
  companyLabel = "Select a company to Get a quote:",
  brands = [],
  imagePath,
  buttonText = "Get Quote",
  buttonRoute = "/get-quote",
}) => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  //   const router = useRouter();

  const handleSelect = (id) => {
    setSelectedBrand(id);
  };

  //   const handleButtonClick = () => {
  //     router.push(buttonRoute);
  //   };
  const navigate = useNavigate();
  return (
    <div className="unlockingBox">
      <Row>
        <Col lg={7} md={7}>
          <h2 className="heading">{heading}</h2>
          <p className="para">{description}</p>
          <p className="companydesc title2">{companyLabel}</p>
          <div className="brand-container d_flex">
            {brands.map(({ id, img, alt }) => {
              const isSelected = selectedBrand === id;
              return (
                <div
                  key={id}
                  className={`brand-item${isSelected ? " selected" : ""}`}
                  onClick={() => handleSelect(id)}
                >
                  <Image src={img} alt={alt} />
                </div>
              );
            })}
          </div>
          <GlobalButton
            text={buttonText}
            border="none"
            onClick={buttonRoute}
          />
        </Col>
        <Col lg={5} md={5}>
          <div className="unlockLeft-img">
            <Image src={imagePath} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Unlock;
