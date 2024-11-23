import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import BlogList from "../../components/Blog/BlogList";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL_API } from "../../constants/constants";
import Loading from "../../components/Loading/Loading";

const BlogDetail = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [blogDetail, setBlogDetail] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await axios.get(`${URL_API}/blog/${id}`);
        setBlogDetail(response.data);
      } catch (error) {
        setError("Unable to fetch product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);
  if (loading) {
    return <div> </div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const { name, image, date, content } = blogDetail;
  // Chuyển đổi chuỗi ngày tháng thành định dạng ngày, tháng, năm
  const formattedDate = new Date(date).toLocaleDateString();
  return (
    <div className="py-10">
      <Loading />
      <div className="container">
        <div className="relative w-full">
          <img
            src={`${URL_API}/images/${image}`}
            className="rounded-[30px] w-full h-[450px]"
            alt=""
          />
        </div>
        <div className="max-w-[1100px] mx-auto relative z-20 -mt-32 border-b pb-10">
          <div className="rounded-[30px] border py-6 px-11 bg-white">
            <PageTitle title={name}></PageTitle>
            <div className="text-grayText leading-normal font-normal mb-2">{formattedDate}</div>
            <div className="">
              <img
                src={`${URL_API}/images/${image}`}
                className="w-full rounded-[30px] h-[365px]"
                alt=""
              />
              <p className="font-normal leading-normal mt-4">{content}</p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <PageTitle title="Bài viết khác" className="text-center"></PageTitle>
          <BlogList></BlogList>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
