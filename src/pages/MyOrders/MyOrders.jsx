import React, { useEffect, useState } from "react";
import {
  FaCalendar,
  FaHeart,
  FaRegEdit,
  FaUser,
  FaTrashAlt,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { URL_API } from "../../constants/constants";
import Swal from "sweetalert2";
import axios from "axios";

const MyOrders = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(1);
  const handleStatusChange = (id) => {
    setSelectedStatus(id);
  };
  const filteredOrders = orders.filter((order) => {
    if (selectedStatus === 1) return true; // Hiển thị tất cả đơn hàng nếu "Tất cả đơn hàng" được chọn
    if (selectedStatus === 2) return order.status === "Chờ xác nhận";
    if (selectedStatus === 3) return order.status === "Đang xử lý";
    if (selectedStatus === 4) return order.status === "Đang vận chuyển";
    if (selectedStatus === 5) return order.status === "Giao thành công";
    if (selectedStatus === 6) return order.status === "Đã hủy";
    return false;
  });

  const profileMenuList = [
    { id: 1, name: "Tài khoản của tôi", icon: <FaUser />, link: "/profile" },
    {
      id: 2,
      name: "Sản phẩm yêu thích",
      icon: <FaHeart />,
      link: "/favorites",
    },
    {
      id: 3,
      name: "Đơn hàng của bạn",
      icon: <FaCalendar />,
      link: "/my-orders",
    },
    { id: 4, name: "Đăng xuất", icon: <FiLogOut />, link: "/logout" },
  ];

  const statusOrderlist = [
    { id: 1, name: "Tất cả đơn hàng" },
    { id: 2, name: "Chờ xác nhận" },
    { id: 3, name: "Đang xử lý" },
    { id: 4, name: "Đang vận chuyển" },
    { id: 5, name: "Giao thành công" },
    { id: 6, name: "Đã hủy" },
  ];

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser.user);
      fetchOrders(parsedUser.user._id);
    }
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get(`${URL_API}/orders/user/${userId}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
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
        }).then(async (result) => {
          if (result.isConfirmed) {
            await Swal.fire({
              title: "Deleted!",
              text: "Hủy đơn hàng thành công!",
              icon: "success",
            });

            // Gọi lại fetchOrders để tải lại danh sách đơn hàng
            fetchOrders(user._id);
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
    <div className="py-10">
      <div className="container">
        <div className="flex gap-6">
          <div className="max-w-[250px] w-full">
            {/* Thông tin tài khoản */}
            <div className="flex items-center gap-2">
              <img
                src={
                  user.image
                    ? `${URL_API}/images/${user.image}`
                    : "https://via.placeholder.com/50"
                }
                className="w-[50px] h-[50px] rounded-full"
                alt="Avatar"
              />
              <div>
                <h3 className="font-semibold leading-normal">{user.email}</h3>
                <p className="flex items-center gap-1 text-grayText">
                  <FaRegEdit />
                  Sửa hồ sơ
                </p>
              </div>
            </div>
            {/* Danh sách menu */}
            <ul className="flex flex-col gap-7 mt-10">
              {profileMenuList.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      isActive
                        ? "text-mainDark flex items-center gap-2 font-normal leading-normal"
                        : "flex items-center hover:text-mainDark gap-2 font-normal leading-normal"
                    }
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[90%]">
            <PageTitle
              title="Đơn hàng của tôi"
              className="text-mainDark mb-2"
            ></PageTitle>
            <div className="text-grayText leading-normal font-normal mb-5">
              Theo dõi thông tin đơn hàng của bạn
            </div>
            <div className="bg-[#f9f9f9] py-4 px-3">
              <div className="">
                <ul className="flex items-center justify-between gap-10">
                  {statusOrderlist.map((item) => (
                    <li key={item.id}>
                      <a
                        onClick={() => handleStatusChange(item.id)}
                        className={`${
                          selectedStatus === item.id ? "font-bold" : ""
                        } cursor-pointer`} 
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <table className="table">
              <thead className="text-[16px] font-semibold leading-normal text-black">
                <tr>
                  <th>#</th>
                  <th>Mã đơn hàng</th>
                  <th>Ngày lập</th>
                  <th>Địa chỉ</th>
                  <th>Số điện thoại</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Thanh toán</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="font-normal text-[16px]">
                {/* <tr>
                  <td>1</td>
                  <td>
                    <Link to="/order-detail">BOKTOPIA001</Link>
                  </td>
                  <td>23/08/2004</td>
                  <td>Quận 12, TP Hồ Chí Minh</td>
                  <td>0776 831 909</td>
                  <td>199000 đ</td>
                  <td>Chưa xác nhận</td>
                </tr> */}
                {filteredOrders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td> <Link to={`/order-detail/${order._id}`}>{order.orderId}</Link></td>
                    <td>{format(new Date(order.date), "dd/MM/yyyy")}</td>
                    <td>{order.address}</td>
                    <td>{order.phone}</td>
                    <td>{order.total} đ</td>
                    <td>{order.status}</td>
                    <td>{order.paymentStatus}</td>
                    <td>
                      <button onClick={() => handleDelete(order._id)}>
                        Hủy đơn
                      </button>
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

export default MyOrders;
