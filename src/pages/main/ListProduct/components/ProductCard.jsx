import React from "react";
import { Link } from "react-router-dom";
import { formatMoney } from "@/utils/formatMoney"; // Đảm bảo bạn có hàm này

export default function ProductCard({ product }) {
  // 1. Lấy ảnh đại diện (ảnh đầu tiên hoặc ảnh placeholder)
  const mainImage =
    product.product_images && product.product_images.length > 0
      ? product.product_images[0].image_url
      : "https://placehold.co/400x600?text=No+Image"; // Ảnh giữ chỗ nếu không có ảnh

  // 2. Lấy danh sách màu duy nhất từ variants (để render các chấm màu)
  // Set giúp loại bỏ các màu trùng lặp (ví dụ: Size S màu Đen, Size M màu Đen -> chỉ lấy 1 màu Đen)
  const uniqueColors = product.product_variants
    ? [...new Set(product.product_variants.map((v) => v.color))].filter(Boolean)
    : [];

  // Map tên màu sang mã màu CSS (Tùy chọn, nếu bạn lưu mã HEX trong DB thì lấy trực tiếp)
  const getColorCode = (colorName) => {
    const map = {
      den: "black",
      trang: "white",
      do: "red",
      xanh: "blue",
      vang: "yellow",
      nau: "#8B4513",
      xam: "gray",
      // Thêm các màu khác tùy DB của bạn
    };
    // Nếu không tìm thấy trong map, trả về chính tên đó (hy vọng là mã hex hoặc tên chuẩn css)
    return map[colorName?.toLowerCase()] || colorName || "gray";
  };

  return (
    <div className="group bg-white rounded-lg p-3 shadow-sm hover:shadow-lg transition-all border border-gray-100 h-full flex flex-col">
      <Link
        to={`/product/${product.product_id}`} // ID từ Supabase là product_id
        className="block flex-1"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        {/* --- ẢNH SẢN PHẨM --- */}
        <div className="relative bg-gray-100 aspect-[3/4] mb-3 rounded-md overflow-hidden">
          {/* Badge Giảm giá (Tạm ẩn hoặc check điều kiện nếu có sale_price) */}
          {/* <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
            -30%
          </span> 
          */}

          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* --- TÊN SẢN PHẨM --- */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* --- GIÁ TIỀN --- */}
        <div className="mt-1 mb-2">
          {/* Nếu có giá cũ (sale) thì hiển thị dòng gạch ngang */}
          {/* <span className="text-xs text-gray-400 line-through mr-2">
            {formatMoney(product.base_price * 1.2)} 
          </span> */}

          <span className="text-base font-bold text-black">
            {formatMoney(product.base_price)}
          </span>
        </div>
      </Link>

      {/* --- MÀU SẮC & NÚT MUA --- */}
      <div className="mt-auto">
        {/* List màu */}
        <div className="flex gap-1.5 mb-3 h-4">
          {uniqueColors.slice(0, 5).map((color, index) => (
            <div
              key={index}
              className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-sm"
              style={{ backgroundColor: getColorCode(color) }}
              title={color}
            />
          ))}
          {uniqueColors.length > 5 && (
            <span className="text-[10px] text-gray-400">
              +{uniqueColors.length - 5}
            </span>
          )}
        </div>

        {/* Nút Mua Hàng */}
      </div>
    </div>
  );
}
