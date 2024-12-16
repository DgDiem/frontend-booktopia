/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Cookies from "js-cookie";
import {
  FaBook,
  FaClipboardList,
  FaRegEdit,
  FaUser,
  FaImage,
  FaGift,
  FaCommentAlt,
} from "react-icons/fa";
import { MdLogout, MdOutlinePreview } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";

import PageTitle from "../../../components/PageTitle/PageTitle";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import { URL_API } from "../../../constants/constants";
import Button from "../../../components/Button/Button";

const DetailComment = () => {
  const navigate = useNavigate();
  const [comment, setComment] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const { id } = useParams();

  // Fetch the comment details when the component mounts
  useEffect(() => {
    const fetchCommentDetails = async () => {
      try {
        const response = await axios.get(`${URL_API}/comment/${id}`);
        setComment(response.data);
      } catch (error) {
        console.error("Error fetching comment details", error);
        Swal.fire("Error", "Lỗi.", "error");
      }
    };

    fetchCommentDetails();
  }, [id]);

  if (!comment) {
    return <div>Loading...</div>;
  }

  // Lấy dữ liệu người dùng từ cookie
  // useEffect(() => {
  //   const userData = Cookies.get("user");
  //   if (userData) {
  //     const parsedUser = JSON.parse(userData);
  //     setUser(parsedUser.user);
  //   }
  // }, []);

  // Đăng xuất xóa cookie người dùng
  const handleLogout = () => {
    // Xử lý logout, ví dụ xóa cookie và chuyển hướng người dùng
    Cookies.remove("user");
    setUser(null);
    // Chuyển hướng hoặc cập nhật state để hiển thị UI phù hợp
    navigate("/sign-in");
    window.location.reload();
  };
  return (
    <div>
      <div className="flex min-h-screen border">
        {/* Sidebar */}
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
        {/* Main Content */}
        <div className="flex-1 p-6">
          <HeaderAdmin />
          <div className="flex items-center justify-between pb-8 border-b pt-3">
            <PageTitle title={`Chi tiết bình luận`} className="text-mainDark" />
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <form action="" className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-12">
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">*Mã đơn hàng</label>
                  <input
                    type="text"
                    value={comment.commentId}
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">*Tên khách hàng</label>
                  <input
                    type="text"
                    value={comment.customerName}
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">Ngày lập</label>
                  <input
                    type="date"
                    value={comment.createdAt}
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label htmlFor="">*Nội dung</label>
                <input
                  type="text"
                  value={comment.content}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>
            </form>

            <h1
              className="text-mainDark"
              style={{
                margin: "20px 8px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Sản phẩm
            </h1>
            <table className="table w-full">
              <thead className="text-[16px] font-semibold text-black">
                <tr>
                  <th>#</th>
                  <th className="text-center flex items-center justify-center max-w-[150px]">
                    <FaImage className="w-6 h-6 " />
                  </th>
                  <th>Tên sách</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {/*comment.productDetails.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="flex items-center justify-center max-w-[150px]">
                      <img
                        src={`${URL_API}/images/${product.image}`}
                        className="w-full"
                        alt={product.name}
                      />
                    </td>
                    <td>
                      <div className="flex flex-col gap-3">
                        <div style={{ fontSize: "16px" }}>
                          <b>{product.name}</b>
                        </div>
                        <div>{`Tác giả: ${product.author}`}</div>
                        <div>{`Thể loại: ${product.category}`}</div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex" }}>
                        <del>{product.originalPrice}đ</del>
                        <div style={{ fontSize: "16px", marginLeft: "10px" }}>
                          {product.price}đ
                        </div>
                      </div>
                    </td>
                  </tr>
                )) */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailComment;
