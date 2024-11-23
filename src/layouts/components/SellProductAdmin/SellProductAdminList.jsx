import React from "react";
import SellProductAdminItem from "./SellProductAdminItem";

const SellProductAdminList = () => {
  return (
    <div>
      <div className="grid grid-rows-3 gap-6">
        <SellProductAdminItem></SellProductAdminItem>
        <SellProductAdminItem></SellProductAdminItem>
        <SellProductAdminItem></SellProductAdminItem>
      </div>
    </div>
  );
};

export default SellProductAdminList;
