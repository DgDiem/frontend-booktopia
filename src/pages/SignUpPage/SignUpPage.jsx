import React from "react";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL_API } from "../../constants/constants";

const SignUpPage = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    name: Yup.string()
      .min(2, "Họ và tên ít nhất 2 kí tự!")
      .required("Vui lòng nhập tên người dùng"),
    username: Yup.string()
      .min(2, "Tên người dùng ít nhất 2 kí tự!")
      .required("Vui lòng nhập tên người dùng"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số"
      )
      .required("Vui lòng nhập mật khẩu"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
      .required("Vui lòng nhập lại password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const userData = {
        ...data,
        role: 0,
        image:
          "https://images.unsplash.com/photo-1686170287433-c95faf6d3608?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1wYXJ0bmVy", // Đặt ảnh mặc định ở đây
      };
      const res = await axios.post(`${URL_API}/users/register`, userData);
      if (res) {
        toast.success("Đăng ký thành công");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorData = error.response.data;
        if (errorData.message === "Email đã tồn tại") {
          setError("email", { message: "Email đã tồn tại" });
          toast.error("Email đã tồn tại");
        } else {
          setError("general", { message: errorData.message || "Đăng ký thất bại" });
          toast.error(errorData.message || "Đăng ký thất bại");
        }
      } else {
        setError("general", { message: "Đăng ký thất bại" });
        toast.error("Đăng ký thất bại");
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
            <PageTitle title="Đăng Ký" className="text-center mb-6"></PageTitle>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="input input-bordered w-full"
                  {...register("name")}
                />
                {errors.name && <div className="text-red mt-1 text-sm">{errors.name.message}</div>}
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Tên tài khoản"
                  className="input input-bordered w-full"
                  {...register("username")}
                />
                {errors.username && (
                  <div className="text-red mt-1 text-sm">{errors.username.message}</div>
                )}
              </div>
              <div className="w-full">
                <input
                  type="email"
                  placeholder="Nhập email"
                  className="input rounded-[10px] input-bordered w-full"
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
              <div className="w-full">
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  className="input input-bordered w-full"
                  {...register("confirm_password")}
                />
                {errors.confirm_password && (
                  <div className="text-red mt-1 text-sm">{errors.confirm_password.message}</div>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  children="ĐĂNG KÝ"
                  className="w-full"
                  disabled={isSubmitting}></Button>
                {errors.general && (
                  <p className="text-red mt-1 text-sm">{errors.general.message}</p>
                )}
              </div>
              <div className="text-center">Hoặc đăng nhập bằng</div>
              <div className="flex items-center gap-5">
                <div className="bg-btnGoogle w-full rounded-[10px] py-3 px-10 text-white h-10 flex items-center gap-2 justify-center cursor-pointer">
                  <FaGooglePlusG className="w-5 h-5"></FaGooglePlusG>
                  Google
                </div>
              </div>
            </form>
            <div className="text-center mt-7 font-medium">
              Nếu bạn đã có tài khoản, đăng nhập {""}
              <Link to="/sign-in" className="text-red">
                tại đây
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
