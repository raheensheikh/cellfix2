import React, { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [userId] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState(id);
  const [selectBrands, setSelectBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedIssues, setSelectedIssues] = useState(null);
  const [customIssue, setCustomIssue] = useState("");
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [models, setModels] = useState([]);
  const [isStoreModal, setStoreModal] = useState(false);
  // const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);

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

  
  const issues = [
    {
      id: "Screen Replacement",
      img: images.issueImg1,
      alt: "Mobile issues",
      issue: "Screen Replacement",
    },
    {
      id: "Backglass Replacement",
      img: images.issueImg2,
      alt: "Mobile issues",
      issue: "Backglass Replacement",
    },
    {
      id: "Camera Replacement",
      img: images.issueImg3,
      alt: "Mobile issues",
      issue: "Camera Replacement",
    },
    {
      id: "Battery Replacement",
      img: images.issueImg4,
      alt: "Mobile issues",
      issue: "Battery Replacement",
    },
    {
      id: "Charging Port Replacement",
      img: images.issueImg5,
      alt: "Mobile issues",
      issue: "Charging Port Replacement",
    },
    { id: "Search Other Issues", issue: "Search Other Issues" },
  ];

  useEffect(() => {
    if (id) {
      setSelectedCategory(id);
      brandsSelect();
      getLocations();
      fetchCategoryName();
    }
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % repairImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (brandId) => {
    setSelectedBrand(brandId);
    setSelectedOption(null);
    setSelectedModel(null);
    setModels([]);
    fetchModels(brandId);
  };

  const handleSelectIssue = (issueText) => {
    setSelectedIssues((prev) => (prev === issueText ? null : issueText));
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

  const getLocations = async () => {
    setLoading(true);
    try {
      const { response } = await apiHelper("GET", "stores/locations");
      setLocation(response?.data?.response?.data || []);
    } catch (err) {
      toast.error("Failed to fetch store locations");
    } finally {
      setLoading(false);
    }
  };

  const brandsSelect = async () => {
    setLoading(true);
    try {
      const { response } = await apiHelper("GET", `repair/brands/${id}`);
      const brandData = (response?.data?.response?.data || []).filter(
        (brand) =>
          brand.brand !== "Accessories" &&
          brand.brand !== "Test Brand Phone parts"
      );

      const mapped = brandData.map((brand) => {
        const match = localBrands[brand.brand];
        return {
          ...brand,
          img: match?.img || images.placeholder,
          alt: match?.alt || brand.brand,
        };
      });

      setSelectBrands(mapped);
    } catch (err) {
      toast.error("Failed to fetch brands");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryName = async () => {
    try {
      const { response } = await apiHelper("GET", "repair/categories");
      const categories = response?.data?.response?.data || [];
      const found = categories.find((cat) => cat.id === Number(id));
      if (found) setCategoryName(found.name);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  };

  const fetchModels = async (brandId) => {
    try {
      const { response } = await apiHelper("GET", `repair/models/${brandId}`);
      const rawModels = response?.data?.response?.data || [];
      const formatted = rawModels.map((m) => ({
        value: m.id,
        label: m.model,
      }));
      setModels(formatted);
    } catch (err) {
      toast.error("Failed to fetch models");
    }
  };

  const onStore = async () => {
    if (
      !selectedBrand ||
      !selectedModel ||
      !selectedIssues ||
      (selectedIssues === "Search Other Issues" && !customIssue.trim())
    ) {
      toast.error("Please select brand, model, and issue.");
      return;
    }

    const payload = {
      user_id: userId,
      category_id: selectedCategory,
      sub_category_id: selectedBrand,
      sub_sub_category_id: selectedModel,
      issue_description:
        selectedIssues === "Search Other Issues" ? customIssue : selectedIssues,
    };

    try {
      const { response } = await apiHelper(
        "POST",
        "repair/repair-on-store",
        {},
        payload
      );

      if (response?.status) {
        toast.success("Repair request submitted successfully.");
        navigate("/nearest-store");
      } else {
        toast.error(response?.message || "Something went wrong.");
      }
    } catch (err) {
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
              {models.length > 0 && (
                <SearchableSelect
                  label="Model"
                  options={models}
                  value={selectedModel}
                  onChange={setSelectedModel}
                  placeholder="Select Model"
                />
              )}

              <p className="title2 mt-2">Select issues of your device:</p>
              <div className="brand-container d_flex">
                {issues.map(({ id, img, alt, issue }) => {
                  const isSelected = selectedIssues === issue;
                  return (
                    <div
                      key={id}
                      className={`brand-item issues${
                        isSelected ? " selected" : ""
                      }`}
                      onClick={() => handleSelectIssue(issue)}
                    >
                      {img && <Image src={img} alt={alt} />}
                      <p className="issuesText">{issue}</p>
                    </div>
                  );
                })}
                {selectedIssues === "Search Other Issues" && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Describe your issue..."
                    value={customIssue}
                    onChange={(e) => setCustomIssue(e.target.value)}
                  />
                )}
              </div>

              <GlobalButton text="Confirm" border="none" onClick={onStore} />
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
          buttonText="Start a Repair"
          reverseRow={false}
          showBtn={false}
          btnClick={() => navigate("/repair")}
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
          btnClick={() => navigate("/repair")}
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
            {loading ? (
              <p>Loading...</p>
            ) : location.length > 0 ? (
              location.map((store, index) => (
                <Locations
                  key={store.id}
                  image={storeImages[index % storeImages.length]}
                  name={store.name}
                  address={`${store.address} ${store.zipcode}`}
                  onMapClick={() => handleMapClick(store.google_maps_link)}
                  onCallClick={() => {
                    setSelectedStore(store);
                    setStoreModal(true);
                  }}
                />
              ))
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
          setSelectedStore(null);
        }}
        showHeader={true}
        heading="Store Contact"
      >
        {selectedStore ? (
          <div className="contactNumbers">
            <p className="title">{selectedStore.name}</p>
            <p className="para">
              {selectedStore.address} {selectedStore.zipcode}
            </p>
            <p
              className="number"
              onClick={() => handleCallClick(selectedStore.phone)}
            >
              {selectedStore.phone || "N/A"}
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
