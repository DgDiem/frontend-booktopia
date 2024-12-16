import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="py-10">
      <div className="container">
        <div className="term">
          <h1 className="text-[28px] text-black font-semibold mb-8 text-center">
            Chính sách đổi trả
          </h1>
          <div className="flex flex-col gap-5">
            <p>
              Tại Booktopia, chúng tôi mong muốn bạn hoàn toàn hài lòng với trải nghiệm mua sắm của
              mình. Chính sách đổi trả này giải thích các điều khoản và điều kiện để đổi hoặc trả
              sản phẩm đã mua tại Booktopia.
            </p>
            <div className="flex flex-col gap-3">
              <h3>1. Điều kiện đổi trả</h3>
              <p>Bạn có thể yêu cầu đổi hoặc trả sản phẩm trong các trường hợp sau:</p>
              <ul className="flex flex-col gap-2 ml-10">
                <li className="list-disc">
                  Sản phẩm bị lỗi: Sản phẩm bị lỗi do nhà sản xuất, bao gồm lỗi in ấn, lỗi đóng gói,
                  hoặc hư hỏng trong quá trình vận chuyển.
                </li>
                <li className="list-disc">
                  Sản phẩm không đúng mô tả: Sản phẩm nhận được không đúng với mô tả trên trang web,
                  bao gồm sai tên sách, sai tác giả, sai phiên bản.
                </li>
                <li className="list-disc">
                  Sản phẩm bị giao nhầm: Sản phẩm nhận được không phải là sản phẩm bạn đã đặt hàng.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h3>2. Quy trình đổi trả</h3>
              <p>Để yêu cầu đổi trả sản phẩm, vui lòng làm theo các bước sau:</p>
              <ul className="flex flex-col gap-2 ml-10">
                <li className="list-disc">
                  Liên hệ với bộ phận Chăm sóc Khách hàng: Trong vòng 2 ngày kể từ ngày nhận sản
                  phẩm, vui lòng liên hệ với bộ phận Chăm sóc Khách hàng của Booktopia qua email
                  hoặc số điện thoại để thông báo về yêu cầu đổi trả.
                </li>
                <li className="list-disc">
                  Cung cấp thông tin: Vui lòng cung cấp thông tin về đơn hàng, bao gồm số đơn hàng,
                  tên sản phẩm, lý do đổi trả và hình ảnh (nếu có) để minh họa cho vấn đề.
                </li>
                <li className="list-disc">
                  Nhận hướng dẫn: Bộ phận Chăm sóc Khách hàng sẽ xem xét yêu cầu của bạn và cung cấp
                  hướng dẫn cụ thể về cách thức đổi trả sản phẩm.
                </li>
                <li className="list-disc">
                  Đóng gói sản phẩm: Vui lòng đóng gói sản phẩm cẩn thận trong bao bì gốc (nếu có
                  thể) để tránh hư hỏng trong quá trình vận chuyển.
                </li>
                <li className="list-disc">
                  Gửi trả sản phẩm: Gửi trả sản phẩm theo địa chỉ được cung cấp bởi bộ phận Chăm sóc
                  Khách hàng.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h3>3. Chi phí vận chuyển</h3>
              <p>Để được hưởng chính sách bảo hành, sản phẩm phải đáp ứng các điều kiện sau:</p>
              <ul className="flex flex-col gap-2 ml-10">
                <li className="list-disc">
                  Đối với sản phẩm bị lỗi hoặc giao nhầm: Booktopia sẽ chịu chi phí vận chuyển cho
                  việc gửi trả và gửi lại sản phẩm.
                </li>
                <li className="list-disc">
                  Đối với sản phẩm không đúng mô tả: Booktopia sẽ chịu chi phí vận chuyển cho việc
                  gửi trả sản phẩm. Tuy nhiên, bạn sẽ chịu chi phí vận chuyển cho việc gửi lại sản
                  phẩm (nếu có).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
