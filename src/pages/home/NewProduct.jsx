import React from "react";
import Title from "../../components/Title/Title";
import ProductList from "../../components/Product/ProductList";

const NewProduct = () => {
  return (
    <div className="py-5 max-lg:py-5">
      <div className="container">
        <Title children="Sản phẩm mới" />
        <ProductList />
      </div>
    </div>
  );
};

export default NewProduct;
