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
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import Specialities from "../components/Specialities";
import ProductCard from "../components/ProductCard.jsx";
import GlobalButton from "../components/GlobalButton.jsx";
import Services from "../components/Services.jsx";
import Locations from "../components/Locations.jsx";
import { apiHelper } from "../services/index.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import OverlayLoader from "../components/Loader.jsx";
import { addToCart } from "../redux/slices/cartSlice.js";
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
  const [isModalBuy, setModalBuy] = useState(false);
  const dispatch = useDispatch();

  const [phoneParts, setPhoneParts] = useState([]);
  const [phones, setPhones] = useState([]);
  const [watches, setWatches] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [consoles, setConsoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState([]);
  const [isModalContact, setModalContact] = useState(false);
  const [repairCategories, setRepairCategories] = useState([]);
  const repairImages = [
    images.repair1,
    images.repair2,
    images.repair3,
    images.repair4,
    images.repair5,
  ];




  const handleAddToCart = async (product) => {
    dispatch(addToCart(product));
    const body = {
      product_id: product?.id
    }
    const {response, error} = await apiHelper("POST", 'cart/add', {}, body)
    if(response){
      console.log(response.data.data)
    }else{
      toast.error(error)
    }
    // console.log('dssdfsdfs')
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

  const storeImages = [images.map1, images.map2, images.map3, images.map4];
  return (
    <div>
      <Layout isModalContact={isModalContact} setModalContact={setModalContact}>
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
            modules={[Pagination, Mousewheel, Keyboard]}
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
            {/* <Row>
              <Col lg={3} md={4} sm={6} xs={6}>
                <ProductCard
                  image={images.repair1}
                  showTitle={false}
                  btn3Text="Repair Now"
                  showBtnSec2={true}
                  showBtnSec={false}
                  showBorder={true}
                  btn1Route="/repair"
                />
              </Col>
              <Col lg={3} md={4} sm={6} xs={6}>
                <ProductCard
                  image={images.repair2}
                  showTitle={false}
                  btn3Text="Repair Now"
                  showBtnSec2={true}
                  showBtnSec={false}
                  showBorder={true}
                  btn1Route="/repair"
                />
              </Col>
              <Col lg={3} md={4} sm={6} xs={6}>
                <ProductCard
                  image={images.repair3}
                  showTitle={false}
                  btn3Text="Repair Now"
                  showBtnSec2={true}
                  showBtnSec={false}
                  showBorder={true}
                  btn1Route="/repair"
                />
              </Col>
              <Col lg={3} md={4} sm={6} xs={6}>
                <ProductCard
                  image={images.repair4}
                  showTitle={false}
                  btn3Text="Repair Now"
                  showBtnSec2={true}
                  showBtnSec={false}
                  showBorder={true}
                  btn1Route="/repair"
                />
              </Col>
              <Col lg={3} md={4} sm={6} xs={6}>
                <ProductCard
                  image={images.repair5}
                  showTitle={false}
                  btn3Text="Repair Now"
                  showBtnSec2={true}
                  showBtnSec={false}
                  showBorder={true}
                  btn1Route="/repair"
                />
              </Col>
            </Row> */}
            <Row>
              {repairCategories.map((item, index) => (
                <Col key={item.id} lg={3} md={4} sm={6} xs={6}>
                  <ProductCard
                    image={repairImages[index % repairImages.length]} // Cycle through dummy images
                    showTitle={false}
                    btn3Text="Repair Now"
                    showBtnSec2={true}
                    showBtnSec={false}
                    showBorder={true}
                    btn3Click={() => navigate("/repair")}
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
                      btn1Click={() => navigate("/checkout")}
                    />
                  </Col>
                ))
              ) : (
                <p>No phone parts available</p>
              )}
              {/* <Col lg={3} md={4} sm={6} xs={6}>
                <ProductCard
                  image={images.parts2}
                  showTitle={true}
                  title="iPhone 16 Pro Max Charging Port Flex Desert Titanium"
                  btn1Text="Buy Now"
                  btn2Text="Add to Cart"
                  showBtnSec2={false}
                  showBtnSec={true}
                  showBorder={false}
                />
              </Col> */}
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
                      btn1Click={() => navigate("/checkout")}
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
                      btn1Click={() => navigate("/checkout")}
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
                      btn1Click={() => navigate("/checkout")}
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
                      btn1Click={() => navigate("/checkout")}
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
                      btn1Click={() => navigate("/checkout")}
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
            btnClick={() => navigate("/repair")}
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
                    address={`${store.address} Houston TX ${store.zipcode}`}
                    onMapClick={() => handleMapClick(store.google_maps_link)}
                    onCallClick={() => setModalContact(true)}
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

        
      </Layout>
      <OverlayLoader visible={loading} />
    </div>
  );
};

export default Home;
