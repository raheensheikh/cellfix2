import React from "react";
import GlobalButton from "./GlobalButton"; // adjust path as needed
import { Image } from "react-bootstrap";
const Locations = ({
  image,
  name,
  address,
  onMapClick,
  onCallClick,
  mapButtonText = "Find on maps",
  callButtonText = "Call Now",
}) => {
  return (
    <div className="locationBox d_flex">
      {/* <div className="d_flex"> */}
      <div className="locationBox_img">
        <Image src={image} alt="Location" />
      </div>
      <div className="locationBox_content">
        <h2 className="name">{name}</h2>
        <p className="addresss">{address}</p>
        <div className="btn_sec d_flex">
          <GlobalButton
            text={mapButtonText}
            color="#fff"
            textColor="#000"
            border="1px solid #000"
            onClick={onMapClick}
          />
          <GlobalButton text={callButtonText} onClick={onCallClick} />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Locations;
