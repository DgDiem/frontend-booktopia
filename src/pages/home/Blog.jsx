import React from "react";
import Title from "../../components/Title/Title";
import BlogList from "../../components/Blog/BlogList";

const Blog = () => {
  return (
    <div className="py-5 max-md:py-2">
      <div className="container">
        <Title children="Bài viết mới" />
        <BlogList />
      </div>
    </div>
  );
};

export default Blog;
