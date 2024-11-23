import React from "react";
import { URL_API } from "../../../constants/constants";

const BlogNewItem = ({ item }) => {
  const { name, date, content, image } = item;
  const formattedDate = new Date(date).toLocaleDateString();
  return (
    <div className="rounded border p-4">
      <div className="flex items-center gap-3">
        <div>
          <div className="w-24 h-24">
            <img src={`${URL_API}/images/${image}`} className="w-full object-cover h-full" alt="" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-grayText font-normal leading-normal">{formattedDate}</div>
          <h3 className="text-text font-medium leading-normal line-clamp-1">{name}</h3>
          <div className="text-grayText line-clamp-2 font-normal leading-normal">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogNewItem;
