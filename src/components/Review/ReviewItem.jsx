import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AiOutlineDelete } from "react-icons/ai";

// Hàm để tạo sao dựa trên rating
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? "★" : "☆"); // Nếu i nhỏ hơn hoặc bằng rating thì sao đầy, ngược lại sao rỗng
  }
  return stars.join(""); // Trả về chuỗi các sao
};

const ReviewItem = ({ dataReview, handleDeleteReview}) => {
  const [inforUser, setInforUser] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      setInforUser(userData?.user);
    } else {
      console.log("User not found in cookie");
    }
  }, []);

  console.log("dataReview:", dataReview);
  
  return (
    <div className="mt-10">
      <div className="">
        {/* Kiểm tra nếu dataReview là mảng và có phần tử */}
        {Array.isArray(dataReview) && dataReview.length > 0 ? (
          dataReview.map((review) => (
            <div key={review._id} className="flex items-center mb-2 justify-between">
              <div className="w-[100%]">
                <div className="border flex justify-between rounded-[10px] py-4 px-5 w-full">
                  <div className="flex flex-col gap-2">
                    <div className="text-grayText flex font-normal leading-normal">
                      <div className="flex gap-2">
                        <img
                          src={
                            review?.user?.image
                              ? `http://localhost:3000/images/${review?.user.image}`
                              : "./images/avatar.png"
                          }
                          className="w-10 h-10 rounded-full"
                          alt={review?.user?.name || "User Avatar"}
                        />
                        <div className="rating-right">
                          <h3 className="text-sm text-text font-semibold leading-normal">
                            {review?.user?.name}
                          </h3>
                          {/* Hiển thị sao đánh giá */}
                          <div className="flex gap-1 text-yellow-500 text-sm">
                            <span>{renderStars(review?.rating)}</span>{" "}
                            {/* Hiển thị sao theo rating */}
                          </div>
                          <span className="text-sm">
                            {new Date(review?.day).toLocaleString("vi-VN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-text font-normal leading-normal">{review?.content}</p>
                  </div>
                  {review?.user?._id === inforUser?._id && (
                    <div className="cursor-pointer font-medium">
                      <AiOutlineDelete onClick={() => handleDeleteReview(review?._id)} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>Không có đánh giá</h1> // Hiển thị khi không có đánh giá
        )}
      </div>
    
    </div>
  );
};

export default ReviewItem;
