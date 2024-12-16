import React, { useEffect, useState, useCallback } from "react";
import { FaRegEdit, FaUser, FaHeart, FaCalendar } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";
import { URL_API } from "../../constants/constants";
import { showSwalFireSuccess } from "../../helpers/helpers";

const Profile = () => {
  const handleLogout = () => {
    // Xử lý logout, ví dụ xóa cookie và chuyển hướng người dùng
    Cookies.remove("user");
    setUser(null);
    navigate("/sign-in");
    window.location.reload();
  };

  const defaultAvatar =
    "https://images.unsplash.com/photo-1686170287433-c95faf6d3608?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1wYXJ0bmVy";

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
    { id: 4, name: "Đăng xuất", icon: <FiLogOut />, action: handleLogout },
  ];

  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);

  const userCookie = JSON.parse(Cookies.get("user"));
  const userUid = userCookie?.uid; // UID từ Firebase (nếu có)
  const userId = userCookie?.user?._id; // ID của hệ thống (nếu có)

  console.log("userUid:", userUid);
  console.log("userId:", userId);

  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, getValues } = useForm({
    defaultValues: {
      phone: "",
      address: "",
      email: "",
      name: "",
      username: "",
      date: "",
    },
  });

  // Xử lý khi người dùng chọn hình ảnh mới
  const handleImgChange = useCallback((e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setSelectedImage({
        file: files[0],
        preview: imageUrl,
      });
    }
  }, []);

  const userData = Cookies.get("user");
  const parsedUser = JSON.parse(userData);
  console.log(parsedUser.email);

  // Lấy dữ liệu người dùng từ cookie
  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser.user || {}); // Cung cấp giá trị mặc định là đối tượng rỗng
    }
  }, []);

  // Lấy thông tin người dùng từ API khi component mount
  useEffect(() => {
    const getUser = async () => {
      try {
        let res;

        // Kiểm tra nếu có UID hoặc _ID và gọi API tương ứng
        if (userId) {
          // Nếu có _id, lấy thông tin người dùng từ hệ thống của bạn
          res = await axios.get(`${URL_API}/users/${userId}`);
        }

        if (res?.status === 200) {
          const data = res.data;
          setValue("name", data.name || user.displayName);
          setValue("username", data.username);
          setValue("date", data.date || "");
          setValue("email", data.email);
          setValue("phone", data.phone);
          setValue("address", data.address || "");
          // Hiển thị hình ảnh hiện tại
          setImage(data.image ? `${URL_API}/images/${data.image}` : defaultAvatar);
        } else {
          console.error("Không thể lấy dữ liệu người dùng");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getUser();
  }, [userUid, userId, setValue]);

  // lay du lieu tu cookie show len
  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      const userData = JSON.parse(user);

      // Kiểm tra xem người dùng đăng nhập qua Google (Firebase) hay đăng nhập thông qua hệ thống truyền thống
      if (userData.uid) {
        // Nếu có trường 'uid', tức là người dùng đăng nhập qua Firebase (Google)
        setValue("name", userData.displayName); // Gán tên từ Firebase
        setValue("email", userData.email); // Gán email từ Firebase
        setValue("phone", ""); // Bạn có thể để trống hoặc yêu cầu người dùng nhập lại
        setValue("address", ""); // Bạn có thể để trống hoặc yêu cầu người dùng nhập lại
      }
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("username", data.username);
      formData.append("date", data.date);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      if (selectedImage?.file) {
        formData.append("image", selectedImage.file);
      }

      let res;
      if (userUid) {
        // Nếu có uid, cập nhật thông tin người dùng từ Firebase
        res = await axios.put(`${URL_API}/users/${userUid}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else if (userId) {
        // Nếu có _id, cập nhật thông tin người dùng từ hệ thống của bạn
        res = await axios.put(`${URL_API}/users/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (res?.status === 200) {
        const updatedUser = res.data.userUpdate;
        Cookies.set(
          "user",
          JSON.stringify({ user: { _id: updatedUser._id, uid: updatedUser.uid, ...updatedUser } }),
          {
            expires: 1,
          }
        );
        setUser(updatedUser);
        setImage(`${URL_API}/images/${updatedUser.image}`);
        showSwalFireSuccess("Thông tin hồ sơ của bạn đã được cập nhật.");

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="py-10">
      <div className="container">
        <div className="flex gap-10 max-md:flex-col max-lg:flex-col">
          <div className="max-w-[300px] w-full max-md:w-full max-lg:w-full">
            <div className="flex items-center gap-2 max-md:flex-col">
              <img
                src={selectedImage?.preview || image}
                className="w-[50px] h-[50px] rounded-full"
                alt="Avatar"
              />
              <div>
                <h3 className="font-semibold">{user?.email || parsedUser.email}</h3>
                <p className="flex items-center gap-1 text-grayText">
                  <FaRegEdit />
                  Sửa hồ sơ
                </p>
              </div>
            </div>
            <ul className="flex flex-col gap-7 mt-10">
              {profileMenuList.map((item) => (
                <li key={item.id}>
                  {item.link ? (
                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        isActive
                          ? "text-mainDark flex items-center gap-2 font-normal leading-normal"
                          : "flex items-center text-black hover:text-mainDark gap-2 font-normal leading-normal"
                      }>
                      {item.icon}
                      {item.name}
                    </NavLink>
                  ) : (
                    <button
                      onClick={item.action}
                      className="flex items-center text-black hover:text-mainDark gap-2 font-normal leading-normal">
                      {item.icon}
                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-3/5 max-md:w-full max-lg:w-full">
            <PageTitle title="Cập nhật tài khoản" className="text-mainDark mb-2"></PageTitle>
            <div className="text-grayText leading-normal font-normal mb-5">
              Chỉnh sửa thông tin cá nhân, tài khoản và mật khẩu
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-lg:gap-3">
              <div className="flex items-center justify-center gap-5 max-md:flex-col max-lg:flex-col">
                <div className="w-full">
                  <label htmlFor="name">Họ và tên</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Họ và tên"
                    className="input input-bordered w-full mt-2"
                    {...register("name")}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="username">Tên người dùng</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Tên người dùng"
                    className="input input-bordered w-full mt-2"
                    {...register("username")}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-5 max-md:flex-col max-lg:flex-col">
                <div className="w-full">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="input input-bordered w-full mt-2"
                    {...register("email")}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Số điện thoại"
                    className="input input-bordered w-full mt-2"
                    {...register("phone")}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-5 max-md:flex-col max-lg:flex-col">
                <div className="w-full">
                  <label htmlFor="address">Địa chỉ</label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Địa chỉ"
                    className="input input-bordered w-full mt-2"
                    {...register("address")}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="date">Ngày sinh</label>
                  <input
                    type="date"
                    id="date"
                    className="input input-bordered w-full mt-2"
                    {...register("date", {
                      value: user?.date || "", // Nếu user.date là undefined, sử dụng giá trị mặc định là chuỗi rỗng
                    })}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="image">Ảnh đại diện</label>
                <input
                  type="file"
                  id="image"
                  className="input input-bordered w-full mt-2"
                  onChange={handleImgChange}
                />
              </div>
              <Button type="submit">Cập nhật</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
