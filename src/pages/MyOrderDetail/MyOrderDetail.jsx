import React, { useDebugValue, useEffect, useState } from "react";
import {
  FaCalendar,
  FaHeart,
  FaImage,
  FaRegEdit,
  FaUser,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import axios from "axios";
import Cookies from "js-cookie";
import { URL_API } from "../../constants/constants";

const MyOrderDetail = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [order, setOrder] = useState({ listProducts: [] });
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

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser.user);
    }
  }, []);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${URL_API}/orders/${id}`);
        console.log(response.data);

        setOrder(response.data);
      } catch (error) {
        console.error(
          "Error fetching order details:",
          error.response?.data || error.message
        );
      }
    };
    fetchOrderDetails();
  }, [id]);

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
              title={`Chi tiết đơn hàng [${order.orderId}]`}
              className="text-mainDark mb-2"
            ></PageTitle>
            <div className="text-grayText leading-normal font-normal mb-5">
              Theo dõi thông tin đơn hàng của bạn
            </div>
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
                      <img
                        src={`${URL_API}/images/${order.image1}`}
                        className="w-full"
                        alt=""
                      />
                    </td>
                    <td>
                      <div className="flex flex-col  gap-3">
                        <div className="" style={{ fontSize: "16px" }}>
                          <b>
                            {order.name} x{order.quantity}
                          </b>
                        </div>
                        <div className="">
                          Tác giả: {order.author.authorName}
                        </div>
                        <div className="">
                          Thể loại: {order.category.categoryName}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex" }}>
                        <del>{order.price1}đ</del>
                        <div style={{ fontSize: "16px", marginLeft: "10px" }}>
                          {order.price2}đ
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-end mt-6 gap-5">
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Thành tiền: {order.total}đ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderDetail;
