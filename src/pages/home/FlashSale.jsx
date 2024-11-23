import React, { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import ProductList from "../../components/Product/ProductList";
import { Link } from "react-router-dom";

const FlashSale = () => {
  const [hours, setHours] = useState(10);
  const [minutes, setMinutes] = useState(24);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          if (minutes === 0 && hours === 0) {
            clearInterval(countdownInterval);
            return 0;
          }
          setMinutes((prevMinutes) => {
            if (prevMinutes === 0) {
              setHours((prevHours) => prevHours - 1);
              return 59;
            }
            return prevMinutes - 1;
          });
          return 59;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [minutes, hours]);

  return (
    <div className="py-5">
      <div className="bg-greenLight p-12 max-md:p-4">
        <div className="container">
          <div className="rounded-lg py-3 px-4 bg-white">
            <div className="flex items-center justify-between max-md:flex-col">
              <div className="flex items-center gap-4 max-md:gap-1 max-md:flex-col">
                <h2 className="text-textTitle text-main font-semibold leading-normal max-md:text-lg">
                  FLASH SALE
                </h2>
                <div className="flex items-center gap-5 max-md:flex-col max-md:gap-2 max-md:mb-3">
                  <span className="text-sm font-normal">Kết thúc trong</span>
                  <span className="countdown gap-1 text-2xl">
                    <span
                      className="rounded-lg bg-[#1F2937] text-white px-2"
                      style={{ "--value": hours }}></span>
                    :
                    <span
                      className="rounded-lg bg-[#1F2937] text-white px-2"
                      style={{ "--value": minutes }}></span>
                    :
                    <span
                      className="rounded-lg bg-[#1F2937] text-white px-2"
                      style={{ "--value": seconds }}></span>
                  </span>
                </div>
              </div>
              <Link to="/menu">
                <div className="text-main flex items-center gap-1">
                  Xem thêm <FaAngleRight />
                </div>
              </Link>
            </div>
          </div>
          <ProductList useSlider={true} />
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
