import React, { useEffect, useState } from "react";
import BlogNewItem from "./BlogNewItem";
import axios from "axios";
import { URL_API } from "../../../constants/constants";

const BlogNewList = () => {
  const [getNewBlog, setGetNewBlog] = useState([]);
  useEffect(() => {
    const fetchNewBlog = async () => {
      try {
        const response = await axios.get(`${URL_API}/blog/blog/new`);
        const data = response.data;
        setGetNewBlog(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewBlog();
  }, []);
  return (
    <div className="mt-5">
      <div className="grid grid-rows-4 gap-5">
        {getNewBlog.map((item) => (
          <BlogNewItem item={item} key={item._id}></BlogNewItem>
        ))}
      </div>
    </div>
  );
};

export default BlogNewList;
