import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBook,
  FaClipboardList,
  FaRegEdit,
  FaUser,
  FaGift,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import PageTitle from "../../../components/PageTitle/PageTitle";

import Button from "../../../components/Button/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import { URL_API } from "../../../constants/constants";

const AddProduct = () => {
  const [selectedImages, setSelectedImages] = useState({});
  const [listCategory, setListCategory] = useState([]);
  const [listAuthor, setListAuthor] = useState([]);
  const [listPublishes, setListPublishes] = useState([]);

  useEffect(() => {
    const fetchListCategory = async () => {
      try {
        const response = await axios.get(`${URL_API}/category`);
        setListCategory(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchListAuthor = async () => {
      try {
        const response = await axios.get(`${URL_API}/authors`);
        setListAuthor(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchListPublishes = async () => {
      try {
        const response = await axios.get(`${URL_API}/publishes`);
        setListPublishes(response.data);
        console.log("List of publishes:", response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListCategory();
    fetchListAuthor();
    fetchListPublishes();
  }, []);

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const handleLogout = () => {
    navigate("/");
  };

  const handleImageChange = (e) => {
    const { id, files } = e.target;
    if (files && files[0]) {
      const fileURL = URL.createObjectURL(files[0]);
      setSelectedImages((prevImages) => ({
        ...prevImages,
        [id]: {
          file: files[0],
          preview: fileURL,
        },
      }));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price1", data.price1);
      formData.append("price2", data.price2);
      formData.append("author", data.author);
      formData.append("category", data.category);
      formData.append("publish", data.publish);
      formData.append("quantity", data.quantity);

      // Append images to FormData
      ["image1", "image2", "image3", "image4"].forEach((imageKey) => {
        if (selectedImages[imageKey]) {
          formData.append(imageKey, selectedImages[imageKey].file);
        }
      });

      const response = await axios.post(`${URL_API}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sản phẩm đã được thêm thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Product created:", response.data.ProductUpdate);
      navigate("/admin/manage-product");
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Có lỗi xảy ra!",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  const handleCancel = () => {
    navigate("/admin/manage-product");
  };

  return (
    <div className="flex min-h-screen border">
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
          <MenuItem component={<Link to="/admin/manage-items" />}>
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
              <MdInventory />
              Quản lý liên hệ
            </div>
          </MenuItem>
          <MenuItem component={<Link to="/admin/stock" />}>
            <div className="flex items-center gap-4">
              <MdMarkEmailRead />
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
      <div className="flex-1 p-6">
        <HeaderAdmin />
        <div className="flex items-center justify-between pb-8 border-b">
          <PageTitle title="Thêm sản phẩm" className="text-mainDark" />
        </div>
        <div className="border rounded-[10px] py-8 px-5 mt-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex gap-10 items-center">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="product-name">*Tên sản phẩm</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  id="product-name"
                  className={`input input-bordered w-full ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <span className="text-red">Tên sản phẩm là bắt buộc</span>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="author">Tác giả</label>
                <select
                  className="select select-bordered w-full"
                  {...register("author", { required: true })}
                >
                  {listAuthor.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.author && (
                  <span className="text-red">Tác giả là bắt buộc</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {["image1", "image2", "image3", "image4"].map((image, index) => (
                <div key={image} className="w-full flex flex-col gap-2">
                  <label htmlFor={image}>*Hình ảnh {index + 1}</label>
                  {selectedImages[image]?.preview && (
                    <img
                      src={selectedImages[image].preview}
                      alt={`Preview ${image}`}
                      className="mt-2 max-h-32 w-40 object-cover"
                    />
                  )}
                  <input
                    type="file"
                    id={image}
                    className="file-input file-input-bordered w-full"
                    onChange={handleImageChange}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-10 items-center">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="price1">*Giá niêm yết</label>
                <input
                  type="number"
                  {...register("price1", { required: true })}
                  id="price1"
                  className={`input input-bordered w-full ${
                    errors.price1 ? "border-red-500" : ""
                  }`}
                />
                {errors.price1 && (
                  <span className="text-red">Giá tiền nhập là bắt buộc</span>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="price2">*Giá giảm</label>
                <input
                  type="number"
                  {...register("price2")}
                  id="price2"
                  className={`input input-bordered w-full ${
                    errors.price2 ? "border-red-500" : ""
                  }`}
                />
                {errors.price2 && (
                  <span className="text-red">Giá tiền bán là bắt buộc</span>
                )}
              </div>
            </div>
            <div className="flex gap-10 items-center">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="category">Danh mục</label>
                <select
                  className="select select-bordered w-full"
                  {...register("category", { required: true })}
                >
                  {listCategory.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="text-red">Danh mục là bắt buộc</span>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="publish">Nhà xuất bản</label>
                <select
                  className="select select-bordered w-full"
                  {...register("publish", { required: true })}
                >
                  {listPublishes.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.publish && (
                  <span className="text-red">Nhà xuất bản là bắt buộc</span>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="description">*Mô tả</label>
              <textarea
                id="description"
                className={`textarea textarea-bordered w-full ${
                  errors.description ? "border-red-500" : ""
                }`}
                {...register("description", { required: true })}
              ></textarea>
              {errors.description && (
                <span className="text-red">Mô tả là bắt buộc</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="quantity">*Số lượng</label>
              <input
                type="number"
                {...register("quantity", { required: true })}
                id="quantity"
                className={`input input-bordered w-full ${
                  errors.quantity ? "border-red-500" : ""
                }`}
              />
              {errors.quantity && (
                <span className="text-red">Số lượng là bắt buộc</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button>Lưu</Button>
              <Button className="bg-secondary" onClick={handleCancel}>
                Hủy
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
