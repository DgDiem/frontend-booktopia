import React from "react";
import "./TermOfUse.css";
const TermsOfUse = () => {
  return (
    <div className="py-10">
      <div className="container">
        <div className="term">
          <h1 className="text-[28px] text-black font-semibold mb-8 text-center">
            Điều khoản sử dụng
          </h1>
          <div className="flex flex-col gap-5">
            <p>
              Chào mừng quý khách đến mua sắm tại Booktopia. Sau khi truy cập vào website Booktopia
              để tham khảo hoặc mua sắm, quý khách đã đồng ý tuân thủ và ràng buộc với những quy
              định của Booktopia. Vui lòng xem kỹ các quy định và hợp tác với chúng tôi để xây dựng
              một website Booktopia ngày càng thân thiện và phục vụ tốt những yêu cầu của chính quý
              khách.
            </p>
            <div className="flex flex-col gap-3">
              <h3>Tài khoản của khách hàng</h3>
              <p>
                Một số dịch vụ, tính năng tại đây yêu cầu quý khách cần phải đăng ký Tài khoản
                Booktopia thì mới có thể sử dụng. Do đó, để tận hưởng đầy đủ các dịch vụ và tính
                năng này, quý khách vui lòng cho phép Booktopia tiến hành xử lý các dữ liệu cá nhân
                cơ bản sau:
              </p>
              <ul className="flex flex-col gap-2 ml-10">
                <li className="list-disc">
                  Dữ liệu cá nhân cơ bản bắt buộc phải cung cấp, là các thông tin giúp xác định danh
                  tính đối với từng tài khoản Booktopia, bao gồm họ tên, địa chỉ email, số điện
                  thoại,... của quý khách.
                </li>
                <li className="list-disc">
                  Dữ liệu cá nhân cơ bản được cung cấp để phục vụ giao dịch, là các thông tin cần
                  thiết để thực hiện một giao dịch tại website, bao gồm địa chỉ giao hàng, địa chỉ
                  thanh toán, phương thức thanh toán,... của quý khách.
                </li>
                <li className="list-disc">
                  Dữ liệu cá nhân cơ bản tự nguyện cung cấp, là các thông tin mà quý khách có thể
                  chia sẻ (hoặc không) để cá nhân hóa trải nghiệm sử dụng dịch vụ tại Booktopia, bao
                  gồm ngày tháng năm sinh, giới tính, sở thích, nghề nghiệp,... của quý khách.
                </li>
              </ul>
              <p>
                Việc sử dụng và bảo mật thông tin Tài khoản Booktopia là trách nhiệm và quyền lợi
                của quý khách khi sử dụng dịch vụ tại Booktopia. Quý khách phải giữ kín mật khẩu và
                tài khoản, hoàn toàn chịu trách nhiệm đối với tất cả các hoạt động diễn ra thông qua
                việc sử dụng mật khẩu hoặc tài khoản của mình. Quý khách nên đảm bảo thoát khỏi Tài
                khoản Booktopia sau mỗi lần sử dụng để bảo mật dữ liệu cá nhân của mình.
              </p>
              <p>
                Trong trường hợp thông tin do quý khách cung cấp không đầy đủ hoặc có sai sót dẫn
                đến việc không thể giao hàng cho quý khách, chúng tôi có quyền đình chỉ hoặc từ chối
                phục vụ, giao hàng mà không phải chịu bất cứ trách nhiệm nào đối với quý khách. Khi
                có những thay đổi thông tin của quý khách, vui lòng cập nhật lại thông tin trong Tài
                khoản Booktopia.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3>Quyền lợi bảo mật dữ liệu cá nhân của khách hàng</h3>
              <p>
                Khi sử dụng dịch vụ tại website Booktopia, quý khách được đảm bảo rằng những thông
                tin cung cấp cho chúng tôi sẽ chỉ được dùng để nâng cao chất lượng dịch vụ dành cho
                khách hàng của Booktopia và sẽ không được chuyển giao cho một bên thứ ba nào khác vì
                mục đích thương mại.
              </p>
            </div>
            <div className="">
              <h3>Trách nhiệm của khách hàng khi sử dụng dịch vụ của Booktopia</h3>
              <p>
                Quý khách tuyệt đối không được sử dụng bất kỳ công cụ, phương pháp nào để can thiệp,
                xâm nhập bất hợp pháp vào hệ thống hay làm thay đổi cấu trúc dữ liệu tại website.
                Quý khách không được có những hành động (như thực hiện, cổ vũ,...) việc can thiệp,
                xâm nhập dữ liệu của Booktopia cũng như hệ thống máy chủ của chúng tôi.
              </p>
              <p>
                Quý khách không được đưa ra những nhận xét, đánh giá có ý xúc phạm, quấy rối, làm
                phiền hoặc có bất cứ hành vi nào thiếu văn hóa đối với người khác. Không nêu ra
                những nhận xét có tính chính trị (tuyên truyền, chống phá, xuyên tạc chính quyền),
                kỳ thị tôn giáo, giới tính, sắc tộc,... Tuyệt đối cấm mọi hành vi mạo nhận, cố ý tạo
                sự nhầm lẫn mình là một khách hàng khác hoặc là thành viên Ban Quản Trị Booktopia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
