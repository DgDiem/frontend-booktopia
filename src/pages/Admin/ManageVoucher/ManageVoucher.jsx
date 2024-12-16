import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBook,
  FaClipboardList,
  FaCommentAlt,
  FaGift,
  FaPlus,
  FaRegEdit,
  FaTrashAlt,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import { MdLogout, MdOutlinePreview } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import PageTitle from "../../../components/PageTitle/PageTitle";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import axios from "axios";
import { URL_API } from "../../../constants/constants";
import Swal from "sweetalert2";
import { MdMarkEmailRead } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import Cookies from "js-cookie";
const ManageVoucher = () => {
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
  const [lstVoucher, setLstVoucher] = useState([]);
  useEffect(() => {
    fetchVoucher();
  }, []);
  const fetchVoucher = async () => {
    try {
      const response = await axios.get(`${URL_API}/vouchers/admin`);
      const data = response.data;
      setLstVoucher(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${URL_API}/vouchers/${id}`);
      if (response.status === 200) {
        Swal.fire({
          title: "Bạn có muốn xóa?",
          text: "Đã xóa không thể khôi phục",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Xóa",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Xóa voucher thành công!",
              icon: "success",
            }).then(() => {
              fetchVoucher();
            });
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Lỗi!",
        text: error.response?.data?.message || "Có lỗi xảy ra khi xóa đơn hàng.",
        icon: "error",
      });
    }
  };
  const handleUpdateStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      const response = await axios.put(`${URL_API}/vouchers/${id}/status`, {
        isActive: updatedStatus,
      });

      if (response.status === 200) {
        const updateVouchers = lstVoucher.map((item) =>
          item._id === id ? { ...item, isActive: updatedStatus } : item
        );
        setLstVoucher(updateVouchers);

        // Hiển thị thông báo thành công bằng Swal
        Swal.fire({
          icon: "success",
          title: "Cập nhật trạng thái thành công!",
          text: `Voucher đã được ${updatedStatus ? "kích hoạt" : "ẩn"} thành công.`,
        });
      } else {
        // Nếu status không phải 200, hiển thị thông báo lỗi
        Swal.fire({
          icon: "error",
          title: "Cập nhật trạng thái thất bại!",
          text: "Đã có lỗi xảy ra khi cập nhật trạng thái Voucher.",
        });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái Voucher", error);
      Swal.fire({
        icon: "error",
        title: "Cập nhật trạng thái thất bại!",
        text: "Đã có lỗi xảy ra khi cập nhật trạng thái bài viết.",
      });
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
          <div className="flex items-center justify-between pb-5 border-b">
            <PageTitle title="Quản lý voucher" className="text-mainDark" />
            <div className="flex items-center">
              <Link to="/admin/add-voucher">
                <button className="flex items-center gap-2 bg-mainDark py-3 px-5 text-white font-semibold leading-normal rounded-[10px]">
                  <FaPlus /> Thêm
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-6 border rounded-[10px] p-5">
            <table className="table w-full">
              <thead className="text-[16px] font-semibold text-black">
                <tr>
                  <th>#</th>
                  <th>Mã voucher</th>
                  <th>Loại voucher</th>
                  <th>Giảm giá</th>
                  <th>Đơn hàng tối thiểu</th>
                  <th>Ngày hiệu lực</th>
                  <th>Ngày kết thúc</th>
                  <th>Trạng thái</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {lstVoucher.map((item, index) => {
                  const effectiveDate = new Date(item.effectiveDate);
                  const formatEffectiveDate = effectiveDate.toLocaleDateString("vi-VN");
                  const expirationDate = new Date(item.expirationDate);
                  const formatExpirationDate = expirationDate.toLocaleDateString("vi-VN");
                  return (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.code}</td>
                      <td>{item.type}</td>
                      <td>
                        {item.type === "Discount"
                          ? `${item.discountValue}%`
                          : Number(item.discountValue).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                      </td>
                      <td>
                        {Number(item.minimumOrderValue).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td>{formatEffectiveDate}</td>
                      <td>{formatExpirationDate}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(item._id, item.isActive)}
                            className="w-28 text-[12px] justify-items-center p-2 rounded-lg text-white cursor-pointer flex items-center justify-center gap-2"
                            style={{
                              backgroundColor: item.isActive ? "#166534" : "#ef4444",
                            }}>
                            {item.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
                          </button>
                        </div>
                      </td>
                      <td className="flex justify-center">
                        <div className="flex items-center justify-center gap-3">
                          <Link to={`/admin/edit-voucher/${item._id}`}>
                            <FaUserEdit className="w-5 h-5 text-main" />
                          </Link>
                          {/* <button onClick={(e) => handleDelete(item._id)}>
                            <FaTrashAlt className="w-5 h-4 text-red" />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageVoucher;
