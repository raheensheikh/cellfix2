import React, { useEffect, useState } from "react";
import { Link, Links, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChevronDown,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Image, Row } from "react-bootstrap";
import images from "../assets/images/index.js";
import GlobalButton from "./GlobalButton.jsx";
import Modal from "./Modal";
import ProductCard from "./ProductCard.jsx";
import OrderItem from "../components/OrderItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice.js";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";

const Layout = ({ children }) => {
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [repairOpen, setRepairOpen] = useState(false);
  const [pcBuildsOpen, setPcBuildsOpen] = useState(false);
  const [cartData, setCartData] = useState([]);
  const { totalQuantity, totalPrice, items } = useSelector(
    (state) => state.cart
  );
  console.log(totalPrice);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    // setItems((prev) => prev.filter((item) => item.id !== id));
  };
  // const [items, setItems] = useState([
  //   {
  //     id: 1,
  //     title: "intel core i9-14900k...",
  //     image: images.repair1,
  //     price: 449,
  //   },
  //   {
  //     id: 2,
  //     title: "asus prime x870-p...",
  //     image: images.repair2,
  //     price: 100,
  //   },
  // ]);

  const isActive = (path, exact = true) => {
    return exact
      ? location.pathname === path
      : location.pathname.startsWith(path);
  };
  const navigate = useNavigate();

  const getCart = async () => {
    const { response, error } = await apiHelper("GET", "cart/view", {}, null);
    if (response) {
      console.log("cart", response.data.response.data);
      setCartData(response.data.response.data);
    } else {
      toast.error(error);
    }
  };

  const handleIncrement = async (item) => {
    const body = {
      cart_id: item.id,
      type: "increase",
    };
    const { response, error } = await apiHelper(
      "POST",
      "cart/update-quantity",
      {},
      body
    );
    if (response) {
      setCartData(response.data.response.data);
    } else {
      toast.error(error);
    }
  };

  const handleDecrement = async (item) => {
    const body = {
      cart_id: item.id,
      type: "decrease",
    };
    const { response, error } = await apiHelper(
      "POST",
      "cart/update-quantity",
      {},
      body
    );
    if (response) {
      setCartData(response.data.response.data);
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="layout-wrapper">
      {/* Header */}
      <header className="header d_flexBetween">
        <div className="header-left d_flex">
          {/* <img src={images.logo} alt="Logo" className="logo" /> */}
          <Image src={images.logo} alt="Logo" className="logo" />
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        <nav className={`navbar ${menuOpen ? "open" : ""}`}>
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>

          {/* Repair Dropdown */}
          <div className={`nav-link dropdown ${repairOpen ? "active" : ""}`}>
            {/* <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" /> */}
            <div
              onClick={() => setRepairOpen(!repairOpen)}
              className="dropdown-toggle"
            >
              Repair
            </div>
            {repairOpen && (
              <div className="dropdown-menu">
                <Link to="/online-repair" className="dropdown-item">
                  Online Repair
                </Link>
                <Link to="/repair" className="dropdown-item">
                  Repair On Store
                </Link>
              </div>
            )}
          </div>

          {/* Shop Modal Trigger */}
          <div className={`nav-link ${isModalOpen ? "active" : ""}`}>
            <div
              onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }}
              style={{ cursor: "pointer" }}
            >
              Shop
            </div>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              showHeader={false}
              showCloseButton={false}
              width="calc(100% - 100px)"
            >
              <h2 className="heading">What you want to buy today?</h2>
              <div
                className="d_flex"
                style={{ flexWrap: "wrap", justifyContent: "center" }}
              >
                <ProductCard
                  image={images.repair1}
                  showTitle={false}
                  btn3Text="Buy SmartPhones"
                  showBtnSec2={true}
                  showBorder={false}
                  showBtnSec={false}
                  btn3Click={() => navigate("/shop-phones")}
                />
                <ProductCard
                  image={images.repair2}
                  showTitle={false}
                  title="Apple iphone 16 "
                  btn3Text="Buy Smart Watches"
                  showBtnSec2={true}
                  showBorder={false}
                  showBtnSec={false}
                  btn3Click={() => navigate("/shop-watches")}
                />
                <ProductCard
                  image={images.repair3}
                  showTitle={false}
                  title="Apple iphone 16 "
                  btn3Text="Buy Laptops"
                  showBtnSec2={true}
                  showBorder={false}
                  showBtnSec={false}
                  btn3Click={() => navigate("/shop-laptops")}
                />
                <ProductCard
                  image={images.repair4}
                  showTitle={false}
                  title="Apple iphone 16 "
                  btn3Text="Buy Ipads"
                  showBtnSec2={true}
                  showBorder={false}
                  showBtnSec={false}
                  btn3Click={() => navigate("/shop-ipads")}
                />
                <ProductCard
                  image={images.repair5}
                  showTitle={false}
                  title="Apple iphone 16 "
                  btn3Text="Buy Gaming Consoles"
                  showBtnSec2={true}
                  showBorder={false}
                  showBtnSec={false}
                  btn3Click={() => navigate("/shop-consoles")}
                />
              </div>
            </Modal>
          </div>

          <Link
            to="/phone-parts"
            className={`nav-link ${isActive("/phone-parts") ? "active" : ""}`}
          >
            Phone Parts
          </Link>

          {/* PC Builds Dropdown */}
          <div className={`nav-link dropdown ${pcBuildsOpen ? "active" : ""}`}>
            <div
              onClick={() => setPcBuildsOpen(!pcBuildsOpen)}
              className="dropdown-toggle"
            >
              PC Builds
              {/* <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" /> */}
            </div>
            {pcBuildsOpen && (
              <div className="dropdown-menu">
                <Link to="/customize-pcs" className="dropdown-item">
                  Customize Pcs
                </Link>
                <Link to="/prebuild-pcs" className="dropdown-item">
                  Pre Build Pcs
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/services"
            className={`nav-link ${isActive("/services") ? "active" : ""}`}
          >
            Services
          </Link>
        </nav>
        <div className="header-right">
          <GlobalButton
            text={"Contact Us"}
            onClick={() => navigate("/contact-us")}
          />
          <button className="cart_option" onClick={() => setShowCart(true)}>
            <Image src={images.cart} alt="cart_option" />
            <div className="cart_amount">
              <small>{totalQuantity}</small>
            </div>
          </button>
        </div>
        <div className={`offcanvas-cart ${showCart ? "show" : ""}`}>
          <div className="cart-header">
            <h3 className="title2">Your Shopping Cart</h3>
            <button onClick={() => setShowCart(false)} className="closebtn">
              ✕
            </button>
          </div>

          <div className="cart-body">
            {/* Render your cart items here */}
            {cartData.items?.map((item) => (
              <OrderItem
                key={item.product.id}
                image={item.product.image}
                title={item.product.title}
                price={item.product.price}
                showCloseButton={true}
                quantity={item.quantity}
                onIncrement={() => handleIncrement(item)}
                onDecrement={() => handleDecrement(item)}
                onRemove={() => dispatch(removeFromCart(item.id))}
              />
            ))}
          </div>

          <div className="cart-footer">
            <p>
              <strong>Subtotal:</strong> ${cartData.subtotal?.toFixed(2)}
            </p>
            <GlobalButton
              text="Proceed To Checkout"
              color="#000"
              textColor="#ffff"
              onClick={() => {
                // setShowCart(false);
                navigate("/checkout");
              }}
            />
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="content-body">{children}</main>

      <footer className="footer">
        <Container>
          <Row>
            <Col lg={4} md={4} sm={3}>
              <div className="footer-left">
                <Image
                  src={images.footerLogo}
                  alt="Logo"
                  className="footer-logo"
                />
                <div className="border-bottom m-5"></div>
                <div className="social-icons">
                  <a
                    href="https://www.facebook.com/share/1HQ3yK1Wuh/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={images.facebook}
                      alt="Facebook"
                      className="icon"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/_cellnet_?igsh=b2Zma2NwdHBlZzZz"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={images.instagram}
                      alt="Instagram"
                      className="icon"
                    />
                  </a>

                  <a
                    href="https://wa.me/13467337447"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={images.whatsapp}
                      alt="Whatsapp"
                      className="icon"
                    />
                  </a>
                </div>
              </div>
            </Col>
            <Col lg={8} md={8} sm={9}>
              <div className="footer-right">
                <div className="footer-links">
                  <h2 className="heading">Contact information</h2>
                  <Link to="/">346-733-7447</Link>
                  <Link to="/">cellfix4uteam@gmail.com</Link>
                  <Link to="/">Operational Hours: 10 AM to 8 PM</Link>
                </div>
                <div className="footer-links">
                  <h2 className="heading">Links</h2>
                  <Link to="/about-us">About Us</Link>
                  <Link to="/terms-and-conditions">Terms & Conditions</Link>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
