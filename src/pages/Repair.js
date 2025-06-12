import React, { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import images from "../assets/images/index.js";
import GlobalButton from "../components/GlobalButton.jsx";
import Services from "../components/Services.jsx";
import Locations from "../components/Locations.jsx";
import SearchableSelect from "../components/SearchableSelect.jsx";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";
import Modal from "../components/Modal.jsx";

const Repair = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isModalContact, setModalContact] = useState(false);
  const [selectBrands, setSelectBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedIssues, setSelectedIssues] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [models, setModels] = useState([]);
  const [isStoreModal, setStoreModal] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const repairImages = [
    images.repairImage1,
    images.repairImage2,
    images.repairImage3,
    images.repairImage4,
    images.repairImage5,
  ];

  const storeImages = [images.map1, images.map2, images.map3, images.map4];

  const localBrands = {
    Apple: { img: images.apple, alt: "Apple Logo" },
    Samsung: { img: images.samsung, alt: "Samsung Logo" },
    "Google Pixel": { img: images.google, alt: "Google Logo" },
    Motorola: { img: images.motorola, alt: "Motorola Logo" },
    "One Plus": { img: images.oneplus, alt: "OnePlus Logo" },
  };
  const handleCallClick = (phone) => {
    if (phone && phone !== "N/A") {
      window.location.href = `tel:${phone}`;
    } else {
      toast.info("Phone number not available");
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
    { id: "issue6", issue: "+ Search Other Issues" },
  ];

  useEffect(() => {
    if (id) {
      brandsSelect();
      locations();
      fetchCategoryName();
    }
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % repairImages.length
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (brandId) => {
    const isSame = selectedBrand === brandId;
    const newBrand = isSame ? null : brandId;

    setSelectedBrand(newBrand);
    setSelectedOption(null); // clear model
    setModels([]); // reset models

    if (!isSame && brandId) {
      fetchModels(brandId);
    }
  };

  const handleSelectIssue = (issueId) => {
    setSelectedIssues((prev) => (prev === issueId ? null : issueId));
  };

  const handleMapClick = (link) => {
    window.open(link, "_blank");
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
        const brandData = response.data?.response?.data || [];
        const mapped = brandData.map((brand) => {
          const localMatch = localBrands[brand.brand];
          return {
            ...brand,
            img: localMatch?.img || images.placeholder,
            alt: localMatch?.alt || brand.brand,
          };
        });
        setSelectBrands(mapped);
      } else {
        toast.error(error || "Failed to fetch brands");
      }
    } catch (err) {
      console.error("Error fetching brands:", err);
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryName = async () => {
    try {
      const { response } = await apiHelper(
        "GET",
        "repair/categories",
        {},
        null
      );
      if (response) {
        const categories = response.data.response.data;
        const found = categories.find((cat) => cat.id === Number(id));
        if (found) setCategoryName(found.name);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };
  const fetchModels = async (brandId) => {
    try {
      const { response } = await apiHelper(
        "GET",
        `repair/models/${id}?brand_id=${brandId}`,
        {},
        null
      );
      if (response) {
        const rawModels = response.data.response.data;

        const formattedModels = rawModels.map((model) => ({
          value: model.id,
          label: model.model,
        }));

        setModels(formattedModels);
      }
    } catch (err) {
      console.error("Error fetching models:", err);
      toast.error("Failed to fetch models");
    }
  };
  const onStore = async (brandId) => {
    try {
      const { response } = await apiHelper(
        "POST",
        `repair/repair-on-store/${id}`,
        {
          brand_id: brandId,
          model_id: selectedOption?.value,
          issue_description: selectedIssues,
        },
        null
      );

      if (response) {
        toast.success(response.data?.message || "Repair request submitted!");
        console.log("Submitted data:", response.data?.response?.data);

        navigate("/nearest-store");
      }
    } catch (err) {
      console.error("Error submitting repair request:", err);
      toast.error("Failed to submit repair request.");
    }
  };

  return (
    <Layout>
      <section className="repair-section">
        <Container>
          <Row>
            <Col lg={6} md={6} className="repair_left mb-3">
              <h2 className="heading">
                <span className="redText">
                  {categoryName || "Mobile Device"}
                </span>{" "}
                Repair & Maintenance Services
              </h2>

              <p className="title2">Select your mobile brand:</p>
              <div className="brand-container d_flex">
                {selectBrands.map(({ id, img, alt, brand }) => {
                  const isSelected = selectedBrand === id;
                  return (
                    <div
                      key={id}
                      className={`brand-item${isSelected ? " selected" : ""}`}
                      onClick={() => handleSelect(id)}
                    >
                      <Image
                        src={img}
                        alt={alt || brand}
                        className="brand-logo"
                        fluid
                      />
                      {!img && <p className="brand-name">{brand}</p>}
                    </div>
                  );
                })}
              </div>

              <p className="title2">Select your mobile model:</p>
              <SearchableSelect
                options={models}
                value={selectedOption}
                onChange={setSelectedOption}
                placeholder="Search or select Mobile Model..."
              />

              <p className="title2 mt-2">Select issues of your device:</p>
              <div className="brand-container d_flex">
                {issues.map(({ id, img, alt, issue }) => {
                  const isSelected = selectedIssues === id;
                  return (
                    <div
                      key={id}
                      className={`brand-item issues${
                        isSelected ? " selected" : ""
                      }`}
                      onClick={() => handleSelectIssue(id)}
                    >
                      {img && <Image src={img} alt={alt} />}
                      <p className="issuesText">{issue}</p>
                    </div>
                  );
                })}
              </div>

              <GlobalButton
                text="Confirm"
                border="none"
                onClick={() => {
                  if (!selectedBrand || !selectedOption || !selectedIssues) {
                    toast.error("Please select brand, model and issue.");
                    return;
                  }
                  onStore(selectedBrand);
                }}
              />
            </Col>

            <Col lg={6} md={6} className="repair_right mb-3">
              <Image src={repairImages[currentImageIndex]} alt="Repair" fluid />
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
          showBtn={false}
          reverseRow={false}
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
          showBtn={false}
          reverseRow={true}
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
          showBtn={true}
          reverseRow={false}
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
                  address={`${store.address} ${store.zipcode}`}
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
            <p className="para">{storeContactInfo[selectedStoreId].address}</p>
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
  );
};

export default Repair;
