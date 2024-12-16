import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="py-10">
      <div className="container">
        <div className="term">
          <h1 className="text-[28px] text-black font-semibold mb-8 text-center">
            Chính sách vận chuyển
          </h1>
          <div className="flex flex-col gap-5">
            <p>
              Booktopia cam kết mang đến cho bạn trải nghiệm mua sắm trực tuyến thuận tiện và đáng
              tin cậy, bao gồm cả việc vận chuyển sản phẩm đến tận tay bạn một cách nhanh chóng và
              an toàn. Chính sách vận chuyển này giải thích các điều khoản và điều kiện liên quan
              đến việc vận chuyển sản phẩm bạn đã mua tại Booktopia.
            </p>
            <div className="flex flex-col gap-3">
              <h3>1. Khu vực vận chuyển</h3>
              <p>
                Booktopia hiện đang vận chuyển sản phẩm đến tất cả các tỉnh thành trên toàn quốc
                Việt Nam.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3>2. Đối tác vận chuyển</h3>
              <p>Để yêu cầu đổi trả sản phẩm, vui lòng làm theo các bước sau:</p>
              <ul className="flex flex-col gap-2 ml-10">
                <li className="list-disc">
                  Booktopia hợp tác với các đối tác vận chuyển uy tín như [Tên các đối tác vận
                  chuyển - ví dụ: Viettel Post, Giao hàng Nhanh, Giao hàng Tiết kiệm] để đảm bảo sản
                  phẩm của bạn được giao đến một cách an toàn và hiệu quả.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h3>3. Thời gian giao hàng</h3>
              <p>
                Thời gian giao hàng ước tính sẽ phụ thuộc vào địa chỉ nhận hàng của bạn và phương
                thức vận chuyển bạn đã chọn. Thông thường, thời gian giao hàng dự kiến là:
              </p>
              <ul className="flex flex-col gap-2 ml-10">
                <li className="list-disc">Nội thành Thành phố Hồ Chí Minh: 3 - 4 ngày làm việc.</li>
                <li className="list-disc">Các khu vực khác: 5 - 7 ngày làm việc.</li>
              </ul>
              <p>
                Lưu ý: Thời gian giao hàng trên chỉ là ước tính và có thể thay đổi do các yếu tố
                khách quan như điều kiện thời tiết, giao thông, hoặc các sự kiện bất khả kháng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
