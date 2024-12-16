import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBook,
  FaClipboardList,
  FaRegEdit,
  FaUser,
  FaGift,
  FaCommentAlt,
} from "react-icons/fa";
import { MdInventory, MdLogout, MdOutlinePreview } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

import Button from "../../../components/Button/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { URL_API } from "../../../constants/constants";
import { showSwalFireSuccess } from "../../../helpers/helpers";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Cookies from "js-cookie";
const AddAuthor = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({});
  // Lấy dữ liệu người dùng từ cookie
  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser.user);
    }
  }, []);

  // Đăng xuất xóa cookie người dùng
  const handleLogout = () => {
    // Xử lý logout, ví dụ xóa cookie và chuyển hướng người dùng
    Cookies.remove("user");
    setUser(null);
    // Chuyển hướng hoặc cập nhật state để hiển thị UI phù hợp
    navigate("/sign-in");
    window.location.reload();
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
  const handleCancel = () => {
    navigate("/admin/manage-author");
  };
  return (
    <div>
      <div className="flex min-h-screen border">
        <Sidebar
          className={`relative border p-3 bg-white ${
            collapsed ? "collapsed" : "expanded"
          }`}
          width={collapsed ? "0px" : "270px"}
        >
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
        <SubMenu
          label="Quản lý sản phẩm"
          icon={<FaBook className="w-5 h-5" />}
        >
          <MenuItem component={<Link to="/admin/manage-product" />}>
            Danh sách sản phẩm
          </MenuItem>
          <MenuItem component={<Link to="/admin/manage-author" />}>
            Tác giả
          </MenuItem>
          <MenuItem component={<Link to="/admin/manage-publishes" />}>
            Nhà xuất bản
          </MenuItem>
        </SubMenu>
        <MenuItem component={<Link to="/admin/manage-category" />}>
          <div className="flex items-center gap-4">
          <AiOutlineBars className="w-5 h-5" />
            Quản lý danh mục
          </div>
        </MenuItem>
        
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
        <MenuItem component={<Link to="/admin/manage-blog" />}>
          <div className="flex items-center gap-4">
          <FaRegEdit className="w-5 h-5" />
            Quản lý bài viết
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/admin/manage-contact" />}>
          <div className="flex items-center gap-4">
            <MdMarkEmailRead />
            Quản lý liên hệ
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/admin/stock" />}>
          <div className="flex items-center gap-4">
            <MdInventory />
            Quản lý tồn kho
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/admin/manage-comment" />}>
          <div className="flex items-center gap-4">
            <FaCommentAlt />
            Quản lý bình luận
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/admin/manage-review" />}>
          <div className="flex items-center gap-4">
            <MdOutlinePreview />
            Quản lý đánh giá
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
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="toggle-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="name">*Tên tác giả</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  id="name"
                  className="input input-bordered w-full"
                />
                {errors.name && (
                  <span className="text-red">Tác giả là bắt buộc</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Button>Lưu</Button>
                <Button className="bg-secondary" onClick={handleCancel}>
                  Hủy
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAuthor;
