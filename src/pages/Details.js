import Layout from "../components/Layout.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import GlobalButton from "../components/GlobalButton.jsx";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";
import { addToCart, incrementQuantity } from "../redux/slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Product details:", product);
  }, [product]);

  const getDetails = async () => {
    setLoading(true);
    const { response, error } = await apiHelper(
      "GET",
      `products/details?id=${id}`,
      {},
      null
    );
    setLoading(false);

    if (response) {
      setProduct(response.data.response.data);
      if (response.data.response.data.colors?.length) {
        setSelectedColor(response.data.response.data.colors[0]);
      }
      const productImages = response.data.response.data.images.map((img) => ({
        original: img.image_path,
        thumbnail: img.image_path,
      }));
      setImages(productImages);
    } else if (error === "Product not found") {
    } else {
      toast.error(error);
    }
  };
  const handleAddToCart = async (product) => {
    const body = {
      product_id: product?.id,
      ...(selectedColor && { selected_color_id: selectedColor.id }),
    };
    const { response, error } = await apiHelper("POST", "cart/add", {}, body);
    if (response) {
      console.log(response.data.data);
      dispatch(incrementQuantity());
    } else {
      toast.error(error);
    }
  };

  const handleBuyNow = async (product) => {
    const body = {
      product_id: product?.id,
      ...(selectedColor && { selected_color_id: selectedColor.id }),
    };
    const { response, error } = await apiHelper("POST", "cart/add", {}, body);
    if (response) {
      console.log(response.data.data);
      dispatch(incrementQuantity());
      navigate("/checkout");
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (id) getDetails();
  }, [id]);

  useEffect(() => {
    console.log("seleted color", selectedColor);
  }, [selectedColor]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!product) return <p className="text-center">No product found.</p>;

  const {
    title,
    long_title,
    description_points,
    detailed_specifications,
    colors,
    price,
    stock,
  } = product;
  return (
    <Layout>
      <section className="details_section">
        <Container>
          <Row>
            <Col lg={5} className="mb-3">
              <div className="detailImage">
                {/* <Image
                    src={product?.images[0]?.image_path || images.smartphone1}
                /> */}
                <ImageGallery items={images} />
              </div>
            </Col>
            <Col lg={7} className="mb-3">
              <h2 className="heading">{long_title || title}</h2>
              <p className="title2">About This Item</p>
              <ul className="itmeDesc">
                {description_points?.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>

              <ul className="itemFeatures">
                {detailed_specifications &&
                  Object.entries(detailed_specifications).map(([key, val]) => (
                    <li key={key} className="specs d_flexBetween">
                      <p className="boldTitle">{key}</p>
                      <p className="text">{val}</p>
                    </li>
                  ))}
                <li className="specs d_flexBetween">
                  <p className="boldTitle">Price</p>
                  <p className="text">${price}</p>
                </li>
                <li className="specs d_flexBetween">
                  <p className="boldTitle">Stock</p>
                  <p className="text">{stock}</p>
                </li>
              </ul>

              {colors?.length > 0 && (
                <>
                  <p className="title2 my-2">Pick Your Favorite Color</p>
                  <div className="color-options my-3">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        className={`color-circle ${
                          selectedColor === color ? "selected" : ""
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </>
              )}

              <div className="btn_sec d_flex">
                <GlobalButton
                  text="Buy Now"
                  border="none"
                  onClick={() => handleBuyNow(product)}
                />
                <GlobalButton
                  text="Add To Cart"
                  color="#fff"
                  textColor="#000"
                  border="1px solid #000"
                  onClick={() => handleAddToCart(product)}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default Details;
