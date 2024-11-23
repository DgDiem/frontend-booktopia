// src/components/GoogleLoginButton/GoogleLoginButton.js
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";

const GoogleLoginButton = () => {
  // Hàm xử lý đăng nhập thành công
  const handleLoginSuccess = (response) => {
    console.log("Login Success:", response);
    const token = response.credential; // Token từ Google

    // Lưu token vào cookie
    Cookies.set("googleToken", token, { expires: 1 }); // Cookie sẽ hết hạn sau 1 ngày

    // Log token đã lưu vào cookie
    console.log("Token lưu vào cookie:", Cookies.get("googleToken"));

    // Bạn có thể điều hướng đến trang khác sau khi đăng nhập thành công
    // navigate("/dashboard");
  };

  // Hàm xử lý lỗi đăng nhập
  const handleLoginFailure = (response) => {
    console.log("Login Failure:", response);
    // Xử lý lỗi đăng nhập ở đây
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="bg-[#4285F4] hover:bg-[#357ae8] text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-3 w-full">
            <img src="/images/google-icon.svg" alt="Google" className="w-6 h-6" />
            <span className="text-lg">Đăng nhập với Google</span>
          </button>
        )}
      />
    </div>
  );
};

export default GoogleLoginButton;
