import React, { useState, useEffect, useRef, useContext } from "react";
import { FaBars, FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { CiHeart, CiUser } from "react-icons/ci";
import { BiPhoneCall } from "react-icons/bi";
import axios from "axios";
import { useSelector } from "react-redux";
import { URL_API } from "../../constants/constants" ;
import Cookies from "js-cookie";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import Notification from "../../pages/Admin/Notification/Notification";
const HeaderAdmin = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // Tìm kiếm sản phẩm
  const handleSearch = async () => {
    try {
      const trimmedSearchTerm = searchTerm.trim();
      const response = trimmedSearchTerm
        ? await axios.get(`${URL_API}/products/search/${trimmedSearchTerm}`)
        : await axios.get(`${URL_API}/products`);
      setSearchResults(response.data);
      navigate(`/admin/manage-product?search=${trimmedSearchTerm}`);
      window.location.reload();
    } catch (error) {
      console.error("Lỗi tìm kiếm sản phẩm", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mb-5">
      <div className="bg-mainDark rounded-[10px] p-5">
        <div className="flex items-center justify-between">
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow placeholder:text-grayText"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
              />
              <FaSearch className="text-grayText" />
            </label>
          </div>
          <div className="flex items-center gap-5 text-white">
            {/* <FaRegBell className="w-5 h-5" /> */}
            <Notification></Notification>
            <IoChatbubbleEllipsesOutline className="w-5 h-5" />
            <div>
              <img src="./images/avatar.png" className="w-10 h-10 rounded-full" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
