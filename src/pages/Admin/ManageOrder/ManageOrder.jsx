import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBook,
  FaClipboardList,
  FaEye,
  FaRegEdit,
  FaTrashAlt,
  FaUser,
  FaUserEdit,
  FaClock,
  FaCog,
  FaCheck,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaGift,
  FaCommentAlt,
} from "react-icons/fa";
import { MdLogout, MdOutlinePreview } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

import axios from "axios";
import Swal from "sweetalert2";
import { MdInventory } from "react-icons/md";
import PageTitle from "../../../components/PageTitle/PageTitle";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import { URL_API } from "../../../constants/constants";
import Cookies from "js-cookie";
const ManageOrder = () => {
  const navigate = useNavigate();
  const [listOrder, setOrder] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({});
  const statusOptions = [
    "Chờ xác nhận",
    "Đang xử lý",
    "Đang vận chuyển",
    "Giao thành công",
    "Đã hủy",
  ]; // Danh sách trạng thái
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
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${URL_API}/orders`);
        setOrder(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${URL_API}/orders/${orderId}/status`, {
        status: newStatus,
      });
      setOrder((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${URL_API}/orders/${id}`);

      if (response.status === 200) {
        Swal.fire({
          title: "Bạn có muốn xóa?",
          text: "Đã xóa không thể khôi phục",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Xóa",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Hủy đơn hàng thành công!",
              icon: "success",
            }).then(() => {
              setOrder((prevOrders) =>
                prevOrders.filter((order) => order._id !== id)
              );
            });
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Lỗi!",
        text:
          error.response?.data?.message || "Có lỗi xảy ra khi xóa đơn hàng.",
        icon: "error",
      });
    }
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
            <PageTitle title="Quản lý đơn hàng" className="text-mainDark" />
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <table className="table w-full">
              <thead className="text-[16px] font-semibold text-black">
                <tr>
                  <th>#</th>
                  <th>Mã đơn hàng</th>
                  <th>Ngày lập</th>
                  <th>Tên tài khoản</th>
                  <th>Địa chỉ</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {listOrder.map((order, index) => {
                  const dateObj = new Date(order.date);
                  const formattedDate = dateObj.toLocaleDateString("vi-VN"); // 'vi-VN' for dd/mm/yyyy format
                  return (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/admin/detail-order/${order._id}`}>
                          {order.orderId}
                        </Link>
                      </td>
                      <td>{formattedDate}</td>
                      <td>{order.name}</td>
                      <td>{order.address}</td>
                      <td>
                        {Number(order.total).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td>{order.status}</td>
                      <td>
                        <div className="flex items-center justify-center gap-3">
                          <button className="px-2 py-1 rounded text-white bg-blue-500">
                            <Link to={`/admin/detail-order/${order._id}`}>
                              <FaEye className="w-5 h-4 text-mainDark" />
                            </Link>
                          </button>
                          {order.status === "Chờ xác nhận" && (
                            <button
                              onClick={() =>
                                handleStatusChange(order._id, "Đang xử lý")
                              }
                              style={{
                                padding: "4px 8px",
                                borderRadius: "4px",
                                color: "white",
                                backgroundColor: "#1E40AF", // bg-blue-600
                                cursor: "pointer",
                              }}
                              onMouseOver={(e) =>
                                (e.target.style.backgroundColor = "#1D4ED8")
                              } // hover:bg-blue-700
                              onMouseOut={(e) =>
                                (e.target.style.backgroundColor = "#1E40AF")
                              }
                            >
                              <FaCheck
                                style={{
                                  display: "inline",
                                  width: "16px",
                                  height: "16px",
                                  marginRight: "4px",
                                }}
                              />
                            </button>
                          )}
                          {order.status === "Đang xử lý" && (
                            <button
                              onClick={() =>
                                handleStatusChange(order._id, "Đang vận chuyển")
                              }
                              style={{
                                padding: "4px 8px",
                                borderRadius: "4px",
                                color: "white",
                                backgroundColor: "#F59E0B", // bg-yellow-500
                                cursor: "pointer",
                              }}
                              onMouseOver={(e) =>
                                (e.target.style.backgroundColor = "#D97706")
                              } // hover:bg-yellow-600
                              onMouseOut={(e) =>
                                (e.target.style.backgroundColor = "#F59E0B")
                              }
                            >
                              <FaTruck
                                style={{
                                  display: "inline",
                                  width: "16px",
                                  height: "16px",
                                  marginRight: "4px",
                                }}
                              />
                            </button>
                          )}
                          {order.status === "Đang vận chuyển" && (
                            <button
                              onClick={() =>
                                handleStatusChange(order._id, "Giao thành công")
                              }
                              style={{
                                padding: "4px 8px",
                                borderRadius: "4px",
                                color: "white",
                                backgroundColor: "#10B981", // bg-green-600
                                cursor: "pointer",
                              }}
                              onMouseOver={(e) =>
                                (e.target.style.backgroundColor = "#059669")
                              } // hover:bg-green-700
                              onMouseOut={(e) =>
                                (e.target.style.backgroundColor = "#10B981")
                              }
                            >
                              <FaCheckCircle
                                style={{
                                  display: "inline",
                                  width: "16px",
                                  height: "16px",
                                  marginRight: "4px",
                                }}
                              />
                            </button>
                          )}
                          {order.status === "Giao thành công" && (
                            <button
                              onClick={() =>
                                handleStatusChange(order._id, "Đã hủy")
                              }
                              style={{
                                padding: "4px 8px",
                                borderRadius: "4px",
                                color: "white",
                                backgroundColor: "#EF4444", // bg-red-600
                                cursor: "pointer",
                              }}
                              onMouseOver={(e) =>
                                (e.target.style.backgroundColor = "#DC2626")
                              } // hover:bg-red-700
                              onMouseOut={(e) =>
                                (e.target.style.backgroundColor = "#EF4444")
                              }
                            >
                              <FaTimesCircle
                                style={{
                                  display: "inline",
                                  width: "16px",
                                  height: "16px",
                                  marginRight: "4px",
                                }}
                              />
                            </button>
                          )}
                          {order.status === "Đã hủy" && (
                            <button
                              style={{
                                padding: "4px 8px",
                                borderRadius: "4px",
                                color: "white",
                                backgroundColor: "#6B7280", // bg-gray-500
                                cursor: "not-allowed",
                              }}
                            >
                              <FaTimesCircle
                                style={{
                                  display: "inline",
                                  width: "16px",
                                  height: "16px",
                                  marginRight: "4px",
                                }}
                              />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(order._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            <FaTrashAlt className="w-5 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;
