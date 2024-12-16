import React from "react";

const Button = ({ children, className = "", type = "submit", onClick }) => {
  return (
    <div>
      <button
        className={`rounded-[10px]  text-white font-semibold bg-mainDark py-4 h-auto px-11 max-md:px-5 max-md:py-1 max-md:text-[16px] max-md:leading-5 ${className}`}
        type={type}
        onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
