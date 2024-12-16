import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { URL_API } from "../../constants/constants";
import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
const SignInPage = () => {
  const navigate = useNavigate();
  const auth = getAuth(app); // Lấy auth từ Firebase
  const googleProvider = new GoogleAuthProvider(); // Khởi tạo provider Google
  // Định nghĩa schema validation
  const validationSchema = Yup.object({
    email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });

  // Khởi tạo react-hook-form với schema validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Hàm đăng nhập với Google
  const signUpWithGoogle = async () => {
    try {
      // Đặt 'prompt' thành 'select_account' để yêu cầu người dùng chọn tài khoản

      // Tiến hành đăng nhập với Google
      const googleProvider = new GoogleAuthProvider();

      googleProvider.setCustomParameters({
        prompt: "select_account",
      });
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user; // Lấy thông tin người dùng từ Firebase

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL || "./images/avatar.png", // Dùng ảnh mặc định nếu không có ảnh từ Google
        role: -2,
      };

      // Lưu thông tin người dùng vào cookie
      Cookies.set("user", JSON.stringify(userData), { expires: 1 });

      console.log("User logged in:", userData);
      toast.success("Đăng nhập với Google thành công");

      // Điều hướng đến trang chính hoặc trang admin (nếu có)
      setTimeout(() => {
        if (user.email === "admin@example.com") {
          navigate("/admin/dashboard"); // Điều hướng đến trang admin nếu là admin
        } else {
          window.location.href = "/"; // Điều hướng đến trang chính
        }
      }, 2000);
    } catch (error) {
      toast.error("Đăng nhập với Google thất bại: " + error.message);
    }
  };

  // Hàm xử lý submit
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${URL_API}/users/login`, data);
      if (res) {
        const userData = res.data;
        // Kiểm tra nếu user không có ảnh đại diện thì thêm một ảnh mặc định
        if (!userData.user.image) {
          userData.user.image = "./images/avatar.png"; // Đường dẫn tới ảnh mặc định
        }
        // Lưu thông tin user vào cookie
        Cookies.set("user", JSON.stringify(userData), {
          expires: 1,
        });

        toast.success("Đăng nhập thành công");
        setTimeout(() => {
          if (userData.user.role === 1) {
            navigate("/admin/dashboard");
          } else {
            window.location.href = "/";
          }
        }, 2000);
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        const errorData = error.response.data;
        if (errorData.message === "Email hoặc mật khẩu không đúng") {
          setError("email", { message: "Email hoặc mật khẩu không đúng" });
          toast.error("Email hoặc mật khẩu không đúng");
        } else {
          setError("general", {
            message: errorData.message || "Đăng nhập thất bại",
          });
          toast.error(errorData.message || "Đăng nhập thất bại");
        }
      } else {
        setError("general", { message: "Đăng nhập thất bại" });
        toast.error("Đăng nhập thất bại");
      }
    }
  };

  return (
    <div className="py-10">
      <ToastContainer autoClose={1000} />
      <div className="container">
        <div className="flex items-center justify-between gap-16">
          <div className="max-w-[650px] w-full max-md:hidden">
            <img src="./images/bannersach 1.png" className="w-full rounded-[30px]" alt="" />
          </div>
          <div className="w-full">
            <PageTitle title="Đăng nhập" className="text-center mb-6"></PageTitle>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full">
                <input
                  type="email"
                  placeholder="Nhập email"
                  className="input input-bordered w-full"
                  {...register("email")}
                />
                {errors.email && (
                  <div className="text-red mt-1 text-sm">{errors.email.message}</div>
                )}
              </div>
              <div className="w-full">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="input input-bordered w-full"
                  {...register("password")}
                />
                {errors.password && (
                  <div className="text-red mt-1 text-sm">{errors.password.message}</div>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  children="ĐĂNG NHẬP"
                  className="w-full"
                  disabled={isSubmitting}></Button>
                {errors.general && <p className="my-3 text-danger">{errors.general.message}</p>}
              </div>
              <div className="text-center">Hoặc đăng nhập bằng</div>
              <div className="flex items-center gap-5">
                <div
                  onClick={signUpWithGoogle}
                  className="bg-btnGoogle w-full rounded-[10px] py-3 px-10 text-white h-10 flex items-center gap-2 justify-center cursor-pointer">
                  <FaGooglePlusG className="w-5 h-5"></FaGooglePlusG>
                  Google
                </div>
              </div>
            </form>
            <div className="text-center mt-7 font-medium">
              Nếu bạn chưa có tài khoản, đăng ký{" "}
              <Link to="/sign-up" className="text-red">
                tại đây
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
