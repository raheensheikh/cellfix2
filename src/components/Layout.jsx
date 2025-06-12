import React, { useEffect, useState, useRef } from "react";
import { Link, Links, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChevronDown,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Form, Image, Row } from "react-bootstrap";
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
import { setLogin, setToken, setUser } from "../redux/slices/userSlice.js";
import LabeledInput from "./LabeledInput.jsx";

const Layout = ({
  isModalContact = false,
  setModalContact = () => "",
  children,
}) => {
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [repairOpen, setRepairOpen] = useState(false);
  const [pcBuildsOpen, setPcBuildsOpen] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [prevFrom, setPrevFrom] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [user_id, setUserId] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);
  const [isModalOpen3, setModalOpen3] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const [isModalBuy, setModalBuy] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const { totalQuantity, totalPrice, items } = useSelector(
    (state) => state.cart
  );
  const { token } = useSelector((state) => state.user);
  console.log(totalPrice);
  const dispatch = useDispatch();

  const handleRemove = (id) => {};

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

  // auth
  const OnSubmit = async (e) => {
    e.preventDefault();

    const device_type = "android"; // or "browser"
    const device_token =
      localStorage.getItem("device_token") || crypto.randomUUID();
    localStorage.setItem("device_token", device_token);

    const { response, error } = await apiHelper(
      "POST",
      "/auth/login",
      {},
      {
        email,
        password,
        rememberMe,
        device_type,
        device_token,
      }
    );
    if (response) {
      console.log(response.data.response.data);
      setModalOpen(false);
      setModalOpen3(true);
      setPrevFrom("login");
      setUserId(response.data.response.data.user_id);
    } else {
      toast.error(error);
    }
  };
  const SignUp = async (e) => {
    e.preventDefault();
    const { response, error } = await apiHelper(
      "POST",
      "/auth/register",
      {},
      {
        first_name,
        last_name,
        email,
        password,
      }
    );

    const data = response?.data;
    if (response) {
      toast.success(response.data.message);
      console.log(response.data.response.data);
      setUserId(response.data.response.data.user_id);
      setModalOpen2(false);
      setModalOpen3(true);
      setPrevFrom("signup");
    } else {
      toast.error(error[0]);
    }
  };
  const handleLogout = async () => {
    const device_token = localStorage.getItem("device_token");

    const { response, error } = await apiHelper(
      "POST",
      "/profile/logout",
      {},
      {
        device_token,
      }
    );

    if (response) {
      console.log("Logged out successfully");
      // Clear any user data, tokens, etc.
      localStorage.removeItem("device_token");
      // optionally: clear auth tokens, user context, etc.
      toast.success("Logged out successfully");
      navigate("/"); // redirect to home or login page
    } else {
      toast.error(error || "Failed to logout");
    }
  };

  const VerifyOtp = async (e) => {
    e.preventDefault();
    const { response, error } = await apiHelper(
      "POST",
      "/auth/verification",
      {},
      {
        user_id,
        otp: otp.join(""),
      }
    );
    if (response) {
      console.log(response.data.response.data);
      toast.success(response.data.message);
      if (prevFrom === "login") {
        dispatch(setLogin());
        dispatch(setUser(response.data.response.data.user));
        dispatch(setToken(response.data.response.data.token));
        setModalOpen3(false);
      }
      if (prevFrom === "signup") {
        setModalOpen3(false);
        setModalOpen(true);
      }
    } else {
      toast.error(error);
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const updatedOtp = [...otp];

      if (otp[index]) {
        updatedOtp[index] = "";
        setOtp(updatedOtp);
      } else if (index > 0) {
        updatedOtp[index - 1] = "";
        setOtp(updatedOtp);
        otpRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const verifyOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // allow digits only
    if (!value) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Focus next input
    if (index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus();
    }
  };
  const ResendOtp = async (e) => {
    e.preventDefault();

    try {
      const { response, error } = await apiHelper(
        "POST",
        "/auth/resend-otp",
        {},
        { user_id }
      );

      const data = response?.data;

      if (data?.success) {
        dispatch(setLogin(true));
        toast.success(
          "We have resent the OTP verification code to your email address"
        );
        setModalOpen(false);
      } else if (data?.message === "Invalid OTP or expired") {
        toast.error("OTP is invalid or expired");
        setOtp(["", "", "", "", "", ""]); // Clear OTP
        otpRefs.current[0]?.focus(); // Focus back to first input
      } else {
        toast.error(data?.message || "OTP verification failed");
        setOtp(["", "", "", "", "", ""]); // Clear OTP on general failure
        otpRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during OTP verification");
    }
  };
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value entered
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    console.log("TOKEN: ", token);

    const timer = setTimeout(() => {
      if (!token) {
        setLoginModalOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [token, loginModalOpen]);

  return (
    <div className="layout-wrapper">
      {/* Header */}
      <header className="header d_flexBetween">
        <div className="header-left d_flex">
          {/* <img src={images.logo} alt="Logo" className="logo" /> */}
          <Link to="/" className="logo-link">
            <Image src={images.logo} alt="Logo" className="logo" />
          </Link>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        <nav className={`navbar ${menuOpen ? "open" : ""}`}>
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>

          <div className={`nav-link dropdown ${repairOpen ? "active" : ""}`}>
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
          <div className="profile-dropdown-wrapper">
            <button
              className="profile-button"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <FontAwesomeIcon icon={faUser} size="lg" />
            </button>

            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div onClick={() => navigate("/profile")}>Profile</div>
                <div onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>

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
      <main className="content-body">
        {children}
        {/* LOGIN MODAL */}
        <Modal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          showHeader={true}
          heading="Login"
        >
          <div className="authModal">
            <Form onSubmit={OnSubmit}>
              <div className="mb-3">
                <LabeledInput
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <LabeledInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div> */}
              <GlobalButton text="Login" onClick={OnSubmit} />
              <div className="signupText text-center">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalOpen2(true);
                    setModalOpen(false);
                  }}
                >
                  Sign Up
                </Link>
              </div>
            </Form>
          </div>
        </Modal>

        {/* SIGNUP MODAL */}
        <Modal
          isOpen={isModalOpen2}
          onClose={() => setModalOpen2(false)}
          showHeader={true}
          heading="Sign Up"
        >
          <div className="authModal">
            <Form onSubmit={SignUp}>
              <div className="mb-3">
                <LabeledInput
                  label="First Name"
                  type="text"
                  placeholder="Enter your first name"
                  required={true}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <LabeledInput
                  label="Last Name"
                  type="text"
                  placeholder="Enter your last name"
                  required={true}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <LabeledInput
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <LabeledInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <GlobalButton text="Verify Email" />
              <div className="signupText text-center">
                Already have an account?
                <Link
                  to="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalOpen(true);
                    setModalOpen2(false);
                  }}
                >
                  Login
                </Link>
              </div>
            </Form>
          </div>
        </Modal>

        {/* OTP VERIFICATION MODAL */}
        <Modal
          isOpen={isModalOpen3}
          onClose={() => setModalOpen3(false)}
          showHeader={true}
          heading="Verify Email"
        >
          <div className="authModal otpModal">
            <Form onSubmit={VerifyOtp}>
              <p>Enter the code sent to your email.</p>
              <div className="inputWrap d_flex mb-3 gap-2">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    maxLength="1"
                    value={otp[index] || ""}
                    onChange={(e) => verifyOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (otpRefs.current[index] = el)}
                    className="otp-input"
                  />
                ))}
              </div>

              <div className="signupText text-center mb-3">
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!user_id) {
                      toast.warning("Please sign up before resending OTP.");
                      return;
                    }
                    ResendOtp(e);
                  }}
                >
                  Resend Code
                </Link>
              </div>

              <GlobalButton text="Confirm" type="submit" />
            </Form>
          </div>
        </Modal>
        <Modal
          isOpen={isModalBuy}
          onClose={() => setModalBuy(false)}
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
        <Modal
          isOpen={isModalContact}
          onClose={() => setModalContact(false)}
          showHeader={true}
          heading="Contact Us"
        >
          <div className="contactNumbers">
            <p className="title">CellFix</p>
            <p className="para">Beechnut st Houston tx 77072</p>
            <p className="number">2814987243</p>
          </div>
          <div className="contactNumbers">
            <p className="title">Xpert Wireless</p>
            <p className="para">3818 Linkvalley dr Houston tx 77025</p>
            <p className="number">8328209900</p>
          </div>
          <div className="contactNumbers">
            <p className="title">Xpert 4G Wireless</p>
            <p className="para">6610 Antoine dr Houston tx 77091</p>
            <p className="number">7136823333</p>
          </div>
          <div className="contactNumbers">
            <p className="title">Xpert Wireless</p>
            <p className="para">5823 w Gulfbank rd Houston tx 77088</p>
            <p className="number">2812720082</p>
          </div>
        </Modal>
      </main>

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
