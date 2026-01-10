import React from "react";
import CategoryProduct from "../../../components/womenPage/CategoryProduct";
import CategoryImage from "../../../components/womenPage/CategoryImage";
import ProductList from "../../../components/womenPage/ProductList";
import bannerImg from "../../../assets/banner2.png";
import ProductReviews from "../../main/Review/index"; // thêm phần các comment đánh giá review
import { womenReviews } from "../../main/Review/components/sampleReview" // data mẫu
import { Link, useNavigate } from "react-router-dom";
const categories = [
  {
    id: 1,
    name: "Đầm/Váy",
    image: "/categories/dresses.jpg",
    count: "45 sản phẩm",
    slug: "dresses",
  },
  {
    id: 2,
    name: "Áo",
    image: "/categories/tops.jpg",
    count: "32 sản phẩm",
    slug: "tops",
  },
  {
    id: 3,
    name: "Quần",
    image: "/categories/pants.jpg",
    count: "28 sản phẩm",
    slug: "pants",
  },
  {
    id: 4,
    name: "Áo khoác",
    image: "/categories/jackets.jpg",
    count: "24 sản phẩm",
    slug: "jackets",
  },
  {
    id: 5,
    name: "Phụ kiện",
    image: "/categories/accessories.jpg",
    count: "56 sản phẩm",
    slug: "accessories",
  },
];

const sizeChart = [
  { size: "S", chest: "84-88", waist: "64-68", hip: "88-92" },
  { size: "M", chest: "88-92", waist: "68-72", hip: "92-96" },
  { size: "L", chest: "92-96", waist: "72-76", hip: "96-100" },
  { size: "XL", chest: "96-100", waist: "76-80", hip: "100-104" },
];

const WomenPage = () => {
  // Kiểm tra data
  console.log("Reviews data:", womenReviews);
  console.log("Reviews array:", womenReviews?.reviews);
  console.log("Reviews length:", womenReviews?.reviews?.length);
  const navigate = useNavigate();
  const goToWomenProducts = () => {
    // Chuyển hướng kèm theo bộ lọc
    navigate("/products?gender=women");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShopNow = () => {
    console.log("Navigate to shop");
    // window.location.href = '/shop';
  };

  const handleViewSizeGuide = () => {
    console.log("Open size guide modal");
    // Hiển thị modal hoặc chuyển trang
  };

  // để dây sau dùng
    const handleSortReviews = (sortBy) => {
    console.log('Sort reviews by:', sortBy);
    // chưa xong
  };

  return (
    <div className="flex flex-col flex-1">
      <CategoryProduct />

      <section
        className="w-full h-[200px] md:h-[400px] lg:h-[500px] bg-cover bg-center flex items-center px-4 sm:px-8 lg:px-8"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
            Nữ tính & Quyến rũ <br className="hidden md:block" /> cho phái đẹp
            tự tin
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-6 sm:mb-8 leading-relaxed drop-shadow-sm">
            Khám phá bộ sưu tập thời trang nữ mới nhất, kết hợp giữa sự thanh
            lịch và hiện đại
          </p>

          <button
            onClick={handleShopNow}
            className="bg-white text-black w-full sm:w-[240px] h-12 sm:h-[40px] rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Khám Phá Ngay
          </button>
        </div>
      </section>

      <section className="flex flex-col items-center mt-8 sm:mt-10 mb-12 sm:mb-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
          Mua Sắm Theo Danh Mục
        </h2>
        <div className="w-full max-w-7xl">
          <CategoryImage categories={categories} />
        </div>
      </section>

      <section className="flex flex-col items-center mt-8 sm:mt-10 mb-12 sm:mb-20 px-4 sm:px-6 lg:px-8">
        <Link
          onClick={goToWomenProducts}
          className="text-2xl md:text-3xl font-bold mb-8 hover:text-gray-600 transition-colors border-b-2 border-transparent hover:border-gray-600 pb-1"
        >
          Sản Phẩm Dành Cho Nữ
        </Link>

        <div className="w-full max-w-7xl">
          <ProductList category="women" featured={true} limit={8} />
        </div>
        <Link
          onClick={goToWomenProducts}
          className="px-8 py-2 border border-gray-300 rounded-full hover:bg-black hover:text-white transition-all text-sm font-medium"
        >
          Xem Tất Cả Sản Phẩm
        </Link>
      </section>

      {/* đây phần review */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Đánh Giá Từ Khách Hàng
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Khám phá những trải nghiệm thực tế từ khách hàng đã sử dụng sản phẩm của chúng tôi
            </p>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-sm">
            <ProductReviews
              reviews={womenReviews.reviews}
              averageRating={womenReviews.averageRating}
              ratingDistribution={womenReviews.ratingDistribution}
              onSortChange={handleSortReviews}
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                Hướng Dẫn Chọn Size
              </h2>
              <p className="text-gray-600 mb-6">
                Để giúp bạn chọn size phù hợp nhất, chúng tôi cung cấp bảng
                hướng dẫn chi tiết cho từng dòng sản phẩm
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-4"></div>
                  <span className="text-gray-700">
                    Đo kích thước cơ thể chính xác
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-4"></div>
                  <span className="text-gray-700">
                    Kiểm tra bảng size cho từng loại trang phục
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-4"></div>
                  <span className="text-gray-700">
                    Liên hệ tư vấn nếu cần hỗ trợ
                  </span>
                </div>
              </div>
              <button
                onClick={handleViewSizeGuide}
                className="px-6 py-3 border-2 border-pink-500 text-pink-500 rounded-full font-semibold hover:bg-pink-50 transition-colors duration-300"
              >
                Xem Bảng Size
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-6">
                Bảng Size Chuẩn
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[300px]">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left text-gray-700">Size</th>
                      <th className="p-3 text-left text-gray-700">Ngực (cm)</th>
                      <th className="p-3 text-left text-gray-700">Eo (cm)</th>
                      <th className="p-3 text-left text-gray-700">Hông (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.map((row, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-3 font-medium text-gray-800">
                          {row.size}
                        </td>
                        <td className="p-3 text-gray-600">{row.chest}</td>
                        <td className="p-3 text-gray-600">{row.waist}</td>
                        <td className="p-3 text-gray-600">{row.hip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WomenPage;
