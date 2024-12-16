import React from "react";
import "./PaymentPolicy.css";
const PaymentPolicy = () => {
  return (
    <div className="py-10">
      <div className="container">
        <div className="term">
          <h1 className="text-[28px] text-black font-semibold mb-8 text-center">
            Chính sách bảo mật thanh toán
          </h1>
          <div className="flex flex-col gap-5">
            <p>
              Tại Booktopia, chúng tôi cam kết bảo vệ thông tin thanh toán và quyền riêng tư của
              bạn. Chính sách bảo mật thanh toán này giải thích cách chúng tôi thu thập, sử dụng,
              tiết lộ và bảo vệ thông tin tài chính của bạn khi bạn thực hiện mua hàng trên trang
              web Booktopia.
            </p>
            <div className="flex flex-col gap-3">
              <h3>1. Cách chúng tôi sử dụng thông tin thanh toán của bạn</h3>
              <p>Chúng tôi sử dụng thông tin thanh toán của bạn cho các mục đích sau:</p>
              <ul className="flex flex-col gap-2 ml-10">
                <li className="list-disc">
                  Xử lý thanh toán: Xác minh thông tin thanh toán, xử lý giao dịch mua hàng và hoàn
                  tiền.
                </li>
                <li className="list-disc">
                  Dữ liệu cá nhân cơ bản được cung cấp để phục vụ giao dịch, là các thông tin cần
                  thiết để thực hiện một giao dịch tại website, bao gồm địa chỉ giao hàng, địa chỉ
                  thanh toán, phương thức thanh toán,... của quý khách.
                </li>
                <li className="list-disc">
                  Phòng chống gian lận: Phát hiện và ngăn chặn các hoạt động gian lận và lạm dụng.
                </li>
                <li className="list-disc">
                  Tuân thủ pháp luật: Tuân thủ các yêu cầu pháp lý và quy định hiện hành.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h3>2. Lưu trữ thông tin thanh toán của bạn</h3>
              <p>
                Chúng tôi lưu trữ thông tin thanh toán của bạn trong thời gian cần thiết để hoàn
                thành giao dịch mua hàng và tuân thủ các yêu cầu pháp lý. Sau đó, chúng tôi sẽ xóa
                hoặc ẩn danh hóa thông tin thanh toán của bạn.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3>3. Lựa chọn thanh toán</h3>
              <p>Chúng tôi cung cấp nhiều lựa chọn thanh toán an toàn, bao gồm:</p>
              <ul className="flex flex-col gap-2 ml-10">
                <li className="list-disc">Thanh toán khi nhận hàng</li>
                <li className="list-disc">Paypal</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPolicy;
