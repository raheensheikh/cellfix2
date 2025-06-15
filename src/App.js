import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Repair from "./pages/Repair";
import OnlineRepair from "./pages/Online-Repair";
import ContactUs from "./pages/Contact-Us";
import NearestStore from "./pages/NearestStore";
import ShopPhones from "./pages/Shop-Phones";
import ShopWatches from "./pages/Shop-Watches";
import ShopLaptop from "./pages/Shop-Laptops";
import ShopIpads from "./pages/Shop-Ipads";
import ShopConsoles from "./pages/Shop-Consoles";
import AboutUs from "./pages/About-Us";
import TermsCondition from "./pages/Terms-Conditions";
import PrivacyPolicy from "./pages/Privacy-Policy";
import Details from "./pages/Details";
import PhoneParts from "./pages/Phone-Parts";
import Checkout from "./pages/Checkout";
import CustomizePcs from "./pages/Customize-Pcs";
import PrebuildPcs from "./pages/Prebuild-Pcs";
import Services from "./pages/Services";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Router basename="/cellfix4u">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repair" element={<Repair />} />
          <Route path="/online-repair" element={<OnlineRepair />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/nearest-store" element={<NearestStore />} />
          <Route path="/shop-phones" element={<ShopPhones />} />
          <Route path="/shop-watches" element={<ShopWatches />} />
          <Route path="/shop-laptops" element={<ShopLaptop />} />
          <Route path="/shop-ipads" element={<ShopIpads />} />
          <Route path="/shop-consoles" element={<ShopConsoles />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms-and-conditions" element={<TermsCondition />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/phone-parts" element={<PhoneParts />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/customize-pcs" element={<CustomizePcs />} />
          <Route path="/prebuild-pcs" element={<PrebuildPcs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
