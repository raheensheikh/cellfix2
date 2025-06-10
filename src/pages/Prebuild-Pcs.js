import Layout from "../components/Layout.jsx";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import images from "../assets/images/index.js";
import React, { useRef, useState, useEffect } from "react";
import GlobalButton from "../components/GlobalButton.jsx";
import Pc from "../components/Pc.jsx";
const PrebuildPcs = () => {
  return (
    <div>
      <Layout>
        <section className="preBuild_section my-5"></section>
        <h2 className="heading my-4">buy pre - build setups</h2>
        <Container>
          <Row>
            <Col lg={4} md={6} sm={12} className="mb-3">
              <Pc
                image={images.pc1}
                title="The Crystal Vision"
                details={[
                  "Ryzen 7 9800X3D Boxpack",
                  "ASUS ROG MAXIMUS X670E HERO DDR5",
                  "Thermalright Mjolnir Vision 360 Black ARGB",
                  "G Skill Trident Z5 NEO 32GB 16x2 6000MHZ Cl30",
                  "1TB Samsung 990 PRO Nvme Gen 4",
                  "SuperFlower Leadex iii 1000W 80+ Gold",
                ]}
                btn2Text="Buy Now"
                btn2Route="/specs"
                price={"$3999.00"}
              />
            </Col>
            <Col lg={4} md={6} sm={12} className="mb-3">
              <Pc
                image={images.pc2}
                title="The Crystal Vision"
                details={[
                  "Ryzen 7 9800X3D Boxpack",
                  "ASUS ROG MAXIMUS X670E HERO DDR5",
                  "Thermalright Mjolnir Vision 360 Black ARGB",
                  "G Skill Trident Z5 NEO 32GB 16x2 6000MHZ Cl30",
                  "1TB Samsung 990 PRO Nvme Gen 4",
                  "SuperFlower Leadex iii 1000W 80+ Gold",
                ]}
                btn2Text="Buy Now"
                btn2Route="/specs"
                price={"$3999.00"}
              />
            </Col>
            <Col lg={4} md={6} sm={12} className="mb-3">
              <Pc
                image={images.pc3}
                title="The Crystal Vision"
                details={[
                  "Ryzen 7 9800X3D Boxpack",
                  "ASUS ROG MAXIMUS X670E HERO DDR5",
                  "Thermalright Mjolnir Vision 360 Black ARGB",
                  "G Skill Trident Z5 NEO 32GB 16x2 6000MHZ Cl30",
                  "1TB Samsung 990 PRO Nvme Gen 4",
                  "SuperFlower Leadex iii 1000W 80+ Gold",
                ]}
                btn2Text="Buy Now"
                btn2Route="/specs"
                price={"$3999.00"}
              />
            </Col>
               <Col lg={4} md={6} sm={12} className="mb-3">
              <Pc
                image={images.pc4}
                title="The Crystal Vision"
                details={[
                  "Ryzen 7 9800X3D Boxpack",
                  "ASUS ROG MAXIMUS X670E HERO DDR5",
                  "Thermalright Mjolnir Vision 360 Black ARGB",
                  "G Skill Trident Z5 NEO 32GB 16x2 6000MHZ Cl30",
                  "1TB Samsung 990 PRO Nvme Gen 4",
                  "SuperFlower Leadex iii 1000W 80+ Gold",
                ]}
                btn2Text="Buy Now"
                btn2Route="/specs"
                price={"$3999.00"}
              />
            </Col>
               <Col lg={4} md={6} sm={12} className="mb-3">
              <Pc
                image={images.pc5}
                title="The Crystal Vision"
                details={[
                  "Ryzen 7 9800X3D Boxpack",
                  "ASUS ROG MAXIMUS X670E HERO DDR5",
                  "Thermalright Mjolnir Vision 360 Black ARGB",
                  "G Skill Trident Z5 NEO 32GB 16x2 6000MHZ Cl30",
                  "1TB Samsung 990 PRO Nvme Gen 4",
                  "SuperFlower Leadex iii 1000W 80+ Gold",
                ]}
                btn2Text="Buy Now"
                btn2Route="/specs"
                price={"$3999.00"}
              />
            </Col>
               <Col lg={4} md={6} sm={12} className="mb-3">
              <Pc
                image={images.pc6}
                title="The Crystal Vision"
                details={[
                  "Ryzen 7 9800X3D Boxpack",
                  "ASUS ROG MAXIMUS X670E HERO DDR5",
                  "Thermalright Mjolnir Vision 360 Black ARGB",
                  "G Skill Trident Z5 NEO 32GB 16x2 6000MHZ Cl30",
                  "1TB Samsung 990 PRO Nvme Gen 4",
                  "SuperFlower Leadex iii 1000W 80+ Gold",
                ]}
                btn2Text="Buy Now"
                btn2Route="/specs"
                price={"$3999.00"}
              />
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
};

export default PrebuildPcs;
