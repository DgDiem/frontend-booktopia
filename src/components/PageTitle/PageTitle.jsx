import React from "react";

const PageTitle = ({ title, className = "" }) => {
  return (
    <div>
      <p
        className={` text-black ${className} text-[20px] font-medium max-md:leading-6 max-lg:text-2xl max-md:text-xl`}>
        {title}
      </p>
    </div>
  );
};

export default PageTitle;
