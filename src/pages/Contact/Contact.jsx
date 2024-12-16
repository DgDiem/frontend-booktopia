import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập họ và tên"),
    email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    message: Yup.string().required("Vui lòng nhập lời nhắn"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/contact/api/contact", data);
      toast.success("Gửi tin nhắn thành công!");
      reset();
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <div className="py-8">
      <ToastContainer autoClose={3000} />
      <div className="container">
        <div className="flex justify-between mt-8 mb-8 gap-5 max-md:flex-col">
          <div className="max-w-[600px] w-full max-md:w-full mb-3">
            <img className="max-w-[420px] w-full" src="./images/removeg-bg-contact.png" alt="" />
          </div>
          <div className="w-full max-w-[600px]">
            <PageTitle title="Liên hệ" className="text-center mb-3"></PageTitle>
            {/* <h3 className="mb-4">Để lại lời nhắn cho chúng tôi</h3> */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="w-full">
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Họ và tên"
                  className="input input-bordered w-full rounded-[5px]"
                />
                <p className="text-red text-[14px] mt-1">{errors.name?.message}</p>
              </div>
              <div className="w-full">
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className="input input-bordered w-full rounded-[5px]"
                />
                <p className="text-red text-[14px] mt-1">{errors.email?.message}</p>
              </div>
              <div className="w-full">
                <textarea
                  {...register("message")}
                  className="textarea rounded-[5px] w-full textarea-bordered h-[120px]"
                  placeholder="Để lại lời nhắn cho chúng tôi"></textarea>
                <p className="text-red text-[14px] mt-1 ">{errors.message?.message}</p>
              </div>
              <div className="w-full">
                <Button className="rounded-[5px] w-full">Gửi</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
