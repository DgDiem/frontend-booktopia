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
  FaPlus,
  FaCommentAlt,
} from "react-icons/fa";
import { MdInventory, MdOutlinePreview } from "react-icons/md";
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
import ReactPaginate from "react-paginate"; // Import thư viện react-paginate

const Stock = () => {
  const isAdmin = true;
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
  const [allProductList, setAllProductList] = useState([]);
  const [currentItems, setCurrentItems] = useState([]); // Danh sách sản phẩm hiển thị trên trang hiện tại
  const [pageCount, setPageCount] = useState(0); // Tổng số trang
  const [itemOffset, setItemOffset] = useState(0); // Vị trí bắt đầu của danh sách sản phẩm trên trang hiện tại
  const itemsPerPage = 10; // Số lượng sản phẩm trên mỗi trang

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await axios.get(`${URL_API}/products`);
        const data = response.data;
        setAllProductList(data);
        // Phân trang sau khi lấy dữ liệu sản phẩm
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        console.log(error);
        setAllProductList([]); // Đặt mảng rỗng trong trường hợp lỗi
      }
    };
    fetchProductList();
  }, [itemOffset, itemsPerPage]);

  // Xử lý khi chuyển trang
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allProductList.length;
    setItemOffset(newOffset);
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
                {currentItems.map(
                  (
                    item,
                    index // Sử dụng currentItems để hiển thị
                  ) => (
                    <tr key={item._id}>
                      <td>{itemOffset + index + 1}</td> {/* Hiển thị số thứ tự chính xác */}
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
                  )
                )}
              </tbody>
            </table>
            {/* Phân trang */}
            <ReactPaginate
              breakLabel={<span className="px-3 py-2 leading-tight text-gray-500">...</span>} // Thêm style cho breakLabel
              nextLabel={"Sau"}
              onPageChange={handlePageClick}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel={"Trước"}
              renderOnZeroPageCount={null}
              containerClassName={"flex justify-center items-center"} // Thêm class Tailwind CSS
              pageClassName={
                "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              } // Thêm class cho từng nút trang
              previousLinkClassName={
                "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-l-lg"
              } // Thêm class cho nút "Trước"
              nextLinkClassName={
                "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg"
              } // Thêm class cho nút "Sau"
              activeClassName={
                "px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
              } // Thêm class cho nút trang hiện tại
              disabledClassName={"opacity-50 cursor-not-allowed"} // Thêm class cho nút bị vô hiệu hóa
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
