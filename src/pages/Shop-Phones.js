import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../components/Layout.jsx";
import Features from "../components/Features.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SearchField from "../components/SearchField.jsx";
import DynamicTabs from "../components/DynamicTabs.jsx";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";
import images from "../assets/images/index.js";
import { useDispatch } from "react-redux";
import { addToCart, incrementQuantity } from "../redux/slices/cartSlice.js";
import { useNavigate } from "react-router-dom";

const brandImages = {
  Apple: images.apple,
  Samsung: images.samsung,
  Google: images.google,
  LG: images.lg,
  Motorola: images.motorola,
};

const ShopPhones = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [allProductsByBrand, setAllProductsByBrand] = useState({});
  const [productsByBrand, setProductsByBrand] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeBrand, setActiveBrand] = useState("LG");
  const [brandToSubIdMap, setBrandToSubIdMap] = useState({});
  const [currentPages, setCurrentPages] = useState({});
  const pageSize = 12;
  const paginate = (items = [], currentPage = 1, pageSize = pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  const getProducts = async () => {
    setLoading(true);
    const { response, error } = await apiHelper(
      "GET",
      "products/products-by-category-and-brand?category_id=2",
      {},
      null
    );
    setLoading(false);

    if (response) {
      const products = response.data.response.data;
      const grouped = groupByBrand(products);
      console.log('sdffsdf',grouped)
      setAllProductsByBrand(grouped);
      setProductsByBrand(grouped);
      const subcategoryMap = extractSubcategoryMap(products);
      setBrandToSubIdMap(subcategoryMap);
    } else {
      toast.error(error);
    }
  };

  const extractSubcategoryMap = (products) => {
    const map = {};
    products.forEach((product) => {

      const brand = product.sub_category?.name;
      const subId = product.sub_category?.id;
      console.log("opr", brand, subId)
      if (brand && subId && !map[brand]) {
        map[brand] = subId;
      }
    });
    return map;
  };

  // 🔍 Fetch filtered products on search
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setProductsByBrand(allProductsByBrand);
      return;
    }

    const subcategoryId = brandToSubIdMap[activeBrand];
    console.log('subcategoryId', activeBrand)

    const { response, error } = await apiHelper(
      "GET",
      `products/search?subcategory_id=${subcategoryId}&search=${searchTerm.trim()}`,
      {},
      null
    );
    if (response) {
      const searched = response.data.response.data;
      const grouped = groupByBrand(searched, allProductsByBrand);
      setProductsByBrand(grouped);
    } else {
      toast.error(error);
    }
  };

  const groupByBrand = (products, referenceBrands = {}) => {
    const grouped = {};

    Object.keys(referenceBrands).forEach((brand) => {
      grouped[brand] = { items: [] };
    });

    products.forEach((product) => {
      const brand = product.sub_category?.name || "Others";
      if (!grouped[brand]) {
        grouped[brand] = { items: [] };
      }
      grouped[brand].items.push(product);
    });

    return grouped;
  };

  const handleAddToCart = async (product) => {
    dispatch(addToCart(product));
    const body = { product_id: product?.id };
    const { response, error } = await apiHelper("POST", "cart/add", {}, body);
    if (response) {
      dispatch(incrementQuantity())
    } else {
      toast.error(error);
    }
  };

  const handleBuyNow = async (product) => {
    dispatch(addToCart(product));
    const body = { product_id: product?.id };
    const { response, error } = await apiHelper("POST", "cart/add", {}, body);
    if (response) {
      dispatch(incrementQuantity())
      navigate('/checkout')
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch();
    }, 400);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const tabs = Object.entries(productsByBrand).map(([brand, data]) => ({
    eventKey: brand.toLowerCase().replace(/\s+/g, "-"),
    image: brandImages[brand.split(' ')[0]] || "https://via.placeholder.com/50",
    content: (
      <>
        <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={() => console.log(searchTerm)} />
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
                  price={product.price}
                  showBtnSec2={false}
                  showBtnSec={true}
                  showBorder={false}
                  btn2Click={() => handleAddToCart(product)}
                  btn1Click={() => handleBuyNow(product)}
                  onClick={() => navigate(`/details/${product.id}`)}
                  showPrice={true}
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
      <section className="shop_section my-5" />
      <Features />
      <h2 className="heading">
        Shop the best products from your favorite brands!
      </h2>
      <Container>{!loading && <DynamicTabs tabsData={tabs}
        onTabChange={(key) => {
          const brandName = Object.keys(productsByBrand).find(
            brand => brand.toLowerCase().replace(/\s+/g, "-") === key
          );
          setActiveBrand(brandName);
        }}
      />}</Container>
    </Layout>
  );
};

export default ShopPhones;
