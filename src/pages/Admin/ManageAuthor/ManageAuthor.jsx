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
  FaGift,
  FaCommentAlt,
} from "react-icons/fa";
import {
  MdLogout,
  MdOutlinePreview,
  MdMarkEmailRead,
  MdInventory,
} from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import PageTitle from "../../../components/PageTitle/PageTitle";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import axios from "axios";
import { URL_API } from "../../../constants/constants";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
const ManageAuthor = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [listAuthor, setListAuthor] = useState([]);
  const [user, setUser] = useState({});
  // Hàm lấy danh sách tác giả
  const fetchListAuthor = async () => {
    try {
      const response = await axios.get(`${URL_API}/authors`);
      setListAuthor(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  // Gọi API lấy danh sách khi component được mount
  useEffect(() => {
    fetchListAuthor();
  }, []);

  // Hàm xử lý xóa tác giả
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${URL_API}/authors/delete/${id}`);
      if (response.data.mess) {
        toast.error(response.data.mess); // Thông báo lỗi
      } else {
        toast.success("Xóa tác giả thành công!");
        fetchListAuthor(); // Làm mới danh sách
      }
    } catch (error) {
      console.error("Error deleting author:", error);
      toast.error("Xóa tác giả thất bại!");
    }
  };
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

  return (
    <div>
      <ToastContainer autoClose={3000} />
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
        {/* Toggle Button */}
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
          <div className="flex items-center justify-between pb-8 border-b">
            <PageTitle title="Danh sách tác giả" className="text-mainDark" />
            <Link to="/admin/add-author">
              <button className="flex items-center gap-2 bg-mainDark py-3 px-5 text-white font-semibold leading-normal rounded-[10px]">
                <FaPlus />
                Thêm
              </button>
            </Link>
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <table className="table w-full">
              <thead className="text-[16px] font-semibold text-black">
                <tr>
                  <th>#</th>
                  <th>Tên tác giả</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {listAuthor.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <FaTrashAlt
                          onClick={() => handleDelete(item._id)}
                          className="w-5 h-4 text-red cursor-pointer"
                        />
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

export default ManageAuthor;
