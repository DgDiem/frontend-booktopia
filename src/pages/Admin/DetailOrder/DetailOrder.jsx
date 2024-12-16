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

const DetailOrder = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [order, setOrder] = useState({ listProducts: [] });
  const [collapsed, setCollapsed] = useState(false);
  const statusOptions = [
    "Chờ xác nhận",
    "Đang xử lý",
    "Đang vận chuyển",
    "Giao thành công",
    "Đã hủy",
  ]; // Danh sách trạng thái

  const handleStatusChange = async (orderId, newStatus) => {
    const currentStatusIndex = statusOptions.indexOf(order.status);
    const newStatusIndex = statusOptions.indexOf(newStatus);

    // Kiểm tra nếu trạng thái được chọn không phải là trạng thái tiếp theo hợp lệ
    if (newStatusIndex !== currentStatusIndex + 1 && newStatus !== "Chờ xác nhận") {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Trạng thái bạn chọn không hợp lệ, vui lòng chọn trạng thái tiếp theo theo thứ tự.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    try {
      await axios.put(`${URL_API}/orders/${orderId}/status`, {
        status: newStatus,
      });

      // Cập nhật trạng thái trong state
      setOrder({ ...order, status: newStatus });

      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công!",
        text: `Trạng thái đơn hàng đã được cập nhật thành: ${newStatus}`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Cập nhật thất bại!",
        text: "Đã xảy ra lỗi khi cập nhật trạng thái.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${URL_API}/orders/${id}`);
        console.log(response.data);

        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error.response?.data || error.message);
      }
    };
    fetchOrderDetails();
  }, [id]);
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
            <PageTitle title={`Chi tiết đơn hàng [${order.orderId}]`} className="text-mainDark" />
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <form action="" className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-12">
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">*Mã đơn hàng</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={order.orderId || ""}
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">*Tên người mua</label>
                  <input
                    type="text"
                    placeholder="Trần Anh Toàn"
                    value={order.name || ""}
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">Ngày lập</label>
                  <input
                    type="date"
                    value={order.date?.split("T")[0] || ""}
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label htmlFor="">*Địa chỉ</label>
                <input
                  type="text"
                  placeholder="Q12, TPHCM"
                  value={order.address || ""}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>
              <div className="flex items-center justify-between gap-12">
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">Tổng đơn hàng</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={
                      order.total
                        ? Number(order.total).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        : ""
                    }
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>
                <div className="w-[48%] flex flex-col gap-2">
                  <label htmlFor="">Trạng thái</label>
                  <select
                    value={order.status || ""}
                    className="input input-bordered w-full"
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                    <option value="" disabled>
                      Chọn trạng thái
                    </option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-[48%] flex flex-col gap-2">
                  <label htmlFor="">Trạng thái thanh toán</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={order.paymentStatus || ""}
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>
              </div>
            </form>

            <h1
              className="text-mainDark"
              style={{
                margin: "20px 8px",
                fontSize: "20px",
                fontWeight: "bold",
              }}>
              Danh sách sản phẩm
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
                {order.listProducts.map((order, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td className="flex items-center justify-center max-w-[150px]">
                      <img src={`${URL_API}/images/${order.image1}`} className="w-full" alt="" />
                    </td>
                    <td>
                      <div className="flex flex-col  gap-3">
                        <div className="" style={{ fontSize: "16px" }}>
                          <b>
                            {order.name} x{order.quantity}
                          </b>
                        </div>
                        <div className="">Tác giả: {order.author.authorName}</div>
                        <div className="">Thể loại: {order.category.categoryName}</div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex" }}>
                        <del>
                          {order
                            ? Number(order.price1).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })
                            : ""}
                        </del>
                        <div style={{ fontSize: "16px", marginLeft: "10px" }}>
                          {order
                            ? Number(order.price2).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })
                            : ""}
                        </div>
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

export default DetailOrder;
