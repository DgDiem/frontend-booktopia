import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBook,
  FaClipboardList,
  FaPlus,
  FaRegEdit,
  FaTrashAlt,
  FaUser,
  FaUserEdit,
  FaGift,
  FaCommentAlt,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import { MdLogout, MdOutlinePreview } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import PageTitle from "../../../components/PageTitle/PageTitle";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import axios from "axios";
import { URL_API } from "../../../constants/constants";
import { showSwalFireDelete } from "../../../helpers/helpers";
import ReactPaginate from "react-paginate"; // Import thư viện React Paginate
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import "./ManageProduct.css";
const ManageProduct = () => {
  const location = useLocation();
  const isAdmin = true;
  const [searchTerm, setSearchTerm] = useState(
    new URLSearchParams(location.search).get("search") || ""
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({});

  // Phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(10); // Số sản phẩm hiển thị trên mỗi trang
  const [pageCount, setPageCount] = useState(0);
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
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = searchTerm.trim()
          ? `${URL_API}/products/search/${searchTerm.trim()}`
          : `${URL_API}/products/admin`;
        const response = await axios.get(url);
        setProducts(response.data);

        // Cập nhật tổng số trang
        setPageCount(Math.ceil(response.data.length / productsPerPage));
      } catch (error) {
        console.error("Lỗi khi tìm kiếm sản phẩm", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, location.search]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL_API}/products/${id}`);
      showSwalFireDelete();
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm xử lý khi chuyển trang
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Lấy danh sách sản phẩm cho trang hiện tại
  const offset = currentPage * productsPerPage;
  const currentProducts = products.slice(offset, offset + productsPerPage);

  const handleUpdateStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await axios.put(`${URL_API}/products/${id}/status`, {
        isActive: updatedStatus,
      });

      // Cập nhật trạng thái trong UI sau khi thành công
      const updatedProducts = products.map((product) =>
        product._id === id ? { ...product, isActive: updatedStatus } : product
      );
      setProducts(updatedProducts);

      // Hiển thị thông báo thành công bằng Swal
      Swal.fire({
        icon: "success",
        title: "Cập nhật trạng thái thành công!",
        text: `Sản phẩm đã được ${updatedStatus ? "kích hoạt" : "ẩn"} thành công.`,
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái sản phẩm", error);
      Swal.fire({
        icon: "error",
        title: "Cập nhật trạng thái thất bại!",
        text: "Đã có lỗi xảy ra khi cập nhật trạng thái sản phẩm.",
      });
    }
  };

  return (
    <div className="">
      <div className="flex min-h-screen">
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
        <div className="flex-1">
          <HeaderAdmin />
          <div className="flex items-center justify-between pb-5 border-b">
            <PageTitle title="Danh sách sản phẩm" className="text-mainDark" />
            <div className="flex items-center">
              <Link to="/admin/add-product">
                <button className="flex items-center gap-2 bg-mainDark py-3 px-5 text-white font-semibold leading-normal rounded-[10px]">
                  <FaPlus /> Thêm
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-6 border rounded-[30px] p-2">
            <table className="table w-full table-product">
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
                  <th className="text-center">Trạng thái</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((item, index) => (
                  <tr key={item._id} item={item}>
                    <td>{offset + index + 1}</td> {/* Hiển thị STT chính xác */}
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
                    <td>
                      <div className="flex items-center justify-center gap-3">
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
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <Link to={`/admin/edit-product/${item._id}`}>
                          <FaUserEdit className="w-5 h-5 text-main" />
                        </Link>
                        {/* <button onClick={(e) => handleDelete(item._id)}>
                          <FaTrashAlt className="w-5 h-4 text-red" />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Phân trang */}
            <ReactPaginate
              previousLabel={"Trước"}
              nextLabel={"Sau"}
              breakLabel={<span className="px-3 py-2 leading-tight text-gray-500">...</span>} // Thêm style cho breakLabel
              pageCount={pageCount}
              marginPagesDisplayed={1} //xác định số lượng nút số trang hiển thị ở đầu và cuối danh sách phân trang
              pageRangeDisplayed={3} //xác định số lượng nút số trang hiển thị xung quanh trang hiện tại.
              onPageChange={handlePageClick}
              containerClassName={"flex justify-center items-center"} // Thêm class items-center
              pageClassName={
                "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              }
              previousLinkClassName={
                "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-l-lg"
              }
              nextLinkClassName={
                "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg"
              }
              disabledClassName={"opacity-50 cursor-not-allowed"}
              activeClassName={
                "px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
              }
              forcePage={currentPage} // Giữ trạng thái trang hiện tại
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
