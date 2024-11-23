import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";
import { URL_API } from "../../constants/constants";
const BlogList = () => {
  const [blogList, setBlogList] = useState([]);
  useEffect(() => {
    const fetchBlogList = async () => {
      try {
        const response = await axios.get(`${URL_API}/blog`);
        const data = response.data;
        setBlogList(data);
      } catch (error) {
        console.log("Lỗi lấy danh sách bài viết", error);
      }
    };
    fetchBlogList();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-4 gap-5 py-10 max-lg:grid-cols-2 max-xl:grid-cols-2">
        {blogList.slice(0, 4).map((item) => (
          <BlogItem item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
