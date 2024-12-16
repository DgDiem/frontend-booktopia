import React from "react";
import { FaCreditCard, FaHeadphonesAlt, FaShippingFast } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";
const Service = () => {
  const serviceList = [
    {
      id: 1,
      icon: <FaShippingFast className="text-main w-12 h-12" />,
      serviceName: "Miễn phí vận chuyển",
      serviceContent: "Cho đơn từ 299K",
    },
    {
      id: 2,
      icon: <FaBoxOpen className="text-main w-12 h-12" />,
      serviceName: "Đổi hàng tận nhà",
      serviceContent: "Trong vòng 7 ngày",
    },
    {
      id: 3,
      icon: <FaCreditCard className="text-main w-12 h-12" />,
      serviceName: "Thanh toán COD",
      serviceContent: "Đa dạng hình thức thanh toán",
    },
    {
      id: 4,
      icon: <FaHeadphonesAlt className="text-main w-12 h-12" />,
      serviceName: "Tư vấn miễn phí",
      serviceContent: "Hỗ trợ tư vấn 24/7",
    },
  ];
  return (
    <div>
      <div className="py-10 border-t">
        <div className="container">
          <div className="grid grid-cols-4 gap-8 max-lg:grid-cols-2">
            {serviceList.map((item) => (
              <div
                className="flex items-center gap-3 max-lg:justify-center max-sm:flex-col max-sm:justify-center max-sm::items-center"
                key={item.id}
              >
                {item.icon}
                <div className="flex flex-col">
                  <div className="font-semibold leading-normal max-sm:text-center max-sm:text-sm">
                    {item.serviceName}
                  </div>
                  <div className="font-normal text-sm leading-normal text-grayText max-sm:text-center">
                    {item.serviceContent}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
