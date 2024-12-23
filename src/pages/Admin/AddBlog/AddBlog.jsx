import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaBook, FaClipboardList, FaRegEdit, FaUser, FaGift, FaCommentAlt } from "react-icons/fa";
import { MdLogout, MdInventory, MdOutlinePreview } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

import PageTitle from "../../../components/PageTitle/PageTitle";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import Button from "../../../components/Button/Button";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { URL_API } from "../../../constants/constants";
import { showSwalFireSuccess } from "../../../helpers/helpers";
import Cookies from "js-cookie";
const AddBlog = () => {
  const [selectedImage, setSelectedImage] = useState(null);
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

  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const fileURL = URL.createObjectURL(files[0]);
      setSelectedImage({
        file: files[0],
        preview: fileURL,
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("content", data.content);
      formData.append("date", data.date);
      formData.append("image", data.image[0]);
      const response = await axios.post(`${URL_API}/blog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showSwalFireSuccess("Thêm bài viết thành công");
      navigate("/admin/manage-blog");
    } catch (error) {
      console.error("Error creating blog:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Có lỗi xảy ra!",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };
  const handleCancel = () => {
    navigate("/admin/manage-blog");
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
            <SubMenu label="Quản lý sản phẩm" icon={<FaBook className="w-5 h-5" />}>
              <MenuItem component={<Link to="/admin/manage-product" />}>
                Danh sách sản phẩm
              </MenuItem>
              <MenuItem component={<Link to="/admin/manage-author" />}>Tác giả</MenuItem>
              <MenuItem component={<Link to="/admin/manage-publishes" />}>Nhà xuất bản</MenuItem>
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
            <PageTitle title="Thêm bài viết" className="text-mainDark" />
          </div>
          <div className="border rounded-[10px] py-8 px-5 mt-7">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="name">*Tên bài viết</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  id="name"
                  className="input input-bordered w-full"
                />
                {errors.name && <p className="text-red">Tên bài viết là bắt buộc</p>}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="date">*Ngày viết</label>
                <input
                  type="date"
                  {...register("date", { required: true })}
                  id="date" // Đổi id sang "date"
                  className="input input-bordered w-full"
                />
                {errors.date && <p className="text-red">Ngày viết là bắt buộc</p>}{" "}
                {/* Sửa lỗi cho trường date */}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="image">*Hình ảnh</label>
                {selectedImage?.preview && (
                  <img
                    src={selectedImage.preview}
                    alt="Preview"
                    className="mt-2 max-h-32 w-40 object-cover"
                  />
                )}
                <input
                  type="file"
                  {...register("image", { required: true })}
                  id="image"
                  className="file-input file-input-bordered w-full"
                  onChange={handleImageChange}
                />
                {errors.image && <p className="text-red">Hình ảnh là bắt buộc</p>}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="content">Nội dung</label>
                <textarea
                  {...register("content", { required: true })}
                  id="content"
                  className="input input-bordered w-full h-32"
                />
                {errors.content && <p className="text-red">Nội dung là bắt buộc</p>}
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

export default AddBlog;
