import React from "react";

import BlogList from "../../components/Blog/BlogList";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

const Blog = () => {
  return (
    <div className="py-5 max-md:py-2">
      <div className="container">
        <div className="flex items-center justify-between gap-20">
          <h2 className="text-[28px] text-mainDark font-bold leading-normal max-lg:text-[16px] max-xl:text-2xl">
            Bài viết mới
          </h2>
          <div className="border w-1/2 max-lg:w-2/5 max-md:hidden"></div>
          <Link to="/blog">
            <div className="text-mainDark flex items-center gap-1 cursor-pointer font-normal">
              Xem thêm <FaAngleRight />
            </div>
          </Link>
        </div>
        <BlogList />
      </div>
    </div>
  );
};

export default Blog;
