import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { URL_API } from "../../constants/constants";
import { AuthContext } from "../../contexts/AuthProvider"; // Import AuthContext

const Profile = () => {
  const { user, logOut } = useContext(AuthContext); // Lấy thông tin người dùng và hàm logOut từ AuthContext
  const navigate = useNavigate();

  // Avatar mặc định nếu không có ảnh người dùng
  const defaultAvatar =
    "https://images.unsplash.com/photo-1686170287433-c95faf6d3608?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1wYXJ0bmVy";

  // Hàm lấy URL của ảnh đại diện
  const getAvatarUrl = (image) => {
    if (!image) return defaultAvatar;
    if (image.startsWith("http://") || image.startsWith("https://")) return image;
    return `${URL_API}/images/${image}`;
  };

  const handleLogout = () => {
    // Gọi phương thức logOut từ AuthContext để đăng xuất
    logOut();
    // Xóa cookie người dùng
    Cookies.remove("user");
    navigate("/sign-in"); // Chuyển hướng đến trang đăng nhập
    window.location.reload();
  };

  const closeSidebar = () => {
    // Đóng sidebar khi người dùng nhấp vào menu
    document.getElementById("my-drawer-4").checked = false;
  };

  // Kiểm tra cookie trước khi phân tích JSON
  const userCookie = Cookies.get("user");
  let parsedUser = null;

  if (userCookie) {
    try {
      parsedUser = JSON.parse(userCookie);
    } catch (error) {
      console.error("Lỗi khi phân tích cookie user:", error);
    }
  }

  // Lấy thông tin UID từ cookie hoặc AuthContext
  const userUid = parsedUser?.user?.uid || user?.uid;

  // Lấy ảnh người dùng từ cookie hoặc AuthContext
  const userImage = parsedUser?.user?.image || user?.photoURL || user?.image;

  return (
    <div className="drawer-end z-50">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Nút avatar để mở sidebar */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-circle btn-ghost avatar">
          <div className="w-20 rounded-full">
            {/* Hiển thị ảnh của người dùng (photoURL nếu có, nếu không thì dùng ảnh mặc định) */}
            <img
              alt="User avatar"
              src={getAvatarUrl(userImage)}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <Link to="/profile" onClick={closeSidebar}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/orders" onClick={closeSidebar}>
              Orders
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={closeSidebar}>
              Settings
            </Link>
          </li>
          {user?.role === "admin" && (
            <li>
              <Link to="/dashboard" onClick={closeSidebar}>
                Dashboard
              </Link>
            </li>
          )}
          <li>
            <a
              onClick={() => {
                handleLogout();
                closeSidebar();
              }}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
