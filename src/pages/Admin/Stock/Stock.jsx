import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBook,
  FaClipboardList,
  FaGift,
  FaMoneyBill,
  FaRegEdit,
  FaShoppingBag,
  FaTrashAlt,
  FaUser,
  FaUserEdit,
  FaUsers,
  FaPlus
} from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import { format } from "date-fns";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import PageTitle from "../../../components/PageTitle/PageTitle";

import axios from "axios";
import { URL_API } from "../../../constants/constants";
import Cookies from "js-cookie";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle } from "recharts";
import { PieChart, Pie } from "recharts";
import { MdMarkEmailRead } from "react-icons/md";

const Stock = () => {
    const isAdmin = true;
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const handleLogout = () => {
      // Perform logout operations here (e.g., clearing authentication tokens)
      // Then navigate to the home page
      navigate("/");
    };
    const [allProductList, setAllProductList] = useState([]);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await axios.get(`${URL_API}/products`);
        const data = response.data;
        setAllProductList(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        setAllProductList([]); // Đặt mảng rỗng trong trường hợp lỗi
      }
    };
    fetchProductList();
  }, []);
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

            <SubMenu label="Quản lý danh mục" icon={<AiOutlineBars className="w-5 h-5" />}>
              <MenuItem component={<Link to="/admin/manage-category" />}>
                Danh sách danh mục
              </MenuItem>
            </SubMenu>
            <SubMenu label="Quản lý sản phẩm" icon={<FaBook className="w-5 h-5" />}>
              <MenuItem component={<Link to="/admin/manage-product" />}>
                Danh sách sản phẩm
              </MenuItem>
              <MenuItem component={<Link to="/admin/manage-author" />}>Tác giả</MenuItem>
              <MenuItem component={<Link to="/admin/manage-publishes" />}>Nhà xuất bản</MenuItem>
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
            <SubMenu label="Quản lý bài viết" icon={<FaRegEdit className="w-5 h-5" />}>
              <MenuItem component={<Link to="/admin/manage-blog" />}>Danh sách bài viết</MenuItem>
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
          <div className="flex items-center justify-between pb-5 border-b">
            <PageTitle title="Danh sách tồn kho" className="text-mainDark" />
            
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <table className="table w-full">
              <thead className="text-[16px] font-semibold text-black">
                <tr>
                  <th>#</th>
                  <th>Hình ảnh</th>
                  <th>Tên sách</th>
                  <th>Tác giả</th>
                  <th>Danh mục</th>
                  <th>Nhà xuất bản</th>
                  <th className="text-center">Giá</th>
                  <th>Số lượng</th>
                
                </tr>
              </thead>
              <tbody>
                {allProductList.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`${URL_API}/images/${item.image1}`}
                        className="w-20 h-20"
                        alt={item.name}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.author?.authorName || "Chưa có"}</td>
                    <td>{item.category?.categoryName || "Chưa có"}</td>
                    <td>{item.publish?.publishName || "Chưa có"}</td>
                    <td>
                      <div className="flex items-center justify-center gap-4">
                        <div>
                          {item.price1.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </div>
                        <div className="text-red">
                          {item.price2?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }) || "chưa có"}
                        </div>
                      </div>
                    </td>
                    {item.quantity === 0 ? (
                    <td className="text-red px-3 text-center">Hết hàng</td>
                  ) : (
                 
                    <td className="px-3 text-center">{item.quantity}</td>
                  )}
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

export default Stock;
