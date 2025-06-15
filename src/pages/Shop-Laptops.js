import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../components/Layout.jsx";
import Features from "../components/Features.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SearchField from "../components/SearchField.jsx";
import DynamicTabs from "../components/DynamicTabs.jsx";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";
import images from "../assets/images/index.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice.js";

const brandImages = {
  Apple: images.apple,
  Samsung: images.samsung,
  Google: images.google,
  LG: images.lg,
  Motorola: images.motorola,
};

const ShopLaptop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPages, setCurrentPages] = useState({});
  const pageSize = 12;

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  const [allProductsByBrand, setAllProductsByBrand] = useState({});
  const [filteredProductsByBrand, setFilteredProductsByBrand] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeBrand, setActiveBrand] = useState("");
  const [brandToSubIdMap, setBrandToSubIdMap] = useState({});

  const getProducts = async () => {
    setLoading(true);
    const { response, error } = await apiHelper(
      "GET",
      "products/products-by-category-and-brand?category_id=4"
    );
    setLoading(false);
    if (response) {
      const products = response.data.response.data;
      const grouped = {};
      const map = {}
      products.forEach((product) => {
        const brand = product.sub_category?.name || "Others";
        const subId = product.sub_category?.id;
        if (!grouped[brand]) grouped[brand] = { items: [] };
        grouped[brand].items.push(product);

        if (brand && subId && !map[brand]) {
          map[brand] = subId;
        }
      });
      setAllProductsByBrand(grouped);
      setFilteredProductsByBrand(grouped);
      setBrandToSubIdMap(map);

      const firstBrand = Object.keys(grouped)[0];
      if (firstBrand) setActiveBrand(firstBrand);
    } else {
      toast.error(error);
    }
  };

  const searchProducts = async (query) => {
    if (!query.trim()) {
      setFilteredProductsByBrand(allProductsByBrand);
      return;
    }

    const subcategoryId = brandToSubIdMap[activeBrand];
    if (!subcategoryId) {
      toast.warn("No subcategory found for this brand.");
      return;
    }

    const { response, error } = await apiHelper(
      "GET",
      `products/search?subcategory_id=${subcategoryId}&search=${query}`
    );

    if (response) {
      const products = response.data.response.data;
      const grouped = {};
      products.forEach((product) => {
        const brand = product.sub_category?.name || "Others";
        if (!grouped[brand]) grouped[brand] = { items: [] };
        grouped[brand].items.push(product);
      });
      setFilteredProductsByBrand(grouped);
    } else {
      toast.error(error);
    }
  };


  useEffect(() => {
    getProducts();
  }, []);


  const handleAddToCart = async (product) => {
    dispatch(addToCart(product));
    const body = {
      product_id: product?.id,
    };
    const { response, error } = await apiHelper("POST", "cart/add", {}, body);
    if (response) {
      console.log(response.data.data);
    } else {
      toast.error(error);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      searchProducts(searchTerm);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const tabs = Object.keys(allProductsByBrand).map((brand) => {
    const data = filteredProductsByBrand[brand] || { items: [] };
    const currentPage = currentPages[brand] || 1;
    const totalPages = Math.ceil(data.items.length / pageSize);
    const paginatedItems = paginate(data.items, currentPage, pageSize);

    return {
      eventKey: brand.toLowerCase().replace(/\s+/g, "-"),
      image: brandImages[brand.split(" ")[0]] || "https://via.placeholder.com/50",
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
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXxZR0_1ISIJx_T4oB5-5OJVSNgSMFLe8eCw&s"
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
                    showPrice={true}
                    price={product.price}
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
                    className={`page-item ${currentPage === i + 1 ? "active" : ""
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
      <section className="shop_section my-5"></section>
      <Features />
      <h2 className="heading">
        Shop the best products from your favorite brands!
      </h2>
      <Container>{!loading && <DynamicTabs tabsData={tabs}
        onTabChange={(key) => {
          const selectedBrand = Object.keys(filteredProductsByBrand).find(
            (brand) => brand.toLowerCase().replace(/\s+/g, "-") === key
          );
          if (selectedBrand) setActiveBrand(selectedBrand);
        }}
      />}</Container>
    </Layout>
  );
};

export default ShopLaptop;
