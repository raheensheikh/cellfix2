import Layout from "../components/Layout.jsx";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import images from "../assets/images/index.js";
import React, { useRef, useState, useEffect } from "react";
import GlobalButton from "../components/GlobalButton.jsx";
import Locations from "../components/Locations.jsx";
import Services from "../components/Services.jsx";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";
import Modal from "../components/Modal.jsx";
const handleMapClick = () => {
  window.open("https://maps.app.goo.gl/XnwnYmJN4djB7Z7cA", "_blank");
};
const handleCallClick = () => {
  window.location.href = "tel:+18005551234";
};
const NearestStore = () => {
  const [location, setLocation] = useState([]);
  const [isModalContact, setModalContact] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [isStoreModal, setStoreModal] = useState(false); // Per-store modal

  const [zipcode, setZipcode] = React.useState("");
  const [mapUrl, setMapUrl] = React.useState(
    "https://www.google.com/maps/embed?pb=!1m18!..."
  ); // default map url
  const [loading, setLoading] = React.useState(false);

  const nearestLocations = async (zipcode) => {
    if (!zipcode) {
      toast.error("Please enter a zipcode");
      return;
    }

    setLoading(true);
    try {
      const { response, error } = await apiHelper(
        "GET",
        `stores/nearest/${zipcode}`,

        {},
        null
      );

      if (
        response &&
        response.data &&
        response.data.response &&
        response.data.response.data
      ) {
        const store = response.data.response.data;
        setLocation([store]);
        const newMapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyA9-EXAMPLE-KEY-123456&q=${store.latitude},${store.longitude}`;
        setMapUrl(newMapUrl);
      } else {
        toast.error(error || "Failed to fetch nearest store");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

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
        console.log(response.data.response);
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
  const storeContactInfo = {
    1: {
      name: "CellNet",
      address: "Beechnut st Houston tx 77072",
      phone: "2814987243",
    },
    2: {
      name: "Xpert Wireless",
      address: "3818 Linkvalley dr Houston tx 77025",
      phone: "8328209900",
    },
    3: {
      name: "Xpert 4G Wireless",
      address: "6610 Antoine dr Houston tx 77091",
      phone: "7136823333",
    },
    4: {
      name: "Xpert Wireless",
      address: "5823 w Gulfbank rd Houston tx 77088",
      phone: "2812720082",
    },
  };
  useEffect(() => {
    locations();
  }, []);

  const storeImages = [images.map1, images.map2, images.map3, images.map4];
  return (
    <div>
      <Layout>
        <section className="nearestStore_section">
          <Container>
            <div className="locationBg">
              <Row>
                <Col lg={12} md={12} className="mb-3">
                  <h2 className="heading">
                    Locate <span className="redText">Our Store</span> nearest to
                    you
                  </h2>
                  <p className="para">
                    Quickly find the nearest store to your location with ease.
                    Get directions, store details, and operating hours in just a
                    few clicks!
                  </p>
                  <div className="searchField mb-3">
                    <Image src={images.location} alt="location dot" />
                    <input
                      type="search"
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                      placeholder="Enter your zipcode here..."
                    />
                    <GlobalButton
                      text="Search"
                      border="none"
                      onClick={() => nearestLocations(zipcode)}
                    />
                  </div>

                  <GlobalButton
                    text="Call Now To Set An Appointment"
                    border="1px solid #fff"
                    textColor="#fff"
                    color="#000"
                    onClick={() => setModalContact(true)}
                  />
                </Col>
                {/* <Col lg={5} md={5} className="mb-3">
                  <div className="map">
                    <iframe
                      src={mapUrl}
                      width="100%"
                      height="100%"
                      allowFullScreen=""
                      loading="lazy"
                      title="Nearest Store Location"
                    />

                    <GlobalButton
                      text="See Stores On Maps"
                      border="none"
                      textColor="#000"
                      color="#fff"
                    />
                  </div>
                </Col> */}
              </Row>
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
                    onCallClick={() => {
                      setSelectedStoreId(store.id);
                      setStoreModal(true);
                    }}
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
        <Modal
          isOpen={isStoreModal}
          onClose={() => {
            setStoreModal(false);
            setSelectedStoreId(null);
          }}
          showHeader={true}
          heading="Store Contact"
        >
          {selectedStoreId && storeContactInfo[selectedStoreId] ? (
            <div className="contactNumbers">
              <p className="title">{storeContactInfo[selectedStoreId].name}</p>
              <p className="para">
                {storeContactInfo[selectedStoreId].address}
              </p>
              <p
                className="number"
                onClick={() =>
                  handleCallClick(storeContactInfo[selectedStoreId].phone)
                }
              >
                {storeContactInfo[selectedStoreId].phone}
              </p>
            </div>
          ) : (
            <p>No contact info available for this store.</p>
          )}
        </Modal>
      </Layout>
    </div>
  );
};

export default NearestStore;
