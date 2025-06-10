import Layout from "../components/Layout.jsx";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import images from "../assets/images/index.js";
import React, { useRef, useState, useEffect } from "react";
import GlobalButton from "../components/GlobalButton.jsx";
import Locations from "../components/Locations.jsx";

const TermsCondition = () => {
  return (
    <div>
      <Layout>
        <section className="about_section">
          <Container>
            <h2 className="heading">Terms And Conditions</h2>
            <p className="para text-center">
              Welcome to CellFix4U! Your privacy is very important to us. This
              Privacy Policy explains how we collect, use, disclose, and protect
              your personal information when you use our website and services.By
              using our website or any of our services, you agree to the terms
              of this Privacy Policy.
            </p>
            <Row>
              <Col lg={6} md={6} sm={6}>
                <p className="title2">Information We Collect</p>
                <p className="para">Name</p>
                <p className="para">Phone Number</p>
                <p className="para">Email Address </p>
                <p className="para">Billing and Shipping Address</p>
                <p className="para">Payment Details</p>
              </Col>
              <Col lg={6} md={6} sm={6}>
                <p className="title2">Device Information</p>
                <p className="para">IP address</p>
                <p className="para">Browser Type And Version</p>
                <p className="para">Operating System</p>
                <p className="para">Device Type</p>
              </Col>

              <Col lg={6} md={6} sm={6}>
                <p className="title2">How We Use Your Information</p>
                <p className="para">Provide Repair And Buying Services</p>
                <p className="para">Process Orders And Payments</p>
                <p className="para">
                  Communicate Order Status Or Service Updates
                </p>
                <p className="para">Improve Our Website And Services</p>
                <p className="para">
                  Respond To Inquiries Or Customer Service Requests
                </p>
                <p className="para">Comply With Legal Obligations</p>
              </Col>
              <Col lg={6} md={6} sm={6}>
                <p className="title2">Service-Related Information</p>
                <p className="para">
                  Device Details For Repair (Brand, Model, Issues rported)
                </p>
                <p className="para">Purchase or Sale History</p>
                <p className="para">
                  Communication History With Our Support Team
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </div>
  );
};

export default TermsCondition;
