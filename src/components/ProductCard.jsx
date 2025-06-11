import React from "react";
import { Image } from "react-bootstrap";
import GlobalButton from "./GlobalButton.jsx";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  image,
  title = "Product Title",
  showTitle = true,
  btn1Text = "Button 1",
  btn2Text = "Button 2",
  btn3Text = "Button 3",
  showBtnSec2 = false,
  showBtnSec = true,
  showBorder = false,
  showPrice = false,
  btn1Route = "/",
  btn2Route = "/",
  btn3Route = "/",
  btn1Click,
  btn2Click,
  btn3Click
}) => {
  const navigate = useNavigate();

  return (
    <div className={`productCard ${showBorder ? "withBorder" : ""}`}>
      <div className="productCard_img">
        <Image src={image} alt="Product" className="productCard_image" />
      </div>
      <div className="productCard_content">
        {showTitle && <h3 className="productCard_title">{title}</h3>}
        {showPrice && <span className="productCard_price">$99.99</span>}

        {showBtnSec2 && (
          <div className="btnSec2">
            <GlobalButton
              text={btn3Text}
              color="#000"
              textColor="#fff"
              // onClick={() => navigate(btn1Route)}
              onClick={btn3Click}
            />
          </div>
        )}

        {showBtnSec && (
          <div className="btn_sec d_flex">
            <GlobalButton
              text={btn1Text}
              color="#fff"
              textColor="#000"
              border="1px solid #000"
              // onClick={() => navigate(btn2Route)}
              onClick={btn1Click}
            />
            <GlobalButton
              text={btn2Text}
              border="none"
              // onClick={() => navigate(btn3Route)}
              onClick={btn2Click}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
