import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBook,
  FaClipboardList,
  FaRegEdit,
  FaTrashAlt,
  FaUser,
  FaUserClock,
  FaGift,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import PageTitle from "../../../components/PageTitle/PageTitle";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { showSwalFireDelete } from "../../../helpers/helpers";
import { MdMarkEmailRead } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { URL_API } from "../../../constants/constants";

const ManageContact = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const handleLogout = () => {
    navigate("/");
  };
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${URL_API}/contact/api/contacts`);
        setContacts(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu liên hệ:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleUpdateStatus = async (id) => {
    try {
      const response = await axios.patch(
        `${URL_API}/contact/api/contact/${id}/status`
      );
      const updatedContact = response.data.contact;
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === updatedContact._id ? updatedContact : contact
        )
      );
      toast.success("Thay đổi trạng thái thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };
  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`${URL_API}/contact/api/contact/${id}`);
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== id)
      );
      toast.success("Xóa thành công!");
    } catch (error) {
      toast.error("Liên hệ chưa phản hồi không được xóa!");
    }
  };
  return (
    <div>
      <ToastContainer autoClose={3000} />

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
            <MenuItem onClick={handleLogout}>
              <div className="flex items-center gap-4">
                <MdLogout />
                Logout
              </div>
            </MenuItem>
          </Menu>
        </Sidebar>
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
          <div className="flex items-center justify-between pb-8 border-b pt-3">
            <PageTitle title="Quản lý liên hệ" className="text-mainDark" />
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <table className="table w-full">
              <thead className="text-[16px] text-center font-semibold text-black">
                <tr>
                  <th>#</th>
                  <th>Tên khách hàng</th>
                  <th>Email khách hàng</th>
                  <th>Nội dung liên hệ</th>
                  <th>Ngày liên hệ</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {contacts.map((contact, index) => (
                  <tr key={contact._id}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                    <td>{contact.createdAt}</td>
                    {/* <td>{contact.status}</td> */}
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(contact._id)}
                          className="w-28 text-[12px] justify-items-center p-1 rounded-lg text-white cursor-pointer"
                          style={{
                            backgroundColor:
                              contact.status === "Chưa phản hồi"
                                ? "#ef4444"
                                : "#166534",
                          }}
                        >
                          {contact.status === "Đã phản hồi"
                            ? "Đã phản hồi"
                            : "Chưa phản hồi"}
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="w-20 p-1 justify-items-center rounded-lg bg-red-500 text-black"
                        >
                          <FaTrashAlt className="w-5 h-4 text-red" />
                        </button>
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

export default ManageContact;
