import { formatMoney } from "@/utils/formatMoney";
import React from "react";

function ItemOrderHistory({ items = [] }) {
  return (
    <div className="p-0">
      {items.map((item) => {
        // Tạo biến rút gọn để code bên dưới đỡ dài dòng và dễ đọc
        const variant = item.product_variants || {};
        const product = variant.products || {};

        return (
          <div
            key={item.order_item_id}
            className="flex gap-4 sm:gap-5 p-4 sm:p-5 border-b border-gray-100 last:border-0"
          >
            {/* Ảnh sản phẩm */}
            <div className="w-16 h-20 sm:w-20 sm:h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
              <img
                // SỬA: Lấy ảnh từ variant.image_url
                src={variant.image_url || "https://placehold.co/100"}
                alt={product.name || "Sản phẩm"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thông tin item */}
            <div className="flex-1 flex flex-col sm:flex-row justify-between items-start">
              <div className="space-y-1">
                {/* Tên sản phẩm */}
                <h4 className="text-gray-900 font-medium text-sm sm:text-[15px] line-clamp-2">
                  {product.name}
                </h4>

                {/* Phân loại hàng (Size/Color) */}
                <div className="text-gray-500 text-xs sm:text-sm flex flex-wrap gap-2">
                  {/* SỬA: Hiển thị Size và Màu thay vì SKU nhìn cho thân thiện */}
                  <span className="bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                    {variant.color} / {variant.size}
                  </span>
                </div>

                {/* Số lượng */}
                <p className="text-gray-500 text-xs sm:text-sm pt-1">
                  x{item.quantity}
                </p>
              </div>

              {/* Giá tiền */}
              <div className="mt-2 sm:mt-0 text-right">
                <span className="font-medium text-gray-900 text-sm sm:text-base block">
                  {/* Giá tại thời điểm mua */}
                  {formatMoney(item.price_at_purchase)}
                </span>

                {/* (Optional) Nếu muốn hiện tổng tiền của row này */}
                {item.quantity > 1 && (
                  <span className="text-xs text-gray-400 block mt-0.5">
                    Tổng: {formatMoney(item.price_at_purchase * item.quantity)}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ItemOrderHistory;
