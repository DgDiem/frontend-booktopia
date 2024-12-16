import React from "react";
import "../App.css";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaInstagram, FaRegClock } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CgMail } from "react-icons/cg";
import { Link } from "react-router-dom";

const Footer = () => {
  const Links = [
    {
      id: 1,
      title: "Dịch vụ",
      links: [
        {
          id: 1,
          name: "Điều khoản sử dụng",
          link: "/term-of-use",
        },
        {
          id: 2,
          name: "Bảo mật thông tin khách hàng",
          link: "/privacy-policy",
        },
        {
          id: 3,
          name: "Bảo mật thanh toán",
          link: "/payment-policy",
        },
        {
          id: 4,
          name: "Về chúng tôi",
          link: "/about-us",
        },
      ],
    },
    {
      id: 2,
      title: "Hỗ trợ",
      links: [
        {
          id: 6,
          name: "Chính sách bảo hành",
          link: "/warranty-policy",
        },
        {
          id: 7,
          name: "Chính sách đổi - trả - hoàn tiền",
          link: "/return-policy",
        },
        {
          id: 8,
          name: "Chính sách vận chuyển",
          link: "/shipping-policy",
        },
      ],
    },
  ];
  return (
    <div className="pb-5">
      <div className="py-10 border">
        <div className="container">
          <div className="footer-list max-lg:grid-cols-2 max-lg:gap-20 max-md:grid-cols-1 max-md:gap-6">
            <div className="">
              <img
                src="./images/logo.png"
                className="max-w-[220px] w-full object-cover max-md:max-w-[150px]"
                alt="Logo"
              />
              <div className="mt-3 text-grayText mb-5 font-normal leading-normal text-[15px]">
                Bạn có câu hỏi? Liên hệ chúng tôi
              </div>
              <div className="mb-5 font-semibold leading-normal">(+84) 776 831 909</div>
              <ul className="flex items-center gap-4">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-white w-10 h-10 rounded-full bg-mainDark max-md:w-8 max-md:h-8">
                    <FaFacebook className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-white w-10 h-10 rounded-full bg-mainDark max-md:w-8 max-md:h-8">
                    <FaInstagram className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-white w-10 h-10 rounded-full bg-mainDark max-md:w-8 max-md:h-8">
                    <FaTwitter className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-white w-10 h-10 rounded-full bg-mainDark max-md:w-8 max-md:h-8">
                    <FaYoutube className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="max-lg:">
              <h3 className="font-semibold text-mainDark text-[18px] leading-normal mb-8 max-md:mb-2">
                Thông tin liên hệ
              </h3>
              <ul className="flex flex-col gap-3 text-[15px] max-md:text-sm">
                <li>
                  <a href="#" className="flex gap-2 font-normal">
                    <HiOutlineLocationMarker className="w-6 h-6 max-md:w-5 max-md:h-5" />
                    <div className="leading-normal">Quận 12, Thành phố Hồ Chí Minh</div>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 font-normal">
                    <FaRegClock className="w-5 h-5 max-md:w-4 max-md:h-4" />
                    <div className="leading-normal">
                      Thứ 2 - Thứ 6: 9:00 - 20:00 <br /> Thứ 7: 9:00 - 12:00
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 font-normal">
                    <CgMail className="w-6 h-6 max-md:w-5 max-md:h-5" />
                    <div>hongltmps28690@fpt.edu.vn</div>
                  </a>
                </li>
              </ul>
            </div>
            {Links.map((item) => (
              <div key={item.id}>
                <h3 className="font-bold text-mainDark leading-normal mb-8 max-md:mb-2">
                  {item.title}
                </h3>
                <ul className="flex flex-col gap-5 text-text max-md:text-sm max-md:gap-3">
                  {item.links.map((linkItem) => (
                    <li key={linkItem.id}>
                      <Link to={linkItem.link} className="text-[15px]">
                        {linkItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex justify-between items-center pt-5 font-medium leading-normal max-md:flex-col">
          <div>Copyright © . All rights reserved.</div>
          <div className="flex items-center gap-2 max-md:hidden">
            {/* <img src="./images/card.png" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
