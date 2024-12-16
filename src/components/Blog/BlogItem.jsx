import React from "react";
import { Link } from "react-router-dom";
import { URL_API } from "../../constants/constants";
import { formatDate } from "../../helpers/helpers";

const BlogItem = ({ item }) => {
  const { name, date, image, content, _id } = item;

  return (
    <div>
      <div className="">
        <Link to={`/blog-detail/${_id}`} className="w-full">
          <img
            src={`${URL_API}/images/${image}`}
            className="w-full h-[172px] object-cover"
            alt=""
          />
        </Link>
        <div className="flex flex-col gap-1 bg-white border px-4 py-3">
          <p className="text-gray-400 font-light text-sm">{formatDate(date)}</p>
          <h3 className="font-semibold leading-normal max-md:leading-none max-md:text-sm max-md:line-clamp-2">
            <a
              href="#"
              className="cursor-pointer hover:text-mainDark max-md:text-sm line-clamp-1"
            >
              {name}
            </a>
          </h3>
          <p className="text-text text-sm font-light leading-normal max-md:line-clamp-2 line-clamp-3">
            {content}
          </p>
          <div>
            <button className="max-md:text-sm">Xem thêm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
