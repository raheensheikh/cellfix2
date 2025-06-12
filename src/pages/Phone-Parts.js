import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../components/Layout.jsx";
import Features from "../components/Features.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SearchField from "../components/SearchField.jsx";
import DynamicTabs from "../components/DynamicTabs.jsx";
import DeviceFilterSidebar from "../components/DeviceFilterSidebar.jsx";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";
import images from "../assets/images/index.js";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice.js";
import { useNavigate } from "react-router-dom";

const brandImages = {
  Apple: images.apple,
  Samsung: images.samsung,
  Google: images.google,
  LG: images.lg,
  Motorola: images.motorola,
};

const PhoneParts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [allParts, setAllParts] = useState([]);
  const [allPartsByBrand, setAllPartsByBrand] = useState({});
  const [partsByBrand, setPartsByBrand] = useState({});
  const [loading, setLoading] = useState(false);

  const [allSubSubCategories, setAllSubSubCategories] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");

  const groupByBrand = (products, referenceBrands = {}) => {
    const grouped = {};

    Object.keys(referenceBrands).forEach((brand) => {
      grouped[brand] = { items: [] };
    });

    products.forEach((product) => {
      const brand = product.sub_category?.name || "Others";
      if (!grouped[brand]) grouped[brand] = { items: [] };
      grouped[brand].items.push(product);
    });

    return grouped;
  };

  const getParts = async () => {
    setLoading(true);
    const { response, error } = await apiHelper(
      "GET",
      "products/products-by-category-and-brand?category_id=1"
    );
    setLoading(false);

    if (response) {
      const parts = response.data.response.data;
      setAllParts(parts);

      // Extract unique sub_sub_category names
      const uniqueDevices = [
        ...new Set(
          parts
            .map((item) => item.sub_sub_category?.name)
            .filter((name) => !!name)
        ),
      ];

      setAllSubSubCategories(uniqueDevices);

      if (!selectedDevice && uniqueDevices.length) {
        setSelectedDevice(uniqueDevices[0]);
      }
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    getParts();
  }, []);

  useEffect(() => {
    if (!selectedDevice) return;

    const filtered = allParts.filter(
      (product) => product.sub_sub_category?.name === selectedDevice
    );

    const grouped = groupByBrand(filtered, brandImages);
    setAllPartsByBrand(grouped);
    setPartsByBrand(grouped);
  }, [selectedDevice, allParts]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setPartsByBrand(allPartsByBrand);
      return;
    }

    setLoading(true);
    const { response, error } = await apiHelper(
      "GET",
      `products/search?subcategory_id=1&search=${searchTerm.trim()}`
    );
    setLoading(false);

    if (response) {
      const searched = response.data.response.data.filter(
        (item) => item.sub_sub_category?.name === selectedDevice
      );
      const grouped = groupByBrand(searched, allPartsByBrand);
      setPartsByBrand(grouped);
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch();
    }, 400);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleAddToCart = async (product) => {
    dispatch(addToCart(product));
    const body = { product_id: product?.id };
    const { response, error } = await apiHelper("POST", "cart/add", {}, body);
    if (!response) toast.error(error);
  };

  const tabs = Object.entries(partsByBrand).map(([brand, data]) => ({
    eventKey: brand.toLowerCase().replace(/\s+/g, "-"),
    image: brandImages[brand] || "https://via.placeholder.com/50",
    content: (
      <>
        <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Row>
          {data.items.length === 0 ? (
            <Col>
              <p className="text-muted">No parts found.</p>
            </Col>
          ) : (
            data.items.map((item) => (
              <Col key={item.id} lg={4} md={4} sm={6} xs={6}>
                <ProductCard
                  image={
                    item.images?.[0]?.url ||
                    images.parts2 ||
                    "https://via.placeholder.com/300x300?text=No+Image"
                  }
                  showTitle={true}
                  title={item.title}
                  btn1Text="Buy Now"
                  btn2Text="Add to Cart"
                  showBtnSec2={false}
                  showBtnSec={true}
                  showBorder={false}
                  btn2Click={() => handleAddToCart(item)}
                  btn1Click={() => navigate("/checkout")}
                  onClick={() => navigate(`/details/${item.id}`)}
                />
              </Col>
            ))
          )}
        </Row>
      </>
    ),
  }));

  return (
    <Layout>
      <section className="shop_section">
        <Features />
        <h2 className="heading my-4">Shop the best parts for your device!</h2>
        <Container>
          <Row>
            <Col lg={3} md={3} sm={12} className="mb-3">
              <DeviceFilterSidebar
                devices={allSubSubCategories}
                selectedDevice={selectedDevice}
                onSelect={setSelectedDevice}
              />
            </Col>
            <Col lg={9} md={9} sm={12} className="mb-3">
              {loading ? (
                <div className="text-center py-5">Loading parts...</div>
              ) : (
                <DynamicTabs tabsData={tabs} />
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default PhoneParts;
