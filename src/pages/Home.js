import React, { useRef, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Col, Container, Image, Row, Form } from "react-bootstrap";
import images from "../assets/images/index.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import Specialities from "../components/Specialities";
import ProductCard from "../components/ProductCard.jsx";
import GlobalButton from "../components/GlobalButton.jsx";
import Modal from "../components/Modal.jsx";
import Services from "../components/Services.jsx";
import Locations from "../components/Locations.jsx";
import LabeledInput from "../components/LabeledInput.jsx";
import { apiHelper } from "../services/index.js";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setToken, setUser } from "../redux/slices/userSlice.js";
import { toast } from "react-toastify";
import OverlayLoader from "../components/Loader.jsx";
import { addToCart, incrementQuantity } from "../redux/slices/cartSlice.js";
import Wholesale from "../components/Wholesale.jsx";

const handleMapClick = () => {
  window.open("https://maps.app.goo.gl/XnwnYmJN4djB7Z7cA", "_blank");
};

const handleCallClick = () => {
  window.location.href = "tel:+18005551234";
};

const Home = () => {
  const navigate = useNavigate();
  const btn2Route = "/checkout";
  const btn3Route = "/wishlist";
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);
  const [isModalOpen3, setModalOpen3] = useState(false);
  const [isModalBuy, setModalBuy] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const [rememberMe, setRememberMe] = useState(false);
  const [user_id, setUserId] = useState("");
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [prevFrom, setPrevFrom] = useState("");
  const [phoneParts, setPhoneParts] = useState([]);
  const [phones, setPhones] = useState([]);
  const [watches, setWatches] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [consoles, setConsoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState([]);
  const [isModalContact, setModalContact] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [isStoreModal, setStoreModal] = useState(false);

  const { token, user, isLogin } = useSelector((state) => state.user);
  const [repairCategories, setRepairCategories] = useState([]);
  const repairImages = [
    images.repair1,
    images.repair2,
    images.repair3,
    images.repair4,
    images.repair5,
  ];
  const storeContactInfo = {
    1: {
      name: "CellNet",
      address: "Beechnut st Houston tx 77072",
      phone: "2814987243",
    },
    2: {
      name: "Xpert Wireless",
      address: "3818 Linkvalley dr Houston tx 77025",
      phone: "8328209900",
    },
    3: {
      name: "Xpert 4G Wireless",
      address: "6610 Antoine dr Houston tx 77091",
      phone: "7136823333",
    },
    4: {
      name: "Xpert Wireless",
      address: "5823 w Gulfbank rd Houston tx 77088",
      phone: "2812720082",
    },
  };
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
    const value = e.target.value.replace(/\D/, "");
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

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (!token) {
  //       setModalOpen(true);
  //     }
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, []);
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

  const handleAddToCart = async (product) => {
    const body = {
      product_id: product?.id,
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
    };
    const { response, error } = await apiHelper("POST", "cart/add", {}, body);
    if (response) {
      console.log(response.data.data);
      dispatch(incrementQuantity());
      navigate("/checkout")
    } else {
      toast.error(error);
    }
  };

  const getPhoneParts = async () => {
    setLoading(true);
    const { response, error } = await apiHelper(
      "GET",
      `products/products-by-category-and-brand?category_id=1`,
      {},
      null
    );
    if (response) {
      setLoading(false);
      console.log(response.data.response);
      setPhoneParts(response.data.response.data);
    } else {
      setLoading(false);
      toast.error(error);
    }
  };

  const getPhones = async () => {
    setLoading(true);
    const { response, error } = await apiHelper(
      "GET",
      `products/products-by-category-and-brand?category_id=2`,
      {},
      null
    );
    if (response) {
      setLoading(false);
      console.log(response.data.response);
      setPhones(response.data.response.data);
    } else {
      setLoading(false);
      toast.error(error);
    }
  };

  const getWatches = async () => {
    setLoading(true);
    const { response, error } = await apiHelper(
      "GET",
      `products/products-by-category-and-brand?category_id=3`,
      {},
      null
    );
    if (response) {
      setLoading(false);
      console.log(response.data.response);
      setWatches(response.data.response.data);
    } else {
      setLoading(false);
      toast.error(error);
    }
  };

  const getLaptops = async () => {
    setLoading(true);
    const { response, error } = await apiHelper(
      "GET",
      `products/products-by-category-and-brand?category_id=4`,
      {},
      null
    );
    if (response) {
      setLoading(false);
      console.log(response.data.response);
      setLaptops(response.data.response.data);
    } else {
      setLoading(false);
      toast.error(error);
    }
  };
  const getTablets = async () => {
    setLoading(true);
    const { response, error } = await apiHelper(
      "GET",
      `products/products-by-category-and-brand?category_id=5`,
      {},
      null
    );
    if (response) {
      setLoading(false);
      console.log(response.data.response);
      setTablets(response.data.response.data);
    } else {
      setLoading(false);
      toast.error(error);
    }
  };
  const getConsoles = async () => {
    setLoading(true);
    const { response, error } = await apiHelper(
      "GET",
      `products/products-by-category-and-brand?category_id=6`,
      {},
      null
    );
    if (response) {
      setLoading(false);
      console.log(response.data.response);
      setConsoles(response.data.response.data);
    } else {
      setLoading(false);
      toast.error(error);
    }
  };
  const weRepair = async () => {
    setLoading(true);
    const { response, error } = await apiHelper(
      "GET",
      `repair/categories`,
      {},
      null
    );
    if (response) {
      setLoading(false);
      console.log(response.data.response);
      setRepairCategories(response.data.response.data); // Save the fetched data
    } else {
      setLoading(false);
      toast.error(error);
    }
  };
  useEffect(() => {
    getPhoneParts();
    getPhones();
    getWatches();
    getLaptops();
    getTablets();
    getConsoles();
    weRepair();
    locations();
  }, []);
  const handleMapClick = (link) => {
    window.open(link, "_blank");
  };

  const handleCallClick = (phone) => {
    if (phone && phone !== "N/A") {
      window.location.href = `tel:${phone}`;
    } else {
      toast.info("Phone number not available");
    }
  };

  const locations = async () => {
    setLoading(true);
    try {
      const { response, error } = await apiHelper(
        "GET",
        "stores/locations",
        {},
        null
      );
      if (response) {
        console.log(response.data.response);
        setLocation(response.data.response.data);
      } else {
        toast.error(error || "Failed to fetch store locations");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  const whatRepair = async () => {
    setLoading(true);
    const { response, error } = await apiHelper(
      "GET",
      "repair/categories",
      {},
      null
    );
    if (response) {
      setRepairCategories(response.data.response.data);
    } else {
      toast.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    whatRepair();
  }, []);
  const storeImages = [images.map1, images.map2, images.map3, images.map4];
  return (
    <div>
      <Layout>
        <section className="homeSection1">
          {/* <GlobalButton
            text={"Build Customize Pc"}
            color="#000"
            textColor="#fff"
            border="1px solid #000"
            onClick={(e) => {
              e.preventDefault(); // just in case
              console.log("Shop clicked!");
              setModalOpen(true);
            }}
          /> */}
          <Swiper
            cssMode={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Pagination, Mousewheel, Keyboard, Autoplay]}
            autoplay={{
              delay: 3000, // 3 seconds
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            <SwiperSlide>
              <Specialities
                btn1Click={() => navigate("/repair")}
                btn2Click={(e) => {
                  e.preventDefault();
                  setModalBuy(true);
                }}
                imageSrc={images.slide2}
              />

              {/* <Specialities imageSrc={images.slide2} /> */}
            </SwiperSlide>

            <SwiperSlide>
              <Specialities
                showTitle={false}
                headingText="The Perfect PC Starts Here, Prebuild or Custom , Built for You"
                paragraphText="Explore a wide range of high-performance prebuilt PCs ready to go, or take full control and design a custom rig tailored to your exact needs. Whether you're gaming, creating, or working at full speed, we make it easy to get the power, performance, and style you’re looking for—all in one place."
                showBtnSec={true}
                showBtnSec2={false}
                imageSrc={images.slide4}
                btn1Text="Build Customize Pc"
                btn2Text="Buy Pre Build "
                highlightWords={["Prebuild", "Custom"]}
                btn2Route={btn2Route}
                btn3Route={btn3Route}
                btn1Click={() => navigate("/customize-pcs")}
                btn2Click={() => navigate("/prebuild-pcs")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Specialities
                showTitle={false}
                headingText="Get Every Gadget you want in Just $1 Down"
                paragraphText="Start Owning the gadgets you love with just $1 down. Easy, affordable, and hassle-free get the latest devices."
                showBtnSec={false}
                showBtnSec2={true}
                imageSrc={images.slide5}
                btn3Text="Buy Now"
                highlightWords={["Gadget", "$1"]}
                btn3Click={(e) => {
                  e.preventDefault();
                  setModalBuy(true);
                }}
              />
            </SwiperSlide>
            <SwiperSlide className="wholesaleSlide">
              <Wholesale />
            </SwiperSlide>
          </Swiper>
        </section>
        <section className="homeSection2">
          <Container>
            <div className="reviewsBox">
              <Row>
                <Col lg={4} md={4} sm={4} className="border-right">
                  <h4 className="reviewTitle"> 14+ years of experiance</h4>
                </Col>
                <Col lg={4} md={4} sm={4} className="border-right">
                  <h4 className="reviewTitle">15k+ satisfied customers</h4>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <h4 className="reviewTitle">4 stores in Houston</h4>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
        <section className="homeSection3">
          <Container>
            <h1 className="heading">What We Repair?</h1>

            <Row className="repairCategories">
              {repairCategories.map((item, index) => (
                <Col key={item.id} lg={3} md={4} sm={6} xs={6}>
                  <ProductCard
                    image={repairImages[index % repairImages.length]}
                    showTitle={true}
                    title={item.name}
                    btn3Text="Repair Now"
                    showBtnSec2={true}
                    showBtnSec={false}
                    showBorder={true}
                    btn3Click={() => navigate(`/repair?id=${item.id}`)}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
        <h1 className="heading text-center">Buy Products</h1>
        <section className="homeSection3">
          <Container>
            <p className="subTitle">Phone Parts</p>
            <Row>
              {phoneParts.length > 0 ? (
                phoneParts.slice(0, 4).map((item, index) => (
                  <Col key={index} lg={3} md={4} sm={6} xs={6}>
                    <ProductCard
                      image={item.image || images.parts2}
                      showTitle={true}
                      title={item.title}
                      btn1Text="Buy Now"
                      btn2Text="Add to Cart"
                      showBtnSec2={false}
                      showBtnSec={true}
                      showBorder={false}
                      btn2Click={() => handleAddToCart(item)}
                      btn1Click={() => handleBuyNow(item)}
                      onClick={() => navigate(`/details/${item.id}`)}
                      price={item.price}
                      showPrice={true}
                    />
                  </Col>
                ))
              ) : (
                <p>No phone parts available</p>
              )}
            </Row>

            {phoneParts.length > 0 && (
              <div className="seeMoreBtn">
                <GlobalButton
                  text={"See more Phone Parts"}
                  color="#fff"
                  textColor="#000"
                  border="1px solid #000"
                  onClick={() => navigate("/phone-parts")}
                />
              </div>
            )}
          </Container>
          <div className="border-bottom mx-5 my-5"></div>
        </section>
        <section className="homeSection3">
          <Container>
            <p className="subTitle">Latest Smartphones</p>
            <Row>
              {phones.length > 0 ? (
                phones.slice(0, 4).map((item, index) => (
                  <Col key={index} lg={3} md={4} sm={6} xs={6}>
                    <ProductCard
                      image={item.image || images.smartphone1}
                      showTitle={true}
                      title={item.title}
                      btn1Text="Buy Now"
                      btn2Text="Add to Cart"
                      showBtnSec2={false}
                      showBtnSec={true}
                      showBorder={false}
                      btn2Click={() => handleAddToCart(item)}
                      btn1Click={() => handleBuyNow(item)}
                      onClick={() => navigate(`/details/${item.id}`)}
                      price={item.price}
                      showPrice={true}
                    />
                  </Col>
                ))
              ) : (
                <p>No latest smartphones available</p>
              )}
            </Row>

            {phones.length > 0 && (
              <div className="seeMoreBtn">
                <GlobalButton
                  text={"See more Smart Phones"}
                  color="#fff"
                  textColor="#000"
                  border="1px solid #000"
                  onClick={() => navigate("/shop-phones")}
                />
              </div>
            )}
          </Container>
          <div className="border-bottom mx-5 my-5"></div>
        </section>
        <section className="homeSection3">
          <Container>
            <p className="subTitle">Smart Watches</p>
            <Row>
              {watches.length > 0 ? (
                watches.slice(0, 4).map((item, index) => (
                  <Col key={index} lg={3} md={4} sm={6} xs={6}>
                    <ProductCard
                      image={item.image || images.smartwatch1}
                      showTitle={true}
                      title={item.title}
                      btn1Text="Buy Now"
                      btn2Text="Add to Cart"
                      showBtnSec2={false}
                      showBtnSec={true}
                      showBorder={false}
                      btn2Click={() => handleAddToCart(item)}
                      btn1Click={() => handleBuyNow(item)}
                      onClick={() => navigate(`/details/${item.id}`)}
                      price={item.price}
                      showPrice={true}
                    />
                  </Col>
                ))
              ) : (
                <p>No latest smart watches available</p>
              )}
            </Row>

            {watches.length > 0 && (
              <div className="seeMoreBtn">
                <GlobalButton
                  text={"See more Smart Watches"}
                  color="#fff"
                  textColor="#000"
                  border="1px solid #000"
                  onClick={() => navigate("/shop-watches")}
                />
              </div>
            )}
          </Container>
          <div className="border-bottom mx-5 my-5"></div>
        </section>
        <section className="homeSection3">
          <Container>
            <p className="subTitle">Laptops</p>
            <Row>
              {laptops.length > 0 ? (
                laptops.slice(0, 4).map((item, index) => (
                  <Col key={index} lg={3} md={4} sm={6} xs={6}>
                    <ProductCard
                      image={item.image || images.laptop1}
                      showTitle={true}
                      title={item.title}
                      btn1Text="Buy Now"
                      btn2Text="Add to Cart"
                      showBtnSec2={false}
                      showBtnSec={true}
                      showBorder={false}
                      btn2Click={() => handleAddToCart(item)}
                      btn1Click={() => handleBuyNow(item)}
                      onClick={() => navigate(`/details/${item.id}`)}
                      price={item.price}
                      showPrice={true}
                    />
                  </Col>
                ))
              ) : (
                <p>No latest laptops available</p>
              )}
            </Row>

            {laptops.length > 0 && (
              <div className="seeMoreBtn">
                <GlobalButton
                  text={"See more Laptops"}
                  color="#fff"
                  textColor="#000"
                  border="1px solid #000"
                  onClick={() => navigate("/shop-laptops")}
                />
              </div>
            )}
          </Container>
          <div className="border-bottom mx-5 my-5"></div>
        </section>
        <section className="homeSection3">
          <Container>
            <p className="subTitle">Tablets / Ipads</p>
            <Row>
              {tablets.length > 0 ? (
                tablets.slice(0, 4).map((item, index) => (
                  <Col key={index} lg={3} md={4} sm={6} xs={6}>
                    <ProductCard
                      image={item.image || images.tab1}
                      showTitle={true}
                      title={item.title}
                      btn1Text="Buy Now"
                      btn2Text="Add to Cart"
                      showBtnSec2={false}
                      showBtnSec={true}
                      showBorder={false}
                      btn2Click={() => handleAddToCart(item)}
                      btn1Click={() => handleBuyNow(item)}
                      onClick={() => navigate(`/details/${item.id}`)}
                      price={item.price}
                      showPrice={true}
                    />
                  </Col>
                ))
              ) : (
                <p>No latest Tablets available</p>
              )}
            </Row>

            {tablets.length > 0 && (
              <div className="seeMoreBtn">
                <GlobalButton
                  text={"See more Tablets / ipads"}
                  color="#fff"
                  textColor="#000"
                  border="1px solid #000"
                  onClick={() => navigate("/shop-ipads")}
                />
              </div>
            )}
          </Container>
          <div className="border-bottom mx-5 my-5"></div>
        </section>
        <section className="homeSection3">
          <Container>
            <p className="subTitle">Next Gen Consoles</p>
            <Row>
              {consoles.length > 0 ? (
                consoles.slice(0, 4).map((item, index) => (
                  <Col key={index} lg={3} md={4} sm={6} xs={6}>
                    <ProductCard
                      image={item.image || images.tab1}
                      showTitle={true}
                      title={item.title}
                      btn1Text="Buy Now"
                      btn2Text="Add to Cart"
                      showBtnSec2={false}
                      showBtnSec={true}
                      showBorder={false}
                      btn2Click={() => handleAddToCart(item)}
                      btn1Click={() => handleBuyNow(item)}
                      onClick={() => navigate(`/details/${item.id}`)}
                    />
                  </Col>
                ))
              ) : (
                <p>No latest Gen consoles available</p>
              )}
            </Row>
            {consoles.length > 0 && (
              <div className="seeMoreBtn">
                <GlobalButton
                  text={"See more Consoles"}
                  color="#fff"
                  textColor="#000"
                  border="1px solid #000"
                  onClick={() => navigate("/shop-consoles")}
                />
              </div>
            )}
          </Container>
          <div className="border-bottom mx-5 my-5"></div>
        </section>
          <section className="services m-3">
            <Services
              image={images.service1}
              heading="Same Day Repairs"
              title="Expert Repair, Fast Service"
              description="With our extensive expertise, we deliver high-quality repairs 
            with impressive speed. Many issues can be fixed on the same day, often while you wait. Understanding 
            the inconvenience of a broken device, we prioritize quick fixes to get you back up and running as soon as possible."
              buttonText="Start a Repair"
              reverseRow={false}
              showBtn={false}
              btnClick={() => navigate("/repair")}
            />
          </section>
          <section className="services m-3">
            <Services
              image={images.service2}
              heading="Authentic Apple ® Parts Now Offered at CellNet"
              description="Cellnet provides iPhone repairs using only genuine Apple parts, 
                diagnostic software, and specialized tools to ensure your device 
                is repaired with precision and safety. Ask our store associates 
                about the availability of authentic Apple parts for your repair 
                needs."
              buttonText="Start iphone repair"
              reverseRow={true}
              showBtn={false}
              btnClick={() => navigate("/repair")}
            />
          </section>
          <section className="services m-3">
            <Services
              image={images.service3}
              heading="Genuine Samsung Parts, Reliable Service"
              description="As an authorized Samsung Service Provider, Cellnet Cell Phone 
                Repair ensures the use of genuine parts for select Samsung 
                repairs. Our certified technicians are committed to restoring 
                your device with OEM parts, advanced tools, and proven 
                techniques, all while delivering fast, dependable service"
              buttonText="Start Samsung repair"
              reverseRow={false}
              showBtn={false}
            />
          </section>
        <section className="locationSection m-3">
          <Container>
            <h1 className="heading text-start">Find our stores in houston</h1>
            <div className="d_flex allStores">
              {location.length > 0 ? (
                location.map((store, index) => (
                  <Locations
                    key={store.id}
                    image={storeImages[index % storeImages.length]}
                    name={store.name}
                    address={`${store.address} ${store.zipcode}`}
                    onMapClick={() => handleMapClick(store.google_maps_link)}
                    onCallClick={() => {
                      setSelectedStoreId(store.id);
                      setStoreModal(true);
                    }}
                  />
                ))
              ) : loading ? (
                <p>Loading...</p>
              ) : (
                <p>No stores found.</p>
              )}
            </div>
          </Container>
        </section>

        {/* LOGIN MODAL */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
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
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <GlobalButton text="Login" onClick={OnSubmit} />
              <div className="signupText text-center">
                Don't have an account?
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
        <Modal
          isOpen={isStoreModal}
          onClose={() => {
            setStoreModal(false);
            setSelectedStoreId(null);
          }}
          showHeader={true}
          heading="Store Contact"
        >
          {selectedStoreId && storeContactInfo[selectedStoreId] ? (
            <div className="contactNumbers">
              <p className="title">{storeContactInfo[selectedStoreId].name}</p>
              <p className="para">
                {storeContactInfo[selectedStoreId].address}
              </p>
              <p
                className="number"
                onClick={() =>
                  handleCallClick(storeContactInfo[selectedStoreId].phone)
                }
              >
                {storeContactInfo[selectedStoreId].phone}
              </p>
            </div>
          ) : (
            <p>No contact info available for this store.</p>
          )}
        </Modal>
      </Layout>
      <OverlayLoader visible={loading} />
    </div>
  );
};

export default Home;
