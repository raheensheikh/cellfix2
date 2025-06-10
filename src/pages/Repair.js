import React from "react";
import Layout from "../components/Layout.jsx";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { Col, Container, Image, Row } from "react-bootstrap";
import images from "../assets/images/index.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import Specialities from "../components/Specialities.jsx";
import ProductCard from "../components/ProductCard.jsx";
import GlobalButton from "../components/GlobalButton.jsx";
import Services from "../components/Services.jsx";
import Locations from "../components/Locations.jsx";
import SearchableSelect from "../components/SearchableSelect.jsx";
import { useEffect, useState } from "react";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";
import Modal from "../components/Modal.jsx";
  import { useParams } from "react-router-dom";

// const handleMapClick = () => {
//   window.open("https://maps.app.goo.gl/XnwnYmJN4djB7Z7cA", "_blank");
// };

// const handleCallClick = () => {
//   window.location.href = "tel:+18005551234";
// };

const Repair = () => {
  const navigate = useNavigate();
  const [isModalContact, setModalContact] = useState(false);
  const [selectBrands, setSelectBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const repairImages = [
    images.repairImage1,
    images.repairImage2,
    images.repairImage3,
    images.repairImage4,
    images.repairImage5,
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % repairImages.length
      );
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedIsssues, setSelectedIssues] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [location, setLocation] = useState([]);

  const { id } = useParams();

  const localBrands = {
    Apple: { img: images.apple, alt: "Apple Logo" },
    Samsung: { img: images.samsung, alt: "Samsung Logo" },
    "Google Pixel": { img: images.google, alt: "Google Logo" },
    Motorola: { img: images.motorola, alt: "Motorola Logo" },
    "One Plus": { img: images.oneplus, alt: "OnePlus Logo" },
  };
  const handleSelect = (brandId) => {
    setSelectedBrand((prev) => (prev === brandId ? null : brandId));
  };
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
  const brandsSelect = async () => {
    setLoading(true);
    try {
      const { response, error } = await apiHelper(
        "GET",
        `repair/brands/${id}`,
        {},
        null
      );

      if (response) {
        const mapped = response.data.response.data.map((brand) => ({
          ...brand,
          ...localBrands[brand.brand], 
        }));
        setSelectBrands(mapped);
      } else {
        toast.error(error || "Failed to fetch brands");
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
    brandsSelect();
  }, []);
  // const handleSelect = (id) => {
  //   setSelectedBrandId(id);
  //   // You can make another API call here if needed
  // };
  const storeImages = [images.map1, images.map2, images.map3, images.map4];
  const issues = [
    {
      id: "issue1",
      img: images.issueImg1,
      alt: "Mobile issues",
      issue: "Screen Replacement",
    },
    {
      id: "issue2",
      img: images.issueImg2,
      alt: "Mobile issues",
      issue: "Backglass Replacement",
    },
    {
      id: "issue3",
      img: images.issueImg3,
      alt: "Mobile issues",
      issue: "Camera Replacement",
    },
    {
      id: "issue4",
      img: images.issueImg4,
      alt: "Mobile issues",
      issue: "Battery Replacement",
    },
    {
      id: "issue5",
      img: images.issueImg5,
      alt: "Mobile issues",
      issue: "Charging Port Replacement",
    },
    {
      id: "issue6",
      // img: images.motorola,
      // alt: "Mobile issues",
      issue: "+ Search Other Issues",
    },
  ];
  const handleSelect2 = (issueId) => {
    setSelectedIssues((prev) => (prev === issueId ? null : issueId));
  };
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "mango", label: "Mango" },
  ];

  return (
    <div>
      <Layout>
        <section className="repair-section">
          <Container>
            <Row>
              <Col lg={6} md={6} className="repair_left mb-3">
                <h2 className="heading">
                  <span className="redText">Mobile Device</span> Repair &
                  Maintenance Services
                </h2>
                <p className="title2">Select your mobile brand:</p>
                <div className="brand-container d_flex">
                  {selectBrands.map(({ id, img, alt, brand }) => {
                    const isSelected = selectedBrandId === id;
                    return (
                      <div
                        key={id}
                        className={`brand-item${isSelected ? " selected" : ""}`}
                        onClick={() => handleSelect(id)}
                      >
                        <Image src={img} alt={alt} />
                        {/* <p>{brand}</p> */}
                      </div>
                    );
                  })}
                </div>
                <p className="title2">Select your mobile Model:</p>
                <SearchableSelect
                  options={options}
                  value={selectedOption}
                  onChange={setSelectedOption}
                  placeholder="Search or select Mobile Model..."
                />
                <p className="title2 mt-2">Select issues of your device:</p>
                <div className="brand-container d_flex">
                  {issues.map(({ id, img, alt, issue }) => {
                    const isSelected = selectedIsssues === id;
                    return (
                      <div
                        key={id}
                        className={`brand-item issues${
                          isSelected ? " selected" : ""
                        }`}
                        onClick={() => handleSelect2(id)}
                      >
                        <Image src={img} alt={alt} />
                        <p className="issuesText">{issue}</p>
                      </div>
                    );
                  })}
                </div>
                <GlobalButton
                  text="Confirm"
                  border="none"
                  onClick={() => navigate("/nearest-store")}
                />
              </Col>
              <Col lg={6} md={6} className="repair_right mb-3">
                <Image
                  src={repairImages[currentImageIndex]}
                  alt="Repair"
                  fluid
                />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="services m-3">
          <Services
            image={images.service1}
            heading="Same Day Repairs"
            title="Expert Repair, Fast Service"
            description="With our extensive expertise, we deliver high-quality repairs 
          with impressive speed. Many issues can be fixed on the same day, often while you wait. Understanding 
          the inconvenience of a broken device, we prioritize quick fixes to get you back up and running as soon as possible."
            buttonText="Start a Repair"
            reverseRow={false}
            showBtn={false}
          />
        </section>
        <section className="services m-3">
          <Services
            image={images.service2}
            heading="Authentic Apple ® Parts Now Offered at CellNet"
            description="Cellnet provides iPhone repairs using only genuine Apple parts, 
              diagnostic software, and specialized tools to ensure your device 
              is repaired with precision and safety. Ask our store associates 
              about the availability of authentic Apple parts for your repair 
              needs."
            buttonText="Start iphone repair"
            reverseRow={true}
            showBtn={false}
          />
        </section>
        <section className="services m-3">
          <Services
            image={images.service3}
            heading="Genuine Samsung Parts, Reliable Service"
            description="As an authorized Samsung Service Provider, Cellnet Cell Phone 
              Repair ensures the use of genuine parts for select Samsung 
              repairs. Our certified technicians are committed to restoring 
              your device with OEM parts, advanced tools, and proven 
              techniques, all while delivering fast, dependable service"
            buttonText="Start Samsung repair"
            reverseRow={false}
            showBtn={false}
          />
        </section>
        <section className="locationSection m-3">
          <Container>
            <h1 className="heading text-start">Find our stores in Houston</h1>
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

export default Repair;
