import React from "react";
import CategoryProduct from "./components/categoryProduct";
import bannerImg from "../../assets/banner.png";
import CategoryImage from "./components/CategoryImage";
import ProductList from "./components/ProductList";
import { Link } from "react-router-dom";
import FeaturesSection from "./components/FeaturesSection";

const MenPage = () => {
  return (
    <div className=" flex flex-col flex-1">
      <CategoryProduct />
      {/* banner */}
      <div
        style={{ backgroundImage: `url(${bannerImg})` }}
        className="w-full h-200 bg-cover bg-center flex items-center px-30"
      >
        {/* nội dung */}
        <div className="max-w-2xl text-center sm:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md">
            Phong cách cozy <br className="hidden md:block" /> đỉnh cao cho mùa
            đông
          </h1>
          {/* Tiêu đề phụ: Nhỏ hơn, nhẹ nhàng hơn */}
          <p className="text-lg md:text-xl text-white/90 font-medium mb-8 leading-relaxed drop-shadow-sm">
            Thoải mái mà vẫn thời thượng với bộ sưu tập mùa đông mới nhất. Ấm áp
            trong từng sợi vải.
          </p>

          <button className="bg-white text-black w-[240px] h-[40px] rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Mua Ngay
          </button>
        </div>
      </div>
      {/* Mua sắm theo danh mục */}
      <div className="flex flex-col items-center mt-10 mb-20 px-4">
        <h2 className="text-3xl mb-4">Mua sắm theo danh mục</h2>
        <div className="">
          {/* Các mục danh mục sẽ được hiển thị ở đây */}
          <CategoryImage />
        </div>
      </div>
      {/* danh sách sản phẩm */}
      <div className="flex flex-col items-center mt-10 mb-20 px-4">
        {/* cái này phải link nhấn vô hiện hết sp */}
        <Link to="/product/men" className="text-3xl mb-4">
          Danh sách sản phẩm
        </Link>
        <div className="">
          {/* Các sản phẩm sẽ được hiển thị ở đây */}
          <ProductList />
        </div>
      </div>
      {/*  */}
      <FeaturesSection />
    </div>
  );
};

export default MenPage;
