import React, { useEffect, useState } from "react";
import {
  FaCalendar,
  FaHeart,
  FaRegEdit,
  FaRegTrashAlt,
  FaUser,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../redux/slices/favouritesSlide";
import { URL_API } from "../../constants/constants";
import Cookies from "js-cookie";
import axios from "axios";
const Favorite = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  // const [favorites, setFavorites] = useState([]);
  const favouriteItems = useSelector((state) => state.favourite?.items) || [];
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
    // Lấy dữ liệu người dùng từ cookie
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser.user);
    }
  }, []);

  // const userId = user._id;

  // useEffect(() => {
  //   const fetchFavorites = async () => {
  //     try {
  //       const response = await axios.get(`${URL_API}/favorites/${userId}`);
  //       console.log(response.data);

  //       setFavorites(response.data); 
  //     } catch (err) {
  //       console.error("Error fetching favorites:", err);
  //     } 
  //   };

  //   if (userId) { 
  //     fetchFavorites();
  //   }
  // }, [userId]);

  const handleRemoveItem = (itemId) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#166534",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, xóa nó!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(remove(itemId));
        Swal.fire({
          title: "Đã xóa!",
          text: "Sản phẩm đã được xóa khỏi yêu thích.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="py-10">
      <div className="container">
        <div className="flex gap-10 max-md:flex-col">
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
              title="Sản phẩm yêu thích"
              className="text-mainDark mb-2"
            />
            {/* <div className="text-grayText leading-normal font-normal mb-5 max-md:hidden">
              Sản phẩm yêu thích
            </div> */}
            {/* <div className="mb-6">
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>
                  Sắp xếp theo
                </option>
                <option>Han Solo</option>
                <option>Greedo</option>
              </select>
            </div> */}
            <table className="table max-md:w-full">
              <thead className="text-[16px] font-semibold leading-normal text-black">
                <tr>
                  <th>#</th>
                  <th>Hình ảnh</th>
                  <th>Tên sách</th>
                  <th className="max-md:hidden">Tác giả</th>
                  <th className="max-md:hidden">Danh mục</th>
                  <th className="max-md:hidden">Giá</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="font-normal text-sm">
                {favouriteItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`${URL_API}/images/${item.image1}`}
                        className="w-20 h-20 object-cover"
                        alt=""
                      />
                    </td>
                    <td className="max-md:text-sm">{item.name}</td>
                    <td className="max-w-[200px] max-md:hidden">
                      {item.author.authorName}
                    </td>
                    <td className="max-md:hidden">
                      {item.category.categoryName}
                    </td>
                    <td className="max-md:hidden">
                      {item.price2.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>
                      <div className="flex items-center justify-center cursor-pointer">
                        <FaRegTrashAlt
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-red text-center"
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

export default Favorite;
