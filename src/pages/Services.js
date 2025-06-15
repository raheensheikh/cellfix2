import Layout from "../components/Layout.jsx";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import images from "../assets/images/index.js";
import React, { useRef, useState, useEffect } from "react";
import GlobalButton from "../components/GlobalButton.jsx";
import { useNavigate } from "react-router-dom";
import Unlock from "../components/Unlock.jsx";

const Services = () => {
  const navigate = useNavigate();
  const brands = [
    { id: "company1", img: images.company1, alt: "Brand Logo" },
    { id: "company2", img: images.company2, alt: "Brand Logo" },
    { id: "company3", img: images.company3, alt: "Brand Logo" },
    { id: "company4", img: images.company4, alt: "Brand Logo" },
    { id: "company5", img: images.company5, alt: "Brand Logo" },
    { id: "company6", img: images.company6, alt: "Brand Logo" },
    { id: "company7", img: images.company7, alt: "Brand Logo" },
    { id: "company8", img: images.company8, alt: "Brand Logo" },
    { id: "company9", img: images.company9, alt: "Brand Logo" },
    { id: "company10", img: images.company10, alt: "Brand Logo" },
    { id: "company11", img: images.company11, alt: "Brand Logo" },
    { id: "company12", img: images.company12, alt: "Brand Logo" },
  ];
  const brands3 = [
    { id: "company1", img: images.company1, alt: "Brand Logo" },
    { id: "company2", img: images.company2, alt: "Brand Logo" },
    { id: "company3", img: images.company3, alt: "Brand Logo" },
    { id: "company4", img: images.company4, alt: "Brand Logo" },
    { id: "company5", img: images.company5, alt: "Brand Logo" },
    { id: "company6", img: images.company6, alt: "Brand Logo" },
    { id: "company7", img: images.company7, alt: "Brand Logo" },
    { id: "company8", img: images.company8, alt: "Brand Logo" },
    { id: "company9", img: images.company9, alt: "Brand Logo" },
    { id: "company10", img: images.company10, alt: "Brand Logo" },
    { id: "company11", img: images.company11, alt: "Brand Logo" },
    { id: "company12", img: images.company12, alt: "Brand Logo" },
  ];
  const brands2 = [
    { id: "apple", img: images.apple, alt: "Apple Logo" },
    // { id: "google", img: images.google, alt: "Google Logo" },
    { id: "samsung", img: images.samsung, alt: "Samsung Logo" },
    { id: "oneplus", img: images.oneplus, alt: "OnePlus Logo" },
    { id: "motorola", img: images.motorola, alt: "Motorola Logo" },
  ];
  return (
    <div>
      <Layout>
        <section className="services_section">
          <Container>
            <div className="services_banner">
              <h2 className="heading">Services</h2>
            </div>

            <Unlock
              heading="Phone Unlock"
              description="Unlock your phone safely and effortlessly with our professional service. We support all models and networks, providing a fast, secure, and hassle-free experience so you can enjoy full device freedom!"
              companyLabel="Select a company to Get a quote:"
              brands={brands}
              imagePath={images.unlock1}
              buttonText="Get Quote"
              buttonRoute={() => navigate("/nearest-store")}
            />
            <Unlock
              heading="Google Lock Removal"
              description="Remove FRP lock quickly and securely with our professional service. Get hassle-free access to your device and enjoy a smooth unlocking experience!"
              companyLabel="Select a company to Get a quote:"
              brands={brands2}
              imagePath={images.unlock2}
              buttonText="Get Quote"
              buttonRoute={() => navigate("/nearest-store")}
            />
            <Unlock
              heading="Bill Payments"
              description="Pay your bills quickly and securely with our hassle-free service. We support multiple providers, ensuring a smooth and convenient payment experience!"
              companyLabel="Select a company to Get a quote:"
              brands={brands3}
              imagePath={images.unlock3}
              buttonText="Get Quote"
              buttonRoute={() => navigate("/nearest-store")}
            />
          </Container>
        </section>
      </Layout>
    </div>
  );
};

export default Services;
