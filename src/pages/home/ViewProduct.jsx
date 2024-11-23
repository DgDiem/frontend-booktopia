import React from "react";
import Title from "../../components/Title/Title";
import ProductList from "../../components/Product/ProductList";

const ViewProduct = () => {
  return (
    <div className="py-5">
      <div className="container">
        <Title children="Nhiều lượt xem" />
        <div className="gap-8 py-5 max-lg:flex-col max-lg:gap-5 max-lg:py-5">
          {/* <div className="w-3/5 max-lg:w-full max-md:hidden">
            <img
              src="./images/bannerview.jpg"
              className="w-full h-[580px] object-cover rounded-2xl max-lg:h-[380px] max-lg:w-full"
              alt=""
            />
          </div> */}
          <div className="max-lg:w-full">
            <ProductList customColItem={true} type="view" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
