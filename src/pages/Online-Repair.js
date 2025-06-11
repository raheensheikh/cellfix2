import Layout from "../components/Layout.jsx";
import { Col, Container, Row } from "react-bootstrap";
import LabeledInput from "../components/LabeledInput.jsx";
import React, { useState } from "react";
import GlobalButton from "../components/GlobalButton.jsx";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";
const OnlineRepair = () => {
  // Personal Info
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  // Device Info
  const [device_type, setDeviceType] = useState("");
  const [brand, setBrand] = useState("");
  const [model_info, setModelInfo] = useState("");
  const [imei, setImei] = useState("");
  const [problem, setProblem] = useState("");
  // Security
  const [passcode, setPasscode] = useState("");
  const [pincode, setPincode] = useState("");
  // Pattern Image
  const [patternImage, setPatternImage] = useState(null);
  const [patternImagePreview, setPatternImagePreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPatternImage(file);
      setPatternImagePreview(URL.createObjectURL(file));
    }
  };
  const handleCancelImage = () => {
    setPatternImage(null);
    setPatternImagePreview(null);
  };
  const onlineRepair = async (e) => {
    e.preventDefault();
    if (!patternImage) {
      toast.error("Please upload a pattern image.");
      return;
    }
    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("postal_code", postal_code);
    formData.append("address", address);
    formData.append("device_type", device_type);
    formData.append("brand", brand);
    formData.append("model_info", model_info);
    formData.append("imei", imei);
    formData.append("problem", problem);
    formData.append("passcode", passcode);
    formData.append("pincode", pincode);
    formData.append("pattern_image", patternImage);
    const { response, error } = await apiHelper(
      "POST",
      "repair/mail-in-repair",
      {},
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        skipAuth: true,
      }
    );
    if (response) {
      toast.success(response.data.message || "Repair email sent.");
    } else {
      toast.error(error || "Something went wrong. Please try again.");
    }
  };
  return (
    <div>
      <Layout>
        <section className="onlineRepair_section">
          <Container>
            <form onSubmit={onlineRepair} encType="multipart/form-data">
              <Row>
                <Col lg={4} md={6} sm={6} className="border-right">
                  <h2 className="heading">Personal Information</h2>
                  <LabeledInput
                    label="Full Name"
                    placeholder="Enter your Full Name"
                    className="inputfield"
                    value={full_name}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <LabeledInput
                    label="Email Address"
                    placeholder="Enter your Email"
                    className="inputfield"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <LabeledInput
                    label="Contact Number"
                    placeholder="Enter your Contact Number"
                    className="inputfield"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                  <LabeledInput
                    label="Postal Code"
                    placeholder="Enter your Postal Code"
                    className="inputfield"
                    value={postal_code}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                  <LabeledInput
                    label="Address"
                    placeholder="Enter your Address"
                    className="inputfield"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Col>
                <Col lg={4} md={6} sm={6} className="border-right">
                  <h2 className="heading">Device Information</h2>
                  <LabeledInput
                    label="Device Name"
                    placeholder="e.g. phone, ipad, windows"
                    className="inputfield"
                    value={device_type}
                    onChange={(e) => setDeviceType(e.target.value)}
                  />
                  <LabeledInput
                    label="Brand Name"
                    placeholder="Device Brand"
                    className="inputfield"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                  <LabeledInput
                    label="Model"
                    placeholder="Model"
                    className="inputfield"
                    value={model_info}
                    onChange={(e) => setModelInfo(e.target.value)}
                  />
                  <LabeledInput
                    label="IMEI"
                    placeholder="IMEI Id"
                    className="inputfield"
                    value={imei}
                    onChange={(e) => setImei(e.target.value)}
                  />
                  <LabeledInput
                    label="Describe Your Issue Here"
                    placeholder="Describe your issues here..."
                    className="inputfield"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                  />
                </Col>
                <Col lg={4} md={6} sm={6}>
                  <h2 className="heading">About Device</h2>
                  <LabeledInput
                    label="Enter Your Device’s Passcode"
                    placeholder="******"
                    className="inputfield"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                  />
                  <p className="para text-center">Or</p>
                  <LabeledInput
                    label="Enter Your Device’s PinCode"
                    placeholder="******"
                    className="inputfield"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <p className="para text-center">Or</p>
                  <div className="image-upload-container">
                    <label className="form-label">Upload Pattern Image</label>
                    {patternImagePreview ? (
                      <div className="image-preview-wrapper">
                        <img
                          src={patternImagePreview}
                          alt="Pattern Preview"
                          className="preview-image"
                        />
                        <button
                          type="button"
                          className="cancel-button"
                          onClick={handleCancelImage}
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageChange}
                      />
                    )}
                  </div>
                </Col>
              </Row>
              <GlobalButton text="Confirm" border="none" type="submit" />
              <p className="para text-center">
                Our representative will reach out to you under 24 hours
              </p>
            </form>
          </Container>
        </section>
      </Layout>
    </div>
  );
};
export default OnlineRepair;
