import Layout from "../components/Layout.jsx";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import images from "../assets/images/index.js";
import React, { useRef, useState, useEffect } from "react";
import GlobalButton from "../components/GlobalButton.jsx";
import Locations from "../components/Locations.jsx";

const handleMapClick = () => {
  window.open("https://maps.app.goo.gl/XnwnYmJN4djB7Z7cA", "_blank");
};
const handleCallClick = () => {
  window.location.href = "tel:+18005551234";
};
const AboutUs = () => {
  return (
    <div>
      <Layout>
        <section className="about_section">
          <Container>
            <h2 className="heading">About Us</h2>
            <p className="para text-center">
              CellNet has been proudly serving the Houston community since 2010.
              With over a decade of experience and four convenient locations
              across Houston, we’re your trusted source for fast, affordable,
              and reliable phone and device repairs. From cracked screens and
              battery replacements to water damage and software issues, our
              certified technicians handle it all — with high-quality parts and
              service backed by warranty. We repair all major brands, including
              Apple, Samsung, Google, LG, and more. At CellNet, customer
              satisfaction is our top priority. Whether you're visiting us for a
              quick fix or a complex repair, you’ll receive honest service,
              expert care, and a quick turnaround — usually the same day.
              Serving Houston since 2010 — now with four locations to serve you
              better. Stop by and see why CellNet is Houston’s go-to phone
              repair shop. Walk-ins welcome!
            </p>
          </Container>
        </section>
      </Layout>
    </div>
  );
};

export default AboutUs;
