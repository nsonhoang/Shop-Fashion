import React from "react";
import CategoryProduct from "./components/categoryProduct";
import bannerImg from "@/assets/banner.png";
import CategoryImage from "./components/CategoryImage";
import ProductList from "./components/ProductList";
import { Link } from "react-router-dom";
import FeaturesSection from "./components/FeaturesSection";

const MenPage = () => {
  return (
    <div className="flex flex-col flex-1 w-full">
      {/* Thanh danh mục sản phẩm (Sticky hoặc tĩnh tùy component bên trong) */}
      <CategoryProduct />

      {/* --- BANNER SECTION --- */}
      <div
        style={{ backgroundImage: `url(${bannerImg})` }}
        className="relative w-full min-h-[500px] md:h-[600px] lg:h-[700px] bg-cover bg-center flex items-center justify-center md:justify-start px-4 md:px-16 lg:px-24"
      >
        {/* Lớp phủ đen mờ (Optional): Giúp chữ dễ đọc hơn nếu ảnh nền sáng */}
        <div className="absolute inset-0 bg-black/20 md:bg-transparent"></div>

        {/* Nội dung Banner */}
        <div className="relative z-10 max-w-xl text-center md:text-left w-full">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
            Phong cách cozy <br className="hidden md:block" /> đỉnh cao cho mùa
            đông
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-6 md:mb-8 leading-relaxed drop-shadow-md px-4 md:px-0">
            Thoải mái mà vẫn thời thượng với bộ sưu tập mùa đông mới nhất. Ấm áp
            trong từng sợi vải.
          </p>

          <button className="bg-white text-black w-full sm:w-[240px] py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Mua Ngay
          </button>
        </div>
      </div>

      {/* --- MUA SẮM THEO DANH MỤC --- */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">
            Mua sắm theo danh mục
          </h2>

          {/* Wrapper cho CategoryImage để đảm bảo không bị tràn */}
          <div className="w-full">
            <CategoryImage />
          </div>
        </div>
      </section>

      {/* --- DANH SÁCH SẢN PHẨM --- */}
      <section className="py-10 px-4 bg-gray-50/50">
        <div className="container mx-auto flex flex-col items-center">
          {/* Link tiêu đề có hiệu ứng hover */}
          <Link
            to="/product/men"
            className="text-2xl md:text-3xl font-bold mb-8 hover:text-gray-600 transition-colors border-b-2 border-transparent hover:border-gray-600 pb-1"
          >
            Danh sách sản phẩm
          </Link>

          <div className="w-full">
            <ProductList />
          </div>

          {/* Nút xem thêm (Optional - nếu list quá dài) */}
          <div className="mt-8">
            <Link to="/product/men">
              <button className="px-8 py-2 border border-gray-300 rounded-full hover:bg-black hover:text-white transition-all text-sm font-medium">
                Xem tất cả
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <FeaturesSection />
    </div>
  );
};

export default MenPage;
