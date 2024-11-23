import React from "react";

const OrderItem = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-28 h-22 relative">
            <img src="./images/sach1 1.png" className="w-full h-full cursor-pointer" alt="" />
            <div className="absolute flex items-center justify-center -top-2 right-3 w-5 h-5 rounded-full bg-mainDark text-white">
              1
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-text leading-normal">Đám trẻ ở đại dương đen</h4>
            <div className="font-normal text-sm text-grayText leading-normal">Tiểu thuyết</div>
          </div>
        </div>
        <div className="text-text leading-normal font-normal">79.000đ</div>
      </div>
    </div>
  );
};

export default OrderItem;
