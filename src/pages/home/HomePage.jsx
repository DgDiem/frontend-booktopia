import React from "react";
import Banner from "./Banner";
import NewProduct from "./NewProduct";
import SellingProduct from "./SellingProduct";
import ProductForYou from "./ProductForYou";
import Blog from "./Blog";
import Service from "./Service";
import FlashSale from "./FlashSale";
import ViewProduct from "./ViewProduct";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import Loading from "../../components/Loading/Loading";

const HomePage = () => {
  return (
    <div>
      <Loading />
      <Banner />
      <NewProduct />
      <FlashSale />
      <SellingProduct />
      <ViewProduct />
      <ProductForYou />
      <Blog />
      <Service />
      <ScrollToTopButton />
    </div>
  );
};

export default HomePage;
