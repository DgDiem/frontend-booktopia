import React from "react";

const SellProductAdminItem = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div>
            <img src="./images/product.png" className="w-24 h-25" alt="" />
          </div>
          <div className="">
            <h3 className="leading-normal">Cây cam ngọt của tôi</h3>
            <div className="text-sm leading-normal font-normal text-grayText">
              José Mauro de Vasconcelos
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p>599000đ</p>
          <div className="rounded-[10px] bg-[#D9D9D9] p-2 flex items-center justify-center">#1</div>
        </div>
      </div>
    </div>
  );
};

export default SellProductAdminItem;
