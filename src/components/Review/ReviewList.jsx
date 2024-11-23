import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviewDetailData, handleDeleteReview }) => {
  return (
    <div>
      <div className="grid">
        {/* Truyền đúng dữ liệu là mảng đánh giá */}
        <ReviewItem
          handleDeleteReview={handleDeleteReview}
          dataReview={reviewDetailData || []} // Đảm bảo dataReview là mảng
        />
      </div>
    </div>
  );
};

export default ReviewList;
