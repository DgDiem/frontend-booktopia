import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBook,
  FaClipboardList,
  FaRegEdit,
  FaTrashAlt,
  FaUser,
  FaUserClock,
  FaGift,
  FaCommentAlt,
} from "react-icons/fa";
import { MdLogout, MdOutlinePreview } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import PageTitle from "../../../components/PageTitle/PageTitle";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import axios from "axios";
import { MdInventory } from "react-icons/md";
import { URL_API } from "../../../constants/constants";
import { showSwalFireDelete } from "../../../helpers/helpers";
import { MdMarkEmailRead } from "react-icons/md";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
const ManageUser = () => {
  const isAdmin = true;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUsers] = useState({});
  // Lấy dữ liệu người dùng từ cookie
  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUsers(parsedUser.user);
    }
  }, []);

  // Đăng xuất xóa cookie người dùng
  const handleLogout = () => {
    // Xử lý logout, ví dụ xóa cookie và chuyển hướng người dùng
    Cookies.remove("user");
    setUsers(null);
    // Chuyển hướng hoặc cập nhật state để hiển thị UI phù hợp
    navigate("/sign-in");
    window.location.reload();
  };
  const [listUser, setUser] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${URL_API}/users`);
        const data = response.data;
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL_API}/users/${id}`);
      showSwalFireDelete("Xóa người dùng thành công");
    } catch (error) {
      console.log(error);
    }
  };
  // const [lstUser, setLstUser] = useState([]);
  const handleUpdateStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      const response = await axios.put(`${URL_API}/users/${id}/status`, {
        isActive: updatedStatus,
      });

      if (response.status === 200) {
        const updateUsers = listUser.map((item) =>
          item._id === id ? { ...item, isActive: updatedStatus } : item
        );
        setUser(updateUsers);

        // Hiển thị thông báo thành công bằng Swal
        Swal.fire({
          icon: "success",
          title: "Cập nhật trạng thái thành công!",
          text: `Tài khoản đã được ${updatedStatus ? "kích hoạt" : "ẩn"} thành công.`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Cập nhật trạng thái thất bại!",
          text: "Đã có lỗi xảy ra khi cập nhật trạng thái Tài khoản.",
        });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái Tài khoản", error);
      Swal.fire({
        icon: "error",
        title: "Cập nhật trạng thái thất bại!",
        text: "Đã có lỗi xảy ra khi cập nhật trạng thái.",
      });
    }
  };
  return (
    <div>
      <div className="flex min-h-screen border">
        {/* Sidebar */}
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
        {/* Main Content */}
        <div className="flex-1 p-6">
          <HeaderAdmin />
          <div className="flex items-center justify-between pb-8 border-b pt-3">
            <PageTitle title="Quản lý tài khoản" className="text-mainDark" />
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <table className="table w-full">
              <thead className="text-[16px] font-semibold text-black">
                <tr>
                  <th>#</th>
                  <th>Tên người dùng</th>
                  <th>Ngày sinh</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  <th>Số điện thoại</th>
                  <th>Trạng thái</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {listUser.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.date}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.phone}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(user._id, user.isActive)}
                          className="w-28 text-[12px] justify-items-center p-2 rounded-lg text-white cursor-pointer flex items-center justify-center gap-2"
                          style={{
                            backgroundColor: user.isActive ? "#166534" : "#ef4444",
                          }}>
                          {user.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <button>
                          <Link to={`/admin/purchase-history/${user._id}`}>
                            <FaUserClock className="w-5 h-4 text-mainDark" />
                          </Link>
                        </button>
                        {/* <button onClick={(e) => handleDelete(user._id)}>
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

export default ManageUser;
