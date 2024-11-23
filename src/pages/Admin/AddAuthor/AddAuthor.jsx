import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaBook, FaClipboardList, FaRegEdit, FaUser, FaGift } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

import Button from "../../../components/Button/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { URL_API } from "../../../constants/constants";
import { showSwalFireSuccess } from "../../../helpers/helpers";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import PageTitle from "../../../components/PageTitle/PageTitle";

const AddAuthor = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${URL_API}/authors`, data);

      // Tùy biến tiêu đề khi gọi hàm showSwalFireSuccess
      showSwalFireSuccess("Thêm tác giả thành công");

      navigate("/admin/manage-author");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div>
      <div className="flex min-h-screen border">
        <Sidebar
          className={`relative border p-3 bg-white ${collapsed ? "collapsed" : "expanded"}`}
          width={collapsed ? "0px" : "270px"}>
          <Menu className="bg-white">
            <div className="flex items-center justify-center mb-6">
              <img src="./images/logo.png" alt="Logo" />
            </div>
            <MenuItem component={<Link to="/admin/dashboard" />}>
              <div className="flex items-center gap-4">
                <AiFillDashboard className="w-5 h-5" />
                Dashboard
              </div>
            </MenuItem>

            <SubMenu label="Quản lý danh mục" icon={<AiOutlineBars className="w-5 h-5" />}>
              <MenuItem component={<Link to="/admin/manage-category" />}>
                Danh sách danh mục
              </MenuItem>
            </SubMenu>
            <SubMenu label="Quản lý sản phẩm" icon={<FaBook className="w-5 h-5" />}>
              <MenuItem component={<Link to="/admin/manage-product" />}>
                Danh sách sản phẩm
              </MenuItem>
              <MenuItem component={<Link to="/admin/manage-author" />}>Tác giả</MenuItem>
              <MenuItem component={<Link to="/admin/manage-publishes" />}>Nhà xuất bản</MenuItem>
            </SubMenu>
            <MenuItem component={<Link to="/admin/manage-order" />}>
              <div className="flex items-center gap-4">
                <FaClipboardList className="w-5 h-5" />
                Quản lý đơn hàng
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/admin/manage-user" />}>
              <div className="flex items-center gap-4">
                <FaUser />
                Quản lý tài khoản
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/admin/manage-voucher" />}>
              <div className="flex items-center gap-4">
                <FaGift />
                Quản lý voucher
              </div>
            </MenuItem>
            <SubMenu label="Quản lý bài viết" icon={<FaRegEdit className="w-5 h-5" />}>
              <MenuItem component={<Link to="/admin/manage-blog" />}>Danh sách bài viết</MenuItem>
            </SubMenu>
            <MenuItem component={<Link to="/admin/manage-contact" />}>
              <div className="flex items-center gap-4">
              <MdInventory />
                Quản lý liên hệ
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/admin/stock" />}>
              <div className="flex items-center gap-4">
                <MdMarkEmailRead />
                Quản lý tồn kho
              </div>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <div className="flex items-center gap-4">
                <MdLogout />
                Đăng xuất
              </div>
            </MenuItem>
          </Menu>
        </Sidebar>
        {/* Nút toggle nằm bên ngoài Sidebar */}
        <button onClick={() => setCollapsed(!collapsed)} className="toggle-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        </button>
        <div className="flex-1 p-6">
          <HeaderAdmin />
          <div className="flex items-center justify-between pb-8 border-b">
            <PageTitle title="Thêm tác giả" className="text-mainDark" />
          </div>
          <div className="border rounded-[10px] py-8 px-5 mt-7">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="name">*Tên tác giả</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  id="name"
                  className="input input-bordered w-full"
                />
                {errors.name && <span className="text-red">Product Name is required</span>}
              </div>

              <div className="flex items-center gap-3">
                <Button>Lưu</Button>
                <Button className="bg-secondary">Hủy</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAuthor;
