import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBook,
  FaClipboardList,
  FaRegEdit,
  FaUser,
  FaGift,
  FaCommentAlt,
} from "react-icons/fa";
import { MdLogout, MdOutlinePreview } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Cookies from "js-cookie";
import Button from "../../../components/Button/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import { URL_API } from "../../../constants/constants";
import { showSwalFireSuccess } from "../../../helpers/helpers";

const AddVoucher = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
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

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${URL_API}/vouchers`, data);
      if (response.status === 200) {
        await showSwalFireSuccess("Thêm mới voucher thành công");
        navigate("/admin/manage-voucher");
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/manage-voucher");
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
      <MenuItem component={<Link to="/admin/manage-review" />}>
        <div className="flex items-center gap-4">
          <MdOutlinePreview />
          Quản lý đánh giá
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
          <PageTitle title="Thêm voucher" className="text-mainDark" />
        </div>
        <div className="border rounded-[10px] py-8 px-5 mt-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-12">
              <div className="w-2/4 flex flex-col gap-3">
                <label htmlFor="code">*Mã voucher</label>
                <input
                  type="text"
                  {...register("code", { required: "Mã voucher là bắt buộc" })}
                  id="code"
                  className="input input-bordered w-full"
                />
                {errors.code && (
                  <p className="text-red">{errors.code.message}</p>
                )}
              </div>

              <div className="w-2/4 flex flex-col gap-3">
                <label htmlFor="">*Loại voucher</label>
                <select
                  {...register("type", { required: true })}
                  id="type"
                  className="select select-bordered w-full"
                  onChange={(e) => {
                    // Xử lý khi loại voucher thay đổi
                    setValue("discountValue", ""); // Reset giá trị voucher khi thay đổi loại voucher
                  }}
                >
                  <option value="" disabled selected hidden>
                    Chọn loại voucher
                  </option>
                  <option value="Discount">Discount</option>
                  <option value="Shipping">Shipping</option>
                </select>
                {errors.type && (
                  <span className="text-red">Vui lòng chọn loại voucher</span>
                )}
              </div>

              <div className="w-2/4 flex flex-col gap-3">
                <label htmlFor="code">*Giảm giá</label>
                <input
                  type="number"
                  {...register("discountValue", {
                    required: "Giá trị voucher là bắt buộc",
                    validate: (value) => {
                      const type = getValues("type");
                      if (type === "Discount") {
                        if (value > 100) {
                          return "Giảm giá discount không thể vượt quá 100%";
                        }
                        if (value < 0) {
                          return "Giảm giá không thể nhỏ hơn 0";
                        }
                      } else if (type === "Shipping") {
                        if (value < 0) {
                          return "Giảm giá vận chuyển không thể nhỏ hơn 0";
                        }
                      }
                      return true;
                    },
                  })}
                  id="discountValue"
                  className="input input-bordered w-full"
                />
                {errors.discountValue && (
                  <p className="text-red">{errors.discountValue.message}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-12">
              <div className="w-2/6 flex flex-col gap-3">
                <label htmlFor="minimumOrderValue">*Đơn hàng tối thiểu</label>
                <input
                  type="text"
                  {...register("minimumOrderValue", {
                    required: "Đơn hàng tối thiểu là bắt buộc",
                  })}
                  id="minimumOrderValue"
                  className="input input-bordered w-full"
                />
                {errors.minimumOrderValue && (
                  <p className="text-red">{errors.minimumOrderValue.message}</p>
                )}
              </div>
              <div className="w-2/6 flex flex-col gap-3">
                <label htmlFor="effectiveDate">Ngày hiệu lực</label>
                <input
                  type="date"
                  {...register("effectiveDate")}
                  id="effectiveDate"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="w-2/6 flex flex-col gap-3">
                <label htmlFor="expirationDate">Ngày kết thúc</label>
                <input
                  type="date"
                  {...register("expirationDate")}
                  id="expirationDate"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="description">Mô tả</label>
              <textarea
                {...register("description")}
                id="description"
                className="textarea textarea-bordered"
                placeholder="Nhập mô tả"
              ></textarea>
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit">Lưu</Button>
              <Button
                type="button"
                className="bg-secondary"
                onClick={handleCancel}
              >
                Hủy
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVoucher;
