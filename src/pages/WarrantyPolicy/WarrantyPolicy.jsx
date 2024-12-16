import React from "react";

const WarrantyPolicy = () => {
  return (
    <div className="py-10">
      <div className="container">
        <div className="term">
          <h1 className="text-[28px] text-black font-semibold mb-8 text-center">
            Chính sách bảo hành
          </h1>
          <div className="flex flex-col gap-5">
            <p>
              Booktopia cam kết mang đến cho bạn những sản phẩm chất lượng tốt nhất. Chính sách bảo
              hành này giải thích quyền lợi của bạn khi mua sách và các sản phẩm khác tại Booktopia.
            </p>
            <div className="flex flex-col gap-3">
              <h3>1. Phạm vi bảo hành</h3>
              <p>Bạn có thể yêu cầu bảo hành trong các trường hợp sau:</p>
              <ul className="flex flex-col gap-2 ml-10">
                <li className="list-disc">
                  Sách: Booktopia bảo hành các lỗi in ấn, lỗi đóng gói của nhà xuất bản. Điều này
                  bao gồm các lỗi như trang in thiếu, trang in bị mờ, lỗi chính tả nghiêm trọng,
                  sách bị rách, bìa sách bị bong tróc trong quá trình vận chuyển.
                </li>
                <li className="list-disc">
                  Sản phẩm khác (nếu có): Vui lòng xem thông tin bảo hành cụ thể cho từng sản phẩm
                  trên trang web hoặc liên hệ với bộ phận Chăm sóc Khách hàng.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h3>2. Thời hạn bảo hành</h3>
              <p>Thời hạn bảo hành cho sách là 30 ngày kể từ ngày bạn nhận được sản phẩm.</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3>3. Điều kiện bảo hành</h3>
              <p>Để được hưởng chính sách bảo hành, sản phẩm phải đáp ứng các điều kiện sau:</p>
              <ul className="flex flex-col gap-2 ml-10">
                <li className="list-disc">Sản phẩm còn trong thời hạn bảo hành.</li>
                <li className="list-disc">Sản phẩm bị lỗi do nhà sản xuất.</li>
                <li className="list-disc">
                  Sản phẩm chưa qua sử dụng, sửa chữa hoặc thay đổi bởi bất kỳ bên thứ ba nào.
                </li>
                <li className="list-disc">
                  Bạn có thể cung cấp bằng chứng mua hàng hợp lệ (ví dụ: hóa đơn, số đơn hàng).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantyPolicy;
