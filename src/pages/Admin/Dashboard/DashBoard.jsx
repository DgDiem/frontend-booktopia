import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBook,
  FaClipboardList,
  FaCommentAlt,
  FaGift,
  FaMoneyBill,
  FaRegEdit,
  FaShoppingBag,
  FaTrashAlt,
  FaUser,
  FaUserEdit,
  FaUsers,
} from "react-icons/fa";
import { MdLogout, MdOutlinePreview } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import "./DashBoard.css";
import { format } from "date-fns";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { MdInventory } from "react-icons/md";
import axios from "axios";
import { URL_API } from "../../../constants/constants";
import Cookies from "js-cookie";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle } from "recharts";
import { PieChart, Pie } from "recharts";
import { MdMarkEmailRead } from "react-icons/md";

const DashBoard = () => {
  const isAdmin = true;
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({});
  const [totalUser, setTotalUser] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(1);
  const handleStatusChange = (id) => {
    setSelectedStatus(id);
  };
  const [productHot, setProductHot] = useState([]);
  const [productView, setProductView] = useState([]);
  useEffect(() => {
    const fetchProductHot = async () => {
      try {
        const response = await axios.get(`${URL_API}/products/hot`);
        const data = response.data;
        setProductHot(data);
      } catch (error) {
        console.log(error);
        setProductHot([]);
      }
    };
    fetchProductHot();
  }, []);
  useEffect(() => {
    const fetchProductView = async () => {
      try {
        const response = await axios.get(`${URL_API}/products/view`);
        const data = response.data;
        setProductView(data);
      } catch (error) {
        console.log(error);
        setProductView([]);
      }
    };
    fetchProductView();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL_API}/products/${id}`);
      showSwalFireDelete();
    } catch (error) {
      console.log(error);
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
    const getInfoDashboard = async () => {
      try {
        const [getTotalUser, getTotalOrder] = await axios.all([
          axios.get(`${URL_API}/users`),
          axios.get(`${URL_API}/orders`),
        ]);
        setTotalUser(getTotalUser.data.length);
        setTotalOrder(getTotalOrder.data.length);

        const totalValue = getTotalOrder.data.reduce((acc, order) => {
          if (order.status === "Giao thành công") {
            return acc + (parseFloat(order.total) || 0);
          }
          return acc;
        }, 0);
        setTotalRevenue(totalValue);
      } catch (error) {
        console.log(error);
      }
    };
    getInfoDashboard();
  }, []);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const data02 = [
    { name: "A1", value: 100 },
    { name: "A2", value: 300 },
    { name: "B1", value: 100 },
    { name: "B2", value: 80 },
    { name: "B3", value: 40 },
    { name: "B4", value: 30 },
    { name: "B5", value: 50 },
    { name: "C1", value: 100 },
    { name: "C2", value: 200 },
    { name: "D1", value: 150 },
    { name: "D2", value: 50 },
  ];
  const filteredOrders = orders.filter((order) => {
    if (selectedStatus === 1) return true; // Hiển thị tất cả đơn hàng nếu "Tất cả đơn hàng" được chọn
    if (selectedStatus === 2) return order.status === "Chờ xác nhận";
    if (selectedStatus === 3) return order.status === "Đang xử lý";
    if (selectedStatus === 4) return order.status === "Đang vận chuyển";
    if (selectedStatus === 5) return order.status === "Giao thành công";
    if (selectedStatus === 6) return order.status === "Đã hủy";
    return false;
  });

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
      const response = await axios.get(`${URL_API}/orders/pending`);
      setOrders(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
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
          <PageTitle title="Dashboard" />
          {/* Content goes here */}
          <div className="grid grid-cols-3 gap-7 mt-5">
            <div className="bg-white p-4 border rounded-lg shadow py-5 px-6">
              <div className="flex items-center justify-between">
                <div className="">
                  <PageTitle title={totalRevenue.toLocaleString()} />
                  {/* Tổng doanh thu của các đơn hàng */}
                  {/* Đơn hàng: Thống kê số lượng đơn hàng đã hoàn thành và đơn hàng đang chờ xử lý. */}
                  <div className="">Doanh thu</div>
                </div>
                <div className="w-10 h-10 rounded-md border flex items-center justify-center text-mainDark">
                  <FaMoneyBill className="w-7 h-7" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow py-5 px-6">
              <div className="flex items-center justify-between">
                <div className="">
                  <PageTitle title={totalOrder} />
                  <div className="">Đơn hàng</div>
                </div>
                <div className="w-10 h-10 rounded-md border flex items-center justify-center text-mainDark">
                  <FaUsers className="w-7 h-7" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow py-5 px-6">
              <div className="flex items-center justify-between">
                <div className="">
                  <PageTitle title={totalUser} />
                  <div className="">Người dùng</div>
                </div>
                <div className="w-10 h-10 rounded-md border flex items-center justify-center text-mainDark">
                  <FaUsers className="w-7 h-7" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            {/* <div className="flex justify-between gap-7">
              <div className="w-[55%]">
                <div className="flex flex-col gap-5">
                  <div className="w-full">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1681825268400-c561bd47d586?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D"
                      className="rounded-[10px] w-full h-[223px]"
                      alt="Book"
                    />
                  </div>
                  <div className="w-full">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1681825268400-c561bd47d586?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D"
                      className="rounded-[10px] w-full h-[223px]"
                      alt="Book"
                    />
                  </div>
                </div>
              </div>
              <div className="w-[45%]">
                <div className="rounded-[10px] border py-6 px-5">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-10 h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                      <FaShoppingBag />
                    </div>
                    <h3 className="leading-normal font-semibold text-black">Sản phẩm bán chạy</h3>
                  </div>
                  <SellProductAdminList />
                </div>
              </div>
            </div> */}
            {/* <div className="flex items-center justify-between gap-6">
              <div className="w-2/4">
                <BarChart
                  className="w-full"
                  width={600}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="uv"
                    fill="#B3CDAD"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <BarChart
                    dataKey="pv"
                    fill="#FF5F5E"
                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                  />
                </BarChart>
              </div>
              <div className="w-2/4">
                <PieChart width={400} height={400}>
                  <Pie
                    data={data01}
                    dataKey="value"
                    cx={200}
                    cy={200}
                    outerRadius={60}
                    fill="#8884d8"
                  />
                  <Pie
                    data={data02}
                    dataKey="value"
                    cx={200}
                    cy={200}
                    innerRadius={70}
                    outerRadius={90}
                    fill="#82ca9d"
                    label
                  />
                </PieChart>
              </div>
            </div> */}
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <h3 className="text-lg font-semibold">Đơn hàng mới</h3>
            <table className="table">
              <thead className="text-[16px] font-semibold text-black">
                <tr>
                  <th>#</th>
                  <th>Mã đơn hàng</th>
                  <th>Ngày lập</th>
                  <th>Người mua</th>
                  <th>Địa chỉ</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  {/* <th className="text-center">Thao tác</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/admin/detail-order/${order._id}`}>{order.orderId}</Link>
                    </td>
                    <td>{format(new Date(order.date), "dd/MM/yyyy")}</td>
                    <td>{order.name}</td>
                    <td>{order.address}</td>
                    <td>
                      {Number(order.total).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                    </td>
                    <td>{order.status}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <h3 className="text-lg font-semibold">Sản phẩm bán chạy</h3>
            <table className="table">
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
                  {/* <th className="text-center">Thao tác</th> */}
                </tr>
              </thead>
              <tbody>
                {productHot.map((item, index) => (
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
                    <td className="px-3 text-center">{item.quantity}</td>
                    {/* <td>
                      <div className="flex items-center justify-center gap-3">
                        <Link to={`/admin/edit-product/${item._id}`}>
                          <FaUserEdit className="w-5 h-5 text-main" />
                        </Link>
                        <button onClick={(e) => handleDelete(item._id)}>
                          <FaTrashAlt className="w-5 h-4 text-red" />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <h3 className="text-lg font-semibold">Sản phẩm nhiều lượt xem</h3>
            <table className="table">
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
                  {/* <th className="text-center">Thao tác</th> */}
                </tr>
              </thead>
              <tbody>
                {productView.map((item, index) => (
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
                    <td className="px-3 text-center">{item.quantity}</td>
                    {/* <td>
                      <div className="flex items-center justify-center gap-3">
                        <Link to={`/admin/edit-product/${item._id}`}>
                          <FaUserEdit className="w-5 h-5 text-main" />
                        </Link>
                        <button onClick={(e) => handleDelete(item._id)}>
                          <FaTrashAlt className="w-5 h-4 text-red" />
                        </button>
                      </div>
                    </td> */}
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

export default DashBoard;
