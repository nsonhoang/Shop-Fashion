import React from "react";
import CategoryProduct from "../../../components/womenPage/CategoryProduct";
import CategoryImage from "../../../components/womenPage/CategoryImage";
import ProductList from "../../../components/womenPage/ProductList";
import bannerImg from "../../../assets/banner2.png";
import { Link } from "react-router-dom";

const WomenPage = () => {
   const categories = [
    { id: 1, name: "Đầm/Váy", image: "/categories/dresses.jpg", count: "45 sản phẩm", slug: "dresses" },
    { id: 2, name: "Áo", image: "/categories/tops.jpg", count: "32 sản phẩm", slug: "tops" },
    { id: 3, name: "Quần", image: "/categories/pants.jpg", count: "28 sản phẩm", slug: "pants" },
    { id: 4, name: "Áo khoác", image: "/categories/jackets.jpg", count: "24 sản phẩm", slug: "jackets" },
    { id: 5, name: "Phụ kiện", image: "/categories/accessories.jpg", count: "56 sản phẩm", slug: "accessories" },
  ];

  const trends = [
    { id: 1, name: "Pastel Tone", description: "Tông màu pastel dịu dàng", color: "from-pink-200 to-purple-200" },
    { id: 2, name: "Bohemian Style", description: "Phong cách tự do", color: "from-blue-200 to-cyan-200" },
    { id: 3, name: "Office Chic", description: "Thanh lịch công sở", color: "from-yellow-200 to-orange-200" },
  ];

  const collections = [
    { id: 1, name: "Summer Vibes", description: "Bộ sưu tập hè 2024", color: "from-rose-100 to-pink-100" },
    { id: 2, name: "Evening Glam", description: "Dạ tiệc & Sự kiện", color: "from-purple-100 to-blue-100" },
    { id: 3, name: "Casual Day", description: "Thoải mái hằng ngày", color: "from-green-100 to-teal-100" },
    { id: 4, name: "Winter Romance", description: "Ấm áp mùa đông", color: "from-orange-100 to-yellow-100" },
  ];

  const sizeChart = [
    { size: "S", chest: "84-88", waist: "64-68", hip: "88-92" },
    { size: "M", chest: "88-92", waist: "68-72", hip: "92-96" },
    { size: "L", chest: "92-96", waist: "72-76", hip: "96-100" },
    { size: "XL", chest: "96-100", waist: "76-80", hip: "100-104" },
  ];

  const handleShopNow = () => {
    console.log("Navigate to shop");
    // window.location.href = '/shop';
  };

  const handleViewSizeGuide = () => {
    console.log("Open size guide modal");
    // Hiển thị modal hoặc chuyển trang
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log("Newsletter submitted:", email);
    // Gửi email đến server
    e.target.reset();
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
            Nữ tính & Quyến rũ <br className="hidden md:block" /> cho phái đẹp tự tin
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-6 sm:mb-8 leading-relaxed drop-shadow-sm">
            Khám phá bộ sưu tập thời trang nữ mới nhất, kết hợp giữa sự thanh lịch và hiện đại
          </p>

          <button 
            onClick={handleShopNow}
            className="bg-pink-500 text-white w-full sm:w-[240px] h-12 sm:h-[40px] rounded-full font-semibold hover:bg-pink-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
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
      
      <section className=" py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Xu Hướng Mới Nhất
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cập nhật những xu hướng thời trang nữ nổi bật trong mùa này
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trends.map((trend) => (
              <div 
                key={trend.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`h-48 bg-gradient-to-br ${trend.color}`}></div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{trend.name}</h3>
                  <p className="text-gray-600 text-sm">{trend.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Bộ Sưu Tập Nổi Bật
            </h2>
            <p className="text-gray-700">Những thiết kế được yêu thích nhất</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {collections.map((collection) => (
              <div 
                key={collection.id}
                className="relative group overflow-hidden rounded-xl"
              >
                <div 
                  className={`h-64 ${collection.color} group-hover:scale-105 transition-transform duration-500`}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-2">{collection.name}</h3>
                    <p className="text-white/90">{collection.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="flex flex-col items-center mt-8 sm:mt-10 mb-12 sm:mb-20 px-4 sm:px-6 lg:px-8">
        <Link 
          to="/product/women" 
          className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 hover:text-pink-600 transition-colors duration-300"
        >
          Sản Phẩm Dành Cho Nữ
        </Link>
        <p className="text-gray-600 mb-8 text-center max-w-2xl">
          Khám phá những sản phẩm thời trang nữ chất lượng, từ đồ hàng ngày đến trang phục dự tiệc
        </p>
        <div className="w-full max-w-7xl">
          <ProductList category="women" featured={true} limit={8} />
        </div>
        <Link 
          to="/product/women/all"
          className="mt-8 px-8 py-3 bg-pink-400 text-white rounded-full font-semibold hover:bg-pink-600 transition-colors duration-300"
        >
          Xem Tất Cả Sản Phẩm
        </Link>
      </section>
      
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                Hướng Dẫn Chọn Size
              </h2>
              <p className="text-gray-600 mb-6">
                Để giúp bạn chọn size phù hợp nhất, chúng tôi cung cấp bảng hướng dẫn chi tiết cho từng dòng sản phẩm
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                  </div>
                  <span className="text-gray-700">Đo kích thước cơ thể chính xác</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                  </div>
                  <span className="text-gray-700">Kiểm tra bảng size cho từng loại trang phục</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                  </div>
                  <span className="text-gray-700">Liên hệ tư vấn nếu cần hỗ trợ</span>
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
              <h3 className="font-bold text-lg text-gray-800 mb-6">Bảng Size Chuẩn</h3>
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
                        <td className="p-3 font-medium text-gray-800">{row.size}</td>
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