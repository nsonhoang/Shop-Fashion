import { Star } from "lucide-react";
import { formatDate } from "../../../utils/formatDate";

function ReviewDetailItem({ review }) {
  return (
    <div className="w-full flex flex-row p-5 border-b border-gray-200 gap-5 mt-5">
      {/* tên */}
      <div className="flex flex-col basis-1/5 gap-2">
        <span className="font-medium text-lg text-gray-900 ">
          {review.user.full_name}
        </span>
        {/* <label>
          Màu sắc: <span className="text-sm text-gray-500">{review.color}</span>
        </label>
        <label>
          Size: <span className="text-sm text-gray-500">{review.size}</span>
        </label> */}
      </div>
      {/* chi tiết đánh giá */}
      <div className="flex flex-col basis-4/5 gap-4">
        {/* in số sao và ngày đánh giá */}
        <div className="flex flex-row justify-between items-center">
          {/*ngôi sao  */}
          <div className="flex gap-1 items-center">
            {[1, 2, 3, 4, 5].map((star) => {
              // Logic kiểm tra sao sáng/tối
              const isActive = star <= Math.round(review.rating);
              return (
                <Star
                  key={star}
                  fill="black"
                  // Sửa lại cú pháp className cho chuẩn
                  className={`w-5 h-5 ${
                    isActive ? "text-black" : "text-gray-300 fill-gray-300"
                  }`}
                  strokeWidth={0}
                />
              );
            })}
          </div>
          {/* ngày đánh giá */}
          <span className="text-sm text-gray-500 mt-1">
            {formatDate(review.created_at)}
          </span>
        </div>
        {/* chi tiết đánh giá */}
        <div className="">
          <p className="text-gray-700 font-medium leading-relaxed">
            {review.comment}
            size nha mọi người.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetailItem;
