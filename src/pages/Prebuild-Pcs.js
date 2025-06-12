import React, { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import { Col, Container, Row } from "react-bootstrap";
import Pc from "../components/Pc.jsx";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice.js";
import { useNavigate } from "react-router-dom";

const PrebuildPcs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pcs, setPcs] = useState([]);

  const getPcs = async () => {
    const { response, error } = await apiHelper(
      "GET",
      "products/prebuild-setups"
    );

    if (response) {
      const data = response.data.response.data;
      setPcs(data);
    } else {
      toast.error(error);
    }
  };

  const handleAddToCart = async (product) => {
    dispatch(addToCart(product));
    const body = { product_id: product?.id };
    const { response, error } = await apiHelper("POST", "cart/add", {}, body);
    if (!response) toast.error(error);
  };

  useEffect(() => {
    getPcs();
  }, []);

  return (
    <div>
      <Layout>
        <section className="preBuild_section" />
        <h2 className="heading my-4">Buy Pre-Build Setups</h2>
        <Container>
          <Row>
            {pcs.length === 0 ? (
              <Col>
                <p className="text-muted">No setups available.</p>
              </Col>
            ) : (
              pcs.map((pc) => (
                <Col key={pc.id} lg={4} md={6} sm={12} className="mb-3">
                  <Pc
                    image={
                      pc.images?.[0]?.url ||
                      "https://via.placeholder.com/300x300?text=No+Image"
                    }
                    title={pc.title}
                    details={pc.description_points}
                    btn2Text="Buy Now"
                    price={`$${pc.price}`}
                    btn2Route={() => navigate("/checkout")}
                    onClick={() => navigate(`/details/${pc.id}`)}
                  />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </Layout>
    </div>
  );
};

export default PrebuildPcs;
