import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import ProductItem from "./ProductItem";
import axios from "axios";
import { URL_API } from "../../constants/constants";

const ProductList = ({
  useSliderView,
  useSlider,
  customItem,
  customThreeItem,
  customColItem,
  type = "new",
  products = [],
}) => {
  const [productList, setProductList] = useState([]);
  const [AllProductList, setAllProductList] = useState([]);
  const [ProductListSale, setProductListSale] = useState([]);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await axios.get(`${URL_API}/products/${type}`);
        const data = response.data;
        setProductList(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllProductList = async () => {
      try {
        const response = await axios.get(`${URL_API}/products`);
        const data = response.data.Product;
        setAllProductList(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProductListSale = async () => {
      try {
        const response = await axios.get(`${URL_API}/products/sort/sale`);
        const data = response.data.ProductsSale;
        setProductListSale(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductList();
    fetchAllProductList();
    fetchProductListSale();
  }, []);

  const sliderRef = useRef(null);

  const SampleNextArrow = ({ onClick }) => (
    <div
      className="custom-arrow cursor-pointer flex items-center justify-center bg-white rounded-full border-2 border-gray-300 hover:bg-mainDark hover:text-white"
      style={{
        width: "50px",
        height: "50px",
        zIndex: "1",
        position: "absolute",
        top: "50%",
        right: "-30px",
        transform: "translateY(-50%)",
      }}
      onClick={onClick}>
      <FaAngleRight style={{ fontSize: "20px" }} />
    </div>
  );

  const SamplePrevArrow = ({ onClick }) => (
    <div
      className="custom-arrow cursor-pointer flex items-center justify-center bg-white rounded-full border-2 border-gray-300 hover:bg-mainDark hover:text-white"
      style={{
        width: "50px",
        height: "50px",
        zIndex: "1",
        position: "absolute",
        top: "50%",
        left: "-30px",
        transform: "translateY(-50%)",
      }}
      onClick={onClick}>
      <FaAngleLeft style={{ fontSize: "20px" }} />
    </div>
  );

  const settings = {
    // dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
    appendDots: (dots) => (
      <div>
        <ul className="custom-dots">{dots}</ul>
      </div>
    ),
    // customPaging: (i) => (
    //   <div
    //     className="w-3 h-3 rounded-full max-md:w-2 max-md:h-2"
    //     style={{
    //       backgroundColor:
    //         i === Math.floor(sliderRef.current?.innerSlider?.state.currentSlide / 5)
    //           ? "#166534"
    //           : "#ccc",
    //     }}></div>
    // ),
  };

  const customViewSetting = {
    // ...settings,
    slidesToShow: 3,
    dots: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="py-3 relative">
      {useSlider ? (
        <>
          <Slider ref={sliderRef} {...settings}>
            {ProductListSale.map((item) => (
              <ProductItem key={item._id} item={item} />
            ))}
          </Slider>
          <div className="absolute top-1/2 transform -translate-y-1/2 -right-8 max-md:hidden">
            <SampleNextArrow onClick={() => sliderRef.current.slickNext()} />
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 -left-8 max-md:hidden">
            <SamplePrevArrow onClick={() => sliderRef.current.slickPrev()} />
          </div>
        </>
      ) : customItem ? (
        <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
          {AllProductList.map((item) => (
            <ProductItem key={item._id} item={item} />
          ))}
        </div>
      ) : customThreeItem ? (
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2">
          {productList.slice(0, 3).map((item) => (
            <ProductItem key={item._id} item={item} />
          ))}
        </div>
      ) : customColItem ? (
        <Slider {...customViewSetting}>
          {productList.slice(0, 6).map((item, index) => (
            <div key={item._id} className="p-2">
              <ProductItem className="horizontal" item={item} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-5 max-lg:grid-cols-3 max-lg:gap-2 max-md:grid-cols-2">
          {productList.map((item) => (
            <ProductItem key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
