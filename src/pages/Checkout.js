import Layout from "../components/Layout.jsx";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import images from "../assets/images/index.js";
import React, { useRef, useState, useEffect } from "react";
import GlobalButton from "../components/GlobalButton.jsx";
import { useNavigate } from "react-router-dom";
import OrderItem from "../components/OrderItem.jsx";
import TotalCost from "../components/TotalCost.jsx";
import LabeledInput from "../components/LabeledInput.jsx";
import { apiHelper } from "../services/index.js";
import { toast } from "react-toastify";
import Modal from "../components/Modal.jsx";
import { useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity } from "../redux/slices/cartSlice.js";
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OverlayLoader from "../components/Loader.jsx";
const Checkout = () => {
  const navigate = useNavigate();
  const btn2Route = "/checkout";
  const btn3Route = "/wishlist";
  const [activeCard, setActiveCard] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [isModalSuccess, setModalSuccess] = useState(false);
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [values, setValues] = useState({
    firstName: '',
    lastName: "",
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    landmark: '',
    paymentMethod: ''
  })
  const dispatch = useDispatch()
  const elementWrapperStyle = {
    padding: "8px",
    boxShadow: "0px 0px 3px 0px #cccccc5e",
    outline: "none",
    border: "none",
    width: "100%",
    color: "#000",
    borderRadius: "12px",
    backgroundColor: "#fff",
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: "16px",
        height: '45px',
        color: "#000",
        letterSpacing: "0.025em",
        lineHeight: "29px",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": { color: "#aab7c4" },
      },
      invalid: { color: "#9e2146" }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const getCart = async () => {
    const { response, error } = await apiHelper("GET", "cart/view", {}, null);
    if (response) {
      setCartData(response.data.response.data);
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

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
      dispatch(incrementQuantity())
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
      dispatch(decrementQuantity())
    } else {
      toast.error(error);
    }
  };

  const handleRemoveItem = async (item) => {
    const {response, error} = await apiHelper('DELETE', `cart/remove/${item.id}`, {}, null)
    if(response){
      setCartData(response.data.response.data);
      dispatch(decrementQuantity())
    }else{
      toast.error(error);
    }
  }

  const cardImages = [
    images.card1,
    images.card2,
    images.zelle,
    images.cashApp,
    images.card5,
  ];

  const checkout = async (paymentMethod) => {
    const body = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone,
      address: values.address,
      city: values.city,
      state: values.state,
      postal_code: values.postalCode,
      landmark: values.landmark,
      payment_method: paymentMethod
    }
    const { response, error } = await apiHelper('POST', 'cart/complete-purchase', {}, body)
    if (response) {
      setLoading(false)
      console.log(response.data.response.data.payment_instructions)
      const redirectUrl = response.data.response.data.payment_instructions?.payment_link;
      console.log(redirectUrl)
      setModalSuccess(true)
      if(redirectUrl){
        window.open(redirectUrl, '_blank');
      }
    } else {
      setLoading(false)
      toast.error(error)
    }
  }

  const getCardToken = async () => {
    if (!stripe || !elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    const { token, error } = await stripe.createToken(cardNumberElement);

    if (error) {
      console.error(error);
      toast.error(error)
      setToken(null);
      setLoading(false)
    } else {
      console.log("Stripe Token:", token);
      setToken(token.id);
      addCard(token.id)
    }
  }

  const addCard = async (tokenId) => {
    const body = {
      token: tokenId
    }
    const {response, error} = await apiHelper('POST', 'cards/add', {}, body)
    if(response){
      console.log(response.data.data)
      activateCard(response.data.data.id)
    }else{
      toast.error(error)
      setLoading(false)
    }
  }

  const activateCard = async (cardId) => {
    const body = {
      card_id: cardId
    }
    console.log(cardId)
    const {response, error} = await apiHelper('POST', "cards/active", {}, body)
    if(response){
      console.log(response.data.data)
      checkout('Stripe')
    }else{
      toast.error(error)
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
      setLoading(true)
    if(activeCard === 0){
      getCardToken()
    }else if (activeCard === 1){
      checkout('PayPal')
    }else if (activeCard === 2){
      checkout('Zelle')
    }else if (activeCard === 3){
      checkout('Cashapp')
    }else if (activeCard === 4){
      checkout("COD")
    }
  };

  const handleCardClick = (index) => {
    setActiveCard(index);
  };

  useEffect(()=>{
    console.log(activeCard)
  },[activeCard])

  return (
      <div>
        <Layout>
          <section className="checkout_section">
            <Container>
              <form onSubmit={handleSubmit}>
                <Row>
                <Col lg={6} md={8} className="mb-3">
                  <h2 className="heading">Complete your order</h2>
                  <p className="redText ">Personal Details</p>
                  <Row>
                    <Col lg={6} md={6}>
                      <LabeledInput
                        label="First Name"
                        placeholder="First Name"
                        className="inputfield"
                        name="firstName"
                        required={true}
                        value={values.firstName}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={6} md={6}>
                      <LabeledInput
                        label="Last Name"
                        placeholder="Last Name"
                        className="inputfield"
                        name="lastName"
                        required={true}
                        value={values.lastName}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={6} md={6}>
                      <LabeledInput
                        label="Email"
                        placeholder="Enter Your Email"
                        className="inputfield"
                        name="email"
                        type="email"
                        required={true}
                        value={values.email}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={6} md={6}>
                      <LabeledInput
                        label="Phone Number"
                        placeholder="Enter Your Phone Number"
                        className="inputfield"
                        name="phone"
                        type="phone"
                        required={true}
                        value={values.phone}
                        onChange={handleChange}
                      />
                    </Col>
                    <p className="redText ">Payment Details</p>
                    <div className="d_flex paymentCards mb-3">
                      {cardImages.map((img, index) => (
                        <div
                          key={index}
                          className={`cards ${activeCard === index ? "active" : ""
                            }`}
                          onClick={() => handleCardClick(index)}
                        >
                          <Image src={img} alt={`Card ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                    {
                      activeCard === 0 && (
                        <>
                        <Col lg={6} md={6}>
                      <LabeledInput
                        label="Card Holder Name"
                        placeholder="Enter Card Holder Name"
                        className="inputfield"
                      />
                    </Col>
                    <Col lg={6} md={6}>
                      <div className={`labeled-input`}>
                        <label className="input-label">Card Number</label>
                        <div style={elementWrapperStyle}>
                          <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
                        </div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <div className={`labeled-input`}>
                        <label className="input-label">CVC</label>
                        <div style={elementWrapperStyle}>
                          <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                        </div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <div className={`labeled-input`}>
                        <label className="input-label">Expiry Date</label>
                        <div style={elementWrapperStyle}>
                          <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                        </div>
                      </div>
                    </Col>
                        </>
                      )
                    }
                    <p className="redText my-3">Shipping Address</p>
                    <Col lg={12} md={12}>
                      <LabeledInput
                        label="Address Line 1"
                        placeholder="Your Complete address..."
                        className="inputfield"
                        name="address"
                        required={true}
                        value={values.address}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <LabeledInput
                        label="City"
                        placeholder="Enter City"
                        className="inputfield"
                        name="city"
                        required={true}
                        value={values.city}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <LabeledInput
                        label="State"
                        placeholder="Enter State"
                        className="inputfield"
                        name="state"
                        required={true}
                        value={values.state}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={6} md={6}>
                      <LabeledInput
                        label="Landmark"
                        placeholder="Any Landmark (famous place or mall)"
                        className="inputfield"
                        name="landmark"
                        required={true}
                        value={values.landmark}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={6} md={6}>
                      <LabeledInput
                        label="Postal Code"
                        placeholder="ZIP Code (231216)"
                        className="inputfield"
                        name="postalCode"
                        type="number"
                        required={true}
                        value={values.postalCode}
                        onChange={handleChange}
                      />
                    </Col>
                    {/* <GlobalButton
                    text="Checkout"
                    border="none"
                    onClick={() => navigate(btn3Route)}
                  /> */}
                  </Row>
                </Col>
                <Col lg={6} md={8} className="mb-3">
                  <div className="orderDetails">
                    <h2 className="heading">order details</h2>
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
                        onRemove={() => handleRemoveItem(item)}
                      />
                    ))}
                    <TotalCost
                      subtotal={cartData.subtotal?.toFixed(2)}
                      shipping={cartData.shipping?.toFixed(2)}
                      total={cartData.total?.toFixed(2)}
                    />
                  </div>
                  <div className="btn_sec d_flex mt-3">
                    <GlobalButton
                      text="Complete Purchase"
                      border="none"
                    />
                    <GlobalButton
                      text="Cancel"
                      color="#fff"
                      textColor="#000"
                      border="1px solid #000"
                      onClick={() => navigate(btn2Route)}
                    />
                  </div>
                </Col>
              </Row>
              </form>
            </Container>
          </section>
          <Modal
            isOpen={isModalSuccess}
            onClose={() => setModalSuccess(false)}
            showHeader={false}
            heading="Contact Us"
          >
            <div className="successModal">
              <Image src={images.check} alt="Success" />
              <h2 className="heading">Your order has been placed successfully</h2>
              <p className="para">
                your order will be delivered to you as soon as possible
              </p>
              <div className="btn_sec">
                <GlobalButton
                  text="Back to Shopping Orders"
                  border="1px solid #000"
                  onClick={() => navigate("/")}
                />
              </div>
            </div>
          </Modal>
                <OverlayLoader visible={loading} />
        </Layout>
      </div>
  );
};

export default Checkout;
