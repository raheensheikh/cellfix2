import Layout from "../components/Layout.jsx";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import images from "../assets/images/index.js";
import LabeledInput from "../components/LabeledInput.jsx";
import React, { useRef, useState, useEffect } from "react";
import GlobalButton from "../components/GlobalButton.jsx";
const dotPositions = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
];

const OnlineRepair = () => {
  const containerRef = useRef(null);
  const [pattern, setPattern] = useState([]);
  const [active, setActive] = useState(false);
  const [positions, setPositions] = useState([]);

  const getDotCenter = (index) => {
    const container = containerRef.current;
    const dot = container.children[index];
    const rect = dot.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - parentRect.left,
      y: rect.top + rect.height / 2 - parentRect.top,
    };
  };

  const startDrawing = () => {
    setActive(true);
    setPattern([]);
    setPositions([]);
  };

  const stopDrawing = () => {
    setActive(false);
    console.log("Pattern Indexes:", pattern);
  };

  const handleDotEnter = (index) => {
    if (active && !pattern.includes(index)) {
      const center = getDotCenter(index);
      setPattern((prev) => [...prev, index]);
      setPositions((prev) => [...prev, center]);
    }
  };

  return (
    <div>
      <Layout>
        <section className="onlineRepair_section">
          <Container>
            <Row>
              <Col lg={4} md={6} sm={6} className="border-right">
                <h2 className="heading">Personal Information</h2>
                <LabeledInput
                  label="Full Name"
                  placeholder="Enter your Full Name"
                  className="inputfield"
                />
                <LabeledInput
                  label="Email Address"
                  placeholder="Enter your Email"
                  className="inputfield"
                />
                <LabeledInput
                  label="Contact Number"
                  placeholder="Enter your Contact Number"
                  className="inputfield"
                />
                <LabeledInput
                  label="Postal Code"
                  placeholder="Enter your Postal Code"
                  className="inputfield"
                />
                <LabeledInput
                  label="Address"
                  placeholder="Enter your Address"
                  className="inputfield"
                />
              </Col>
              <Col lg={4} md={6} sm={6} className="border-right">
                <h2 className="heading">Device Information</h2>
                <LabeledInput
                  label="Device Name"
                  placeholder=" e:g   phone, ipad, windows, console, watch    "
                  className="inputfield"
                />
                <LabeledInput
                  label="Brand Name"
                  placeholder="Device Brand "
                  className="inputfield"
                />
                <LabeledInput
                  label="Model"
                  placeholder="Model "
                  className="inputfield"
                />
                <LabeledInput
                  label="IMEI"
                  placeholder="IMEI Id"
                  className="inputfield"
                />
                <LabeledInput
                  label="Describe Your Issue Here"
                  placeholder="Decribe your issues here..."
                  className="inputfield"
                />
              </Col>
              <Col lg={4} md={6} sm={6}>
                <h2 className="heading">About Device</h2>

                <LabeledInput
                  label="Enter Your Device’s Passcode"
                  placeholder="******"
                  className="inputfield"
                />
                <p className="para text-center">Or</p>
                <LabeledInput
                  label="Enter Your Device’s PinCode"
                  placeholder="******"
                  className="inputfield"
                />
                <p className="para text-center">Or</p>
                <div
                  className="pattern-container"
                  ref={containerRef}
                  onMouseDown={startDrawing}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                >
                  <svg className="pattern-lines">
                    {positions.map((pos, i) => {
                      if (i === 0) return null;
                      const prev = positions[i - 1];
                      return (
                        <line
                          key={i}
                          x1={prev.x}
                          y1={prev.y}
                          x2={pos.x}
                          y2={pos.y}
                          stroke="#4f46e5"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      );
                    })}
                  </svg>
                  {dotPositions.map((dot, i) => (
                    <div
                      key={i}
                      className={`dot ${pattern.includes(i) ? "active" : ""}`}
                      style={{
                        left: `${dot.x * 100}px`,
                        top: `${dot.y * 100}px`,
                      }}
                      onMouseEnter={() => handleDotEnter(i)}
                    />
                  ))}
                </div>
              </Col>
            </Row>
            <GlobalButton text="Confirm" border="none" />
            <p className="para text-center">
            Our representative will reach out to you under 24 hours
            </p>
          </Container>
        </section>
      </Layout>
    </div>
  );
};

export default OnlineRepair;
