import React, { useRef, useState, useEffect } from "react";
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

const ShopWatches = () => {
  const navigate = useNavigate();
  const [allProductsByBrand, setAllProductsByBrand] = useState({});
  const [filteredProductsByBrand, setFilteredProductsByBrand] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getProducts = async () => {
    setLoading(true);
    const { response, error } = await apiHelper(
      "GET",
      "products/products-by-category-and-brand?category_id=3"
    );
    setLoading(false);
    if (response) {
      const products = response.data.response.data;
      const grouped = {};
      products.forEach((product) => {
        const brand = product.sub_category?.name || "Others";
        if (!grouped[brand]) {
          grouped[brand] = { items: [] };
        }
        grouped[brand].items.push(product);
      });
      setAllProductsByBrand(grouped);
      setFilteredProductsByBrand(grouped);
    } else {
      toast.error(error);
    }
  };

  const searchProducts = async (query) => {
    if (!query.trim()) {
      setFilteredProductsByBrand(allProductsByBrand);
      return;
    }

    setLoading(true);
    const { response, error } = await apiHelper(
      "GET",
      `products/search?subcategory_id=12&search=${query}`
    );
    setLoading(false);
    if (response) {
      const products = response.data.response.data;
      const grouped = {};
      products.forEach((product) => {
        const brand = product.sub_category?.name || "Others";
        if (!grouped[brand]) {
          grouped[brand] = { items: [] };
        }
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
    }, 400); // debounce
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const tabs = Object.entries(filteredProductsByBrand).map(([brand, data]) => ({
    eventKey: brand.toLowerCase().replace(/\s+/g, "-"),
    image: brandImages[brand] || "https://via.placeholder.com/50",
    content: (
      <>
        <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Row>
          {data.items.length === 0 ? (
            <Col>
              <p className="text-muted">No products found.</p>
            </Col>
          ) : (
            data.items.map((product) => (
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
                  showPrice={true}
                  price={product.price}
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
      <section className="shop_section my-5"></section>
      <Features />
      <h2 className="heading">
        Shop the best products from your favorite brands!
      </h2>
      <Container>{!loading && <DynamicTabs tabsData={tabs} />}</Container>
    </Layout>
  );
};

export default ShopWatches;
