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
  Others: "https://via.placeholder.com/50?text=Others",
};

const PhoneParts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPages, setCurrentPages] = useState({});
  const pageSize = 12;
  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [allParts, setAllParts] = useState([]);
  const [allPartsByBrand, setAllPartsByBrand] = useState({});
  const [partsByBrand, setPartsByBrand] = useState({});
  const [loading, setLoading] = useState(false);

  const [allSubSubCategories, setAllSubSubCategories] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [brandToSubIdMap, setBrandToSubIdMap] = useState({});
  const [activeBrand, setActiveBrand] = useState("");

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

      const brandToSubIdMap = {};
      parts.forEach((product) => {
        const brand = product.sub_category?.name || "Others";
        const subId = product.sub_category?.id;
        if (brand && subId && !brandToSubIdMap[brand]) {
          brandToSubIdMap[brand] = subId;
        }
      });
      setBrandToSubIdMap(brandToSubIdMap);

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

    const subcategoryId = brandToSubIdMap[activeBrand];
    if (!subcategoryId) {
      toast.warn("Subcategory not found for selected brand.");
      return;
    }

    const { response, error } = await apiHelper(
      "GET",
      `products/search?subcategory_id=${subcategoryId}&search=${searchTerm.trim()}`
    );

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

  const tabs = Object.entries(partsByBrand).map(([brand, data]) => {
    const currentPage = currentPages[brand] || 1;
    const totalPages = Math.ceil(data.items.length / pageSize);
    const paginatedItems = paginate(data.items, currentPage, pageSize);

    return {
      eventKey: brand.toLowerCase().replace(/\s+/g, "-"),
      image: brandImages[brand] || "https://via.placeholder.com/50",
      content: (
        <>
          <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Row>
            {paginatedItems.length === 0 ? (
              <Col>
                <p className="text-muted">No parts found.</p>
              </Col>
            ) : (
              paginatedItems.map((item) => (
                <Col key={item.id} lg={4} md={4} sm={6} xs={6}>
                  <ProductCard
                    image={item?.images[0]?.image_path || images.smartphone1}
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
                    showPrice={true}
                    price={item.price}
                  />
                </Col>
              ))
            )}
          </Row>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        setCurrentPages((prev) => ({
                          ...prev,
                          [brand]: i + 1,
                        }))
                      }
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ),
    };
  });

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
                <DynamicTabs
                  tabsData={tabs}
                  onTabChange={(key) => {
                    const brand = Object.keys(partsByBrand).find(
                      (b) => b.toLowerCase().replace(/\s+/g, "-") === key
                    );
                    if (brand) {
                      setActiveBrand(brand);
                      setSearchTerm("");
                    }
                  }}
                />
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default PhoneParts;
