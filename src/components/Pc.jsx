import React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GlobalButton from "./GlobalButton"; // path adjust karein agar zarurat ho

const Pc = ({
  image,
  title,
  details = [],
  btn1Text = "",
  btn2Text = "",
  btn2Route = "",
  btn3Route = "",
  price,
  onClick,
}) => {
  const navigate = useNavigate();

  return (
    <div className="buildPc" onClick={onClick}>
      {image && <Image src={image} />}
      {title && <p className="title2">{title}</p>}

      <ul className="pcDetails">
        {details.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Always show buttons */}
      <div className="btn_sec d_flex">
        <GlobalButton
          text={btn2Text}
          border="none"
          onClick={(e) => {
            e.stopPropagation();
            btn2Route()
          }}
        />
       <p className="prices">{price}</p>
      </div>
    </div>
  );
};

export default Pc;
