import Layout from "../components/Layout.jsx";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserProfile = async () => {
    setLoading(true);
    const { response, error } = await apiHelper("GET", "profile/user");
    setLoading(false);

    if (response) {
      const data = response.data.response.data;
      setUser(data);
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <Layout>
      <section className="profile_section">
        <Container>
          <h2 className="heading text-center">Profile</h2>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : user ? (
            <Row className="justify-content-center">
              <Col md={6}>
              
                <div className="profile-box p-4 border rounded shadow-sm">
                  <p>
                    <strong>First Name:</strong> {user.first_name || "-"}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {user.last_name || "-"}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email || "-"}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {user.phone_number || "-"}
                  </p>
                  <p>
                    <strong>City:</strong> {user.city || "-"}
                  </p>
                  <p>
                    <strong>Zip Code:</strong> {user.zip_code || "-"}
                  </p>
                </div>
              </Col>
            </Row>
          ) : (
            <p className="text-center text-muted">No user data found.</p>
          )}
        </Container>
      </section>
    </Layout>
  );
};

export default Profile;
