import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import GlobalButton from "./GlobalButton";

const Services = ({
  image,
  heading,
  title,
  description,
  buttonText,
  reverseRow,
  btnClick,
  showBtn = true,
}) => {
  return (
    <Container>
      <div className="servicesSection">
        <Row className={reverseRow ? "flex-row-reverse" : ""}>
          <Col lg={6} md={6} sm={5}>
            <Image src={image} alt="Service Image" className="serviceImage" />
          </Col>
          <Col lg={6} md={6} sm={7}>
            <div className="servicesData">
              <h2 className="headingBold">{heading}</h2>
              <p className="title">{title}</p>
              <p className="para">{description}</p>

              {showBtn && (
                <GlobalButton
                  text={buttonText}
                  color="#000"
                  textColor="#fff"
                  onClick={btnClick}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Services;
