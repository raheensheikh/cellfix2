import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../components/Layout.jsx";
import SearchField from "../components/SearchField.jsx";
import ProductCard from "../components/ProductCard.jsx";
import DynamicTabs from "../components/DynamicTabs.jsx";
import DeviceFilterSidebar from "../components/DeviceFilterSidebar.jsx";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice.js";
import { useNavigate } from "react-router-dom";
import images from "../assets/images/index.js";

const CustomizePcs = () => {
  const brandImages = {
    Msi: images.msi || images.pcbuild1,
    Gigabyte: images.gigabyte || images.pcbuild3,
    Asus: images.asus || images.pcbuild2,
    Intel: images.intel || images.pcbuild4,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPages, setCurrentPages] = useState({});
  const pageSize = 12;

  const paginate = (items, page, size) => {
    const start = (page - 1) * size;
    return items.slice(start, start + size);
  };

  const [brands, setBrands] = useState([]);
  const [selectedBrandIndex, setSelectedBrandIndex] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getProducts = async () => {
    const { response, error } = await apiHelper(
      "GET",
      "products/custom-pc-categories"
    );

    if (response) {
      const data = response.data.response.data;
      setBrands(data);
      if (data.length > 0 && data[0].sub_categories.length > 0) {
        setSelectedDevice(data[0].sub_categories[0].name);
      }
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleTabSelect = (index) => {
    setSelectedBrandIndex(index);
    const selected = brands[index];
    if (selected?.sub_categories?.length > 0) {
      setSelectedDevice(selected.sub_categories[0].name);
    } else {
      setSelectedDevice("");
    }
    setSearchTerm("");

    setCurrentPages((prev) => ({
      ...prev,
      [brands[index].name]: 1,
    }));
  };

  const handleAddToCart = async (product) => {
    dispatch(addToCart(product));
    const body = { product_id: product?.id };
    const { response, error } = await apiHelper("POST", "cart/add", {}, body);
    if (!response) toast.error(error);
  };

  const filteredProducts = (brand) => {
    let items = brand?.sub_categories?.flatMap((sub) => sub.products || []);
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      items = items.filter((item) =>
        item?.title?.toLowerCase().includes(search)
      );
    }
    return items || [];
  };

  const tabsData = brands.map((brand, index) => {
    const brandProducts = filteredProducts(brand);
    const currentPage = currentPages[brand.name] || 1;
    const totalPages = Math.ceil(brandProducts.length / pageSize);
    const paginatedItems = paginate(brandProducts, currentPage, pageSize);

    return {
      eventKey: brand.name,
      image: brandImages[brand.name] || images.pcbuild4,
      content: (
        <>
          <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Row>
            {paginatedItems.length === 0 ? (
              <Col>
                <p className="text-muted">No products found.</p>
              </Col>
            ) : (
              paginatedItems.map((product) => (
                <Col key={product.id} lg={4} md={4} sm={6} xs={6}>
                  <ProductCard
                    image={
                      product.images?.[0]?.url ||
                      "https://via.placeholder.com/300x300?text=No+Image"
                    }
                    showTitle={true}
                    title={product.title}
                    btn1Text="Buy Now"
                    btn2Text="Add to Cart"
                    showBtnSec2={false}
                    showBtnSec={true}
                    showBorder={false}
                    btn2Click={() => handleAddToCart(product)}
                    btn1Click={() => navigate("/checkout")}
                    onClick={() => navigate(`/details/${product.id}`)}
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
                          [brand.name]: i + 1,
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

  const selectedBrand = brands[selectedBrandIndex];
  const devices = selectedBrand?.sub_categories?.map((sub) => sub.name) || [];

  return (
    <Layout>
      <section className="shop_section">
        <Container>
          <h2 className="heading mb-4">Build your custom PC</h2>
          <Row>
            <Col lg={3} md={3} sm={12} className="mb-3">
              <DeviceFilterSidebar
                devices={devices}
                selectedDevice={selectedDevice}
                onSelect={setSelectedDevice}
              />
            </Col>
            <Col lg={9} md={9} sm={12}>
              <DynamicTabs
                tabsData={tabsData}
                defaultActiveKey={brands[selectedBrandIndex]?.name}
                onTabChange={(key) => {
                  const index = brands.findIndex((b) => b.name === key);
                  handleTabSelect(index);
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default CustomizePcs;
