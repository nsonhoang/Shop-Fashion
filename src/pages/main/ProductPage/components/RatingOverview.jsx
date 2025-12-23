import React, { useMemo } from "react";
import { Star } from "lucide-react";

// Nếu agvRating chưa có giá trị, mặc định là 0
const RatingOverview = ({ agvRating = 0, reviews }) => {
  // --- LOGIC TÍNH TOÁN ---
  const stats = useMemo(() => {
    const totalReviews = reviews.length;

    if (totalReviews === 0) {
      return { distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    }

    // Đếm số lượng sao
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      // Làm tròn rating (VD: 4.8 -> 5)
      const r = Math.round(review.rating);
      // Chỉ đếm nếu r nằm trong khoảng 1-5
      if (distribution[r] !== undefined) {
        distribution[r]++;
      }
    });

    return { distribution };
  }, [reviews]);

  return (
    <div className="w-full bg-[#F9F9F9] p-8 mt-8 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* CỘT 1: ĐIỂM TỔNG (Đánh giá chung) */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-xl font-medium text-gray-900">Đánh giá chung</h3>

          <div className="flex gap-1 items-center">
            {[1, 2, 3, 4, 5].map((star) => {
              // Logic kiểm tra sao sáng/tối
              const isActive = star <= Math.round(agvRating);

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

          <p className="text-sm text-gray-500 mt-1">
            Dựa trên {reviews.length} nhận xét
          </p>
        </div>

        {/* CỘT 2: BIỂU ĐỒ SAO */}
        <div className="flex flex-col gap-3 justify-center">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = stats.distribution[star];
            const percentage =
              reviews.length > 0 ? (count / reviews.length) * 100 : 0;

            return (
              <div key={star} className="flex items-center gap-3 text-sm">
                {/* Số sao bên trái */}
                <div className="flex items-center gap-1 w-8 shrink-0">
                  <span className="text-gray-600 font-medium">{star}</span>
                  <Star
                    fill="black"
                    className="w-3 h-3 text-black"
                    strokeWidth={0}
                  />
                </div>

                {/* Thanh Progress Bar */}
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Số lượng người vote */}
                <span className="w-6 text-right text-gray-400 text-xs">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RatingOverview;
