import React from "react";
import { Button } from "@/components/ui/button"; // Nếu bạn dùng shadcn, hoặc thay bằng thẻ <button> thường

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* --- CỘT TRÁI: HÌNH ẢNH (Collage Style) --- */}
          <div className="w-full lg:w-1/2 relative">
            {/* Ảnh chính lớn */}
            <div className="relative z-10 h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop"
                alt="About Team"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Ảnh phụ nhỏ hơn (Trang trí) - Ẩn trên mobile quá nhỏ */}
            <div className="absolute -bottom-10 -right-10 z-0 h-[250px] w-[250px] rounded-2xl overflow-hidden shadow-lg border-4 border-white hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=500&auto=format&fit=crop"
                alt="Detail"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Họa tiết trang trí (Dot pattern) */}
            <div className="absolute -top-10 -left-10 z-0 hidden lg:block text-gray-200">
              <svg
                width="100"
                height="100"
                fill="currentColor"
                viewBox="0 0 100 100"
              >
                <pattern
                  id="dots"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="2" />
                </pattern>
                <rect width="100" height="100" fill="url(#dots)" />
              </svg>
            </div>
          </div>

          {/* --- CỘT PHẢI: NỘI DUNG --- */}
          <div className="w-full lg:w-1/2">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-2 block">
              Câu chuyện thương hiệu
            </span>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Kiến tạo phong cách sống <br />
              <span className="text-gray-500">Bền vững & Tinh tế</span>
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Chúng tôi không chỉ bán sản phẩm, chúng tôi mang đến một giải pháp
              cho cuộc sống hiện đại. Bắt đầu từ năm 2015, sứ mệnh của chúng tôi
              là kết nối nghệ thuật thủ công truyền thống với thiết kế đương
              đại, tạo ra những giá trị trường tồn với thời gian.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Mỗi sản phẩm đều được chế tác tỉ mỉ, sử dụng nguyên liệu thân
              thiện với môi trường và quy trình sản xuất minh bạch. Chúng tôi
              tin rằng sự đơn giản chính là đỉnh cao của sự tinh tế.
            </p>

            {/* Stats (Số liệu nổi bật) */}
            <div className="grid grid-cols-3 gap-6 border-t border-gray-100 pt-8 mb-8">
              <div>
                <p className="text-3xl font-bold text-gray-900">10+</p>
                <p className="text-sm text-gray-500 mt-1">Năm kinh nghiệm</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">50k+</p>
                <p className="text-sm text-gray-500 mt-1">
                  Khách hàng tin dùng
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">100%</p>
                <p className="text-sm text-gray-500 mt-1">Cam kết chính hãng</p>
              </div>
            </div>

            {/* Nút hành động */}
            <div className="flex gap-4">
              {/* Nếu dùng thẻ a/button thường */}
              <button className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors">
                Xem thêm
              </button>
              <button className="px-8 py-3 bg-white text-black border border-gray-200 font-medium rounded-full hover:bg-gray-50 transition-colors">
                Liên hệ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
