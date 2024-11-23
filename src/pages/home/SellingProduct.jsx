import React from "react";
import Title from "../../components/Title/Title";
import ProductList from "../../components/Product/ProductList";

const SellingProduct = () => {
  return (
    <div className="py-5 max-md:py-2">
      <div className="container">
        <Title children="Bán chạy" />
        <div className="flex justify-between gap-10 py-5 max-lg:flex-col max-lg:py-5 max-lg:gap-5 max-xl:flex-col">
          <div className="w-3/5 max-lg:w-full max-xl:w-full">
            <ProductList customThreeItem={true} type="hot" />
          </div>
          <div className="w-2/5 max-lg:w-full max-md:hidden max-xl:w-full">
            <img
              src="./images/banner nhỏ.jpg"
              alt=""
              className="w-full h-full object-contain -mr-10 rounded-2xl max-lg:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellingProduct;
