// ScrollToTopButton.js
import React, { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 z-10 p-3 bg-blue-500 text-white bg-mainDark rounded shadow-lg hover:bg-blue-600 transition duration-300"
        aria-label="Scroll to top">
        <FaChevronUp />
      </button>
    )
  );
};

export default ScrollToTopButton;
