import React from "react";

const Button = ({ children, className = "", type = "submit", onClick }) => {
  return (
    <div>
      <button
        className={`rounded-[10px]  text-white font-semibold bg-mainDark py-4 h-auto px-11 ${className}`}
        type={type}
        onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
