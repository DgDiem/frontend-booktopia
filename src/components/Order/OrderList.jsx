import React from "react";
import OrderItem from "./OrderItem";

const OrderList = () => {
  return (
    <div className="pb-7">
      <div className="grid grid-rows-3 gap-5">
        <OrderItem></OrderItem>
        <OrderItem></OrderItem>
        <OrderItem></OrderItem>
      </div>
    </div>
  );
};

export default OrderList;
