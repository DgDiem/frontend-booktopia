import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBook,
  FaClipboardList,
  FaPlus,
  FaRegEdit,
  FaTrashAlt,
  FaUser,
  FaUserEdit,
  FaGift,
  FaCommentAlt,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import { MdLogout, MdOutlinePreview } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import PageTitle from "../../../components/PageTitle/PageTitle";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import axios from "axios";
import { URL_API } from "../../../constants/constants";
import { showSwalFireDelete } from "../../../helpers/helpers";

import Cookies from "js-cookie";
import Swal from "sweetalert2";
const ManageBlog = () => {
  const [getBlog, setGetBlog] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${URL_API}/blog/admin`);
        setGetBlog(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, []);

  const isAdmin = true;
  const navigate = useNavigate();
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
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL_API}/blog/${id}`);
      showSwalFireDelete("Xóa bài viết thành công");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;

      // Gửi yêu cầu cập nhật trạng thái bài viết
      const response = await axios.put(`${URL_API}/blog/${id}/status`, {
        isActive: updatedStatus,
      });

      if (response.status === 200) {
        // Cập nhật trạng thái trong UI sau khi thành công
        const updatedBlogs = getBlog.map((item) =>
          item._id === id ? { ...item, isActive: updatedStatus } : item
        );
        setGetBlog(updatedBlogs);

        // Hiển thị thông báo thành công bằng Swal
        Swal.fire({
          icon: "success",
          title: "Cập nhật trạng thái thành công!",
          text: `Bài viết đã được ${updatedStatus ? "kích hoạt" : "ẩn"} thành công.`,
        });
      } else {
        // Nếu status không phải 200, hiển thị thông báo lỗi
        Swal.fire({
          icon: "error",
          title: "Cập nhật trạng thái thất bại!",
          text: "Đã có lỗi xảy ra khi cập nhật trạng thái bài viết.",
        });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái bài viết", error);
      Swal.fire({
        icon: "error",
        title: "Cập nhật trạng thái thất bại!",
        text: "Đã có lỗi xảy ra khi cập nhật trạng thái bài viết.",
      });
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
            <PageTitle title="Quản lý bài viết" className="text-mainDark" />
            <div>
              <Link to="/admin/add-blog">
                <button className="flex items-center gap-2 bg-mainDark py-3 px-5 text-white font-semibold leading-normal rounded-[10px]">
                  <FaPlus /> Thêm
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <table className="table w-full">
              <thead className="text-[16px] font-semibold text-black">
                <tr>
                  <th>#</th>
                  <th>Hình ảnh</th>
                  <th>Tên bài viết</th>
                  <th>Nội dung</th>
                  <th>Ngày viết</th>
                  <th className="text-center">Trạng thái</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {getBlog.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={`${URL_API}/images/${item.image}`} className="w-32 h-24" alt="" />
                    </td>
                    <td>{item.name}</td>
                    <td className="text-left">
                      <p className="max-w-[600px] w-full line-clamp-3 overflow-hidden text-ellipsis">
                        {item.content}
                      </p>
                    </td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(item._id, item.isActive)} // Thêm currentStatus
                          className="w-28 text-[12px] justify-items-center p-2 rounded-lg text-white cursor-pointer flex items-center justify-center gap-2"
                          style={{
                            backgroundColor: item.isActive ? "#166534" : "#ef4444", // Màu sắc thay đổi theo trạng thái
                          }}>
                          {item.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <Link to={`/admin/edit-blog/${item._id}`}>
                          <FaUserEdit className="w-5 h-5 text-main" />
                        </Link>
                        {/* <button onClick={() => handleDelete(item._id)}>
                          <FaTrashAlt className="w-5 h-4 text-red" />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBlog;
