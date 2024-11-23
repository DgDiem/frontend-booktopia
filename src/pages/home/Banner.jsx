import React, { useState, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const listBanner = [
    { id: 1, image: "./images/banner1.jpg" },
    { id: 2, image: "./images/banner2.jpg" },
    { id: 3, image: "./images/banner3.jpg" },
  ];

  const SampleNextArrow = ({ onClick }) => (
    <div
      className="custom-arrow cursor-pointer flex items-center justify-center bg-white rounded-full border-2 border-gray-300 hover:bg-mainDark hover:text-white transition-colors duration-300"
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        top: "50%",
        right: "20px",
        transform: "translateY(-50%)",
        zIndex: "1",
      }}
      onClick={onClick}>
      <FaAngleRight style={{ fontSize: "20px" }} />
    </div>
  );

  const SamplePrevArrow = ({ onClick }) => (
    <div
      className="custom-arrow cursor-pointer flex items-center justify-center bg-white rounded-full border-2 border-gray-300 hover:bg-mainDark hover:text-white transition-colors duration-300"
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        top: "50%",
        left: "20px",
        transform: "translateY(-50%)",
        zIndex: "1",
      }}
      onClick={onClick}>
      <FaAngleLeft style={{ fontSize: "20px" }} />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: false,
          prevArrow: false,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          nextArrow: false,
          prevArrow: false,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots) => (
      <div className="dots-container">
        <ul className="flex justify-center space-x-2 -mt-14">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className="w-3 h-3 rounded-full cursor-pointer"
        style={{
          backgroundColor: i === currentSlide ? "#166534" : "#ccc",
        }}></div>
    ),
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <div className="relative mt-[1px]">
      <div className="slider-container overflow-hidden pb-5 max-md:pb-2">
        <Slider ref={sliderRef} {...settings}>
          {listBanner.map((item) => (
            <div className="w-full" key={item.id}>
              <Link to="/menu">
                <img
                  src={item.image}
                  className="w-full h-[520px] cursor-pointer max-lg:h-48 max-md:h-44 max-xl:h-56 object-cover"
                  alt="Banner 1"
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
