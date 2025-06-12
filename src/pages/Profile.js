import Layout from "../components/Layout.jsx";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import images from "../assets/images/index.js";
import React, { useRef, useState, useEffect } from "react";
import GlobalButton from "../components/GlobalButton.jsx";
import Locations from "../components/Locations.jsx";

const Profile = () => {
  return (
    <div>
      <Layout>
        <section className="profile_section">
          <Container>
            <h2 className="heading">Profile</h2>
            <p className="para text-center">
              This is the user profile page. Here you can view and edit your
              profile information.
            </p>
          </Container>
        </section>
      </Layout>
    </div>
  );
};

export default Profile;

            