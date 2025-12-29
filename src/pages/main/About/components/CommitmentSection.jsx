import React from "react";
import image from "@/assets/CommitmentSesstion.png";

const CommitmentSection = () => {
  return (
    <section id="commitment" className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-[600px]">
        {/* --- CỘT TRÁI: NỘI DUNG --- */}
        {/* Màu nền #F4F0E9 được lấy mẫu từ ảnh gốc để tạo cảm giác màu kem ấm áp */}
        <div className="bg-[#F4F0E9] flex flex-col justify-center px-8 py-16 lg:px-20 lg:py-0 order-2 lg:order-1">
          <div className="max-w-lg">
            {/* Eyebrow / Tagline */}
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-6">
              Cam kết chất lượng
            </span>

            {/* Headline */}
            <h2 className="text-4xl lg:text-5xl  text-gray-900 mb-8 leading-tight">
              Thiết kế <br />
              Bền bỉ với thời gian.
            </h2>

            {/* Body Text */}
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Tại đây, chúng tôi không chạy theo những xu hướng nhất thời. Chúng
              tôi muốn bạn diện những thiết kế này trong nhiều năm, thậm chí
              nhiều thập kỷ tới.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Đó là lý do tại sao chúng tôi tìm kiếm những nguyên liệu tốt nhất
              và hợp tác với những nhà máy hàng đầu thế giới để tạo ra những sản
              phẩm vượt thời gian – từ những chiếc áo len Cashmere hạng A, giày
              Ý thủ công, cho đến vải thun Pima Peru mềm mại.
            </p>
          </div>
        </div>

        {/* --- CỘT PHẢI: HÌNH ẢNH --- */}
        <div className="relative h-[400px] lg:h-auto order-1 lg:order-2 overflow-hidden">
          <img
            // Ảnh minh họa chất liệu vải len/knitwear giống trong mẫu
            src={image}
            alt="High quality fabric detail"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;
