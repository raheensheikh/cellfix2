import Layout from "../components/Layout.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import GlobalButton from "../components/GlobalButton.jsx";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";
import { addToCart } from "../redux/slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
    } else {
      toast.error(error);
    }
  };
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
    // console.log('dssdfsdfs')
  };
  useEffect(() => {
    if (id) getDetails();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!product) return <p className="text-center">No product found.</p>;

  const {
    title,
    long_title,
    description_points,
    detailed_specifications,
    images,
    colors,
    price,
    stock,
  } = product;

  return (
    <Layout>
      <section className="details_section">
        <Container>
          <Row>
            <Col lg={5}>
              <div className="detailImage">
                <Image
                  src={
                    images?.[0]?.url ||
                    "https://via.placeholder.com/400x400?text=No+Image"
                  }
                  fluid
                />
              </div>
            </Col>
            <Col lg={7}>
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
                    <li key={key} className="d_flexBetween">
                      <p className="boldTitle">{key}</p>
                      <p className="text">{val}</p>
                    </li>
                  ))}
                <li className="d_flexBetween">
                  <p className="boldTitle">Price</p>
                  <p className="text">${price}</p>
                </li>
                <li className="d_flexBetween">
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
                  onClick={() => navigate("/checkout")}
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
