import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import images from "../assets/images";
import { Image } from "react-bootstrap";

const Features = () => {
  return (
    <>
      <h2 className="heading">Feature Brands</h2>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
      >
        {[
          images.brandSlide1,
          images.brandSlide2,
          images.brandSlide3,
          images.brandSlide4,
          images.brandSlide5,
          images.brandSlide6,
          images.brandSlide7,
        ].map((img, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "150px", // optional: adjust as needed
            }}
          >
            <Image
              src={img}
              alt={`brand-${index}`}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Features;
