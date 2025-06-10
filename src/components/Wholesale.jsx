import React from "react";
import GlobalButton from "./GlobalButton";
import { Navigate, useNavigate } from "react-router-dom";
const Wholesale = () => {
  const navigate = useNavigate();
  return (
    <div className="homeSlides_content wholesaleBanner">
      <p className="tilte redText">Wholesellers are welcomed</p>

      <p className="para">
        Wholesalers are welcome! We offer phone parts at competitive prices and
        in bulk quantities. We also serve individuals looking for quality phone
        parts Let's work together and grow our business.
      </p>

      <div className="btn_sec">
        <GlobalButton
          text="Contact Us"
          color="#E0131A"
          textColor="#fff"
          onClick={() => navigate("/contact-us")}
        />
      </div>
    </div>
  );
};

export default Wholesale;
