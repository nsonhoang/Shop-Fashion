import { formatMoney } from "@/utils/formatMoney";
import React from "react";

// 1. Thêm giá trị mặc định items = [] để tránh lỗi nếu dữ liệu chưa tải về kịp
function ItemOrderHistory({ items = [] }) {
  console.log("ItemOrderHistory items:", items);
  return (
    <div className="p-0">
      {items.map((item, index) => (
        <div
          // 2. Nên dùng item.id làm key thay vì index (nếu có id) để React render tối ưu hơn
          key={item.id || index}
          // 3. FIX QUAN TRỌNG:

          className="flex gap-5 p-5 border-b border-gray-100 last:border-0"
        >
          {/* Ảnh sản phẩm */}
          <div className="w-20 h-24 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
            <img
              src={item.product_details.thumbnail}
              alt={item.product_details.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thông tin item */}
          <div className="flex-1 flex justify-between items-start">
            <div>
              <h4 className="text-gray-900 font-medium text-[15px] mb-1">
                {item.product_details.name}
              </h4>
              <p className="text-gray-500 text-sm mb-1">
                {item.product_details.variant_sku}
              </p>
              <p className="text-gray-500 text-sm">Số lượng: {item.quantity}</p>
            </div>

            {/* Giá tiền */}
            <span className="font-medium text-gray-900">
              {formatMoney(item.price_at_purchase)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemOrderHistory;
