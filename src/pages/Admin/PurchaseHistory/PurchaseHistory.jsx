import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { MdInventory } from "react-icons/md";
import {
  FaBook,
  FaClipboardList,
  FaRegEdit,
  FaTrashAlt,
  FaUser,
  FaUserClock,
  FaGift
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import PageTitle from "../../../components/PageTitle/PageTitle";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import Cookies from "js-cookie";
import axios from "axios";
import { URL_API } from "../../../constants/constants";
import { MdMarkEmailRead } from "react-icons/md";

const PurchaseHistory = () => {
  const isAdmin = true;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [orders, setOrders] = useState([]);

  const { id } = useParams();

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get(`${URL_API}/orders/user/${userId}`);
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrders(id); 
    }
  }, [id]);
  const handleLogout = () => {
    navigate("/");
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
              label="Quản lý danh mục"
              icon={<AiOutlineBars className="w-5 h-5" />}
            >
              <MenuItem component={<Link to="/admin/manage-category" />}>
                Danh sách danh mục
              </MenuItem>
            </SubMenu>
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
            <SubMenu
              label="Quản lý bài viết"
              icon={<FaRegEdit className="w-5 h-5" />}
            >
              <MenuItem component={<Link to="/admin/manage-blog" />}>
                Danh sách bài viết
              </MenuItem>
            </SubMenu>
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
            <PageTitle title="Lịch sử mua hàng" className="text-mainDark" />
          </div>
          {orders.map((order) => (
            <div key={order._id} className="mt-6 border rounded-lg p-5">
              <div className="flex items-center justify-between pb-3 border-b border-b-gray-300">
                <div>
                  <span>Mã đơn hàng: </span>
                  <span>{order.orderId}</span>
                </div>
                <div className="flex items-center">
                  <span className="pr-3">Ngày đặt: {new Date(order.date).toLocaleDateString()}</span>
                  <span className="text-mainDark border-l border-l-gray-300 pl-3 font-medium">{order.status}</span>
                </div>
              </div>
              {order.listProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-b-gray-300">
                  <div className="flex items-center">
                    <div className="max-w-[120px]">
                      <img className="w-full" src={`${URL_API}/images/${product.image1}`} alt={product.name} />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="font-normal">{product.name}</h3>
                      <div className="text-sm text-gray-400">{product.author.authorName}</div>
                      <span className="text-sm">x{product.quantity}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-400 line-through">{product.price1} đ</div>
                    <div className="text-lg text-red font-semibold">{product.price2} đ</div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end mt-4">
                <div className="flex items-center">
                  <span>Thành tiền: </span>
                  <div className="text-xl text-red font-semibold ml-3">{order.total} đ</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
