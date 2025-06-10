import Layout from "../components/Layout.jsx";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import images from "../assets/images/index.js";
import React, { useRef, useState, useEffect } from "react";
import GlobalButton from "../components/GlobalButton.jsx";
import Locations from "../components/Locations.jsx";
import Modal from "../components/Modal.jsx";
import Services from "../components/Services.jsx";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [isModalContact, setModalContact] = useState(false);
  const [location, setLocation] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleMapClick = (link) => {
    window.open(link, "_blank");
  };

  const handleCallClick = (phone) => {
    if (phone && phone !== "N/A") {
      window.location.href = `tel:${phone}`;
    } else {
      toast.info("Phone number not available");
    }
  };

  const locations = async () => {
    setLoading(true);
    try {
      const { response, error } = await apiHelper(
        "GET",
        "stores/locations",
        {},
        null
      );
      if (response) {
        console.log(response.data.response); // For debugging
        setLocation(response.data.response.data);
      } else {
        toast.error(error || "Failed to fetch store locations");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    locations();
  }, []);

  const storeImages = [images.map1, images.map2, images.map3, images.map4];
  return (
    <div>
      <Layout>
        <section className="contact_section">
          <Container>
            <h2 className="heading">Contact Us</h2>
            <p className="para text-center">
              Have questions or need a repair? Contact us today! We specialize
              in repairing mobiles, laptops, iPads, consoles, smartwatches, and
              phone parts. Our expert team ensures fast, reliable service to get
              your devices back in perfect condition. Reach out for assistance!
            </p>
            <div className="btn_sec d_flex">
              <GlobalButton
                text="Call Us"
                color="#fff"
                textColor="#000"
                border="1px solid #000"
                onClick={() => setModalContact(true)}
              />
              <GlobalButton
                text="Send an Email"
                border="none"
                onClick={() => {
                  window.location.href =
                    "mailto:Cellfix4uteam@gmail.com?subject=Support%20Request&body=Hello%20Cellfix4u%20Team%2C%0AI%20need%20help%20with...";
                }}
              />
            </div>
          </Container>
        </section>
        <section className="locationSection m-3">
          <Container>
            <h1 className="heading text-start">Find our stores in houston</h1>
            <div className="d_flex allStores">
              {location.length > 0 ? (
                location.map((store, index) => (
                  <Locations
                    key={store.id}
                    image={storeImages[index % storeImages.length]}
                    name={store.name}
                    address={`${store.address} Houston TX ${store.zipcode}`}
                    onMapClick={() => handleMapClick(store.google_maps_link)}
                    onCallClick={() => setModalContact(true)} 
                  />
                ))
              ) : loading ? (
                <p>Loading...</p>
              ) : (
                <p>No stores found.</p>
              )}
            </div>
          </Container>
        </section>
        <Modal
          isOpen={isModalContact}
          onClose={() => setModalContact(false)}
          showHeader={true}
          heading="Contact Us"
        >
          <div className="contactNumbers">
            <p className="title">CellFix</p>
            <p className="para">Beechnut st Houston tx 77072</p>
            <p className="number">2814987243</p>
          </div>
          <div className="contactNumbers">
            <p className="title">Xpert Wireless</p>
            <p className="para">3818 Linkvalley dr Houston tx 77025</p>
            <p className="number">8328209900</p>
          </div>
          <div className="contactNumbers">
            <p className="title">Xpert 4G Wireless</p>
            <p className="para">6610 Antoine dr Houston tx 77091</p>
            <p className="number">7136823333</p>
          </div>
          <div className="contactNumbers">
            <p className="title">Xpert Wireless</p>
            <p className="para">5823 w Gulfbank rd Houston tx 77088</p>
            <p className="number">2812720082</p>
          </div>
        </Modal>
      </Layout>
    </div>
  );
};

export default ContactUs;
