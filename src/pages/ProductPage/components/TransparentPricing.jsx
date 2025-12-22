import React from "react";
import { Layers, CircleDot, Scissors, Receipt, Plane } from "lucide-react";
import { formatMoney } from "../../../utils/formatMoney";

const TransparentPricing = () => {
  // Dữ liệu chi phí (Đã quy đổi sang VNĐ tượng trưng)
  const costBreakdown = [
    {
      id: 1,
      label: "Nguyên liệu",
      price: 1200000, // ~ $47.96
      icon: Layers, // Biểu tượng lớp vải/da
    },
    {
      id: 2,
      label: "Phụ kiện",
      price: 145000, // ~ $5.74
      icon: CircleDot, // Biểu tượng cúc áo/khuy
    },
    {
      id: 3,
      label: "Nhân công",
      price: 350000, // ~ $13.75
      icon: Scissors, // Biểu tượng cắt may
    },
    {
      id: 4,
      label: "Thuế & Phí",
      price: 205000, // ~ $8.09
      icon: Receipt, // Biểu tượng hóa đơn
    },
    {
      id: 5,
      label: "Vận chuyển",
      price: 40000, // ~ $1.53
      icon: Plane, // Biểu tượng máy bay
    },
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Phần tiêu đề & Mô tả */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Minh bạch chi phí
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Chúng tôi công khai chi phí thực tế để tạo ra từng sản phẩm. Có
            nhiều khoản chi phí khó tính toán chính xác từng li từng tí - như
            thiết kế, hao mòn máy móc, thuê mặt bằng văn phòng và cửa hàng -
            nhưng chúng tôi tin rằng bạn xứng đáng được biết những gì tạo nên
            giá trị của sản phẩm bạn yêu thích.
          </p>
        </div>

        {/* Phần Icon & Giá tiền */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {costBreakdown.map((item) => {
            const IconComponent = item.icon;

            return (
              <div
                key={item.id}
                className="flex flex-col items-center justify-start text-center gap-3"
              >
                {/* Icon với nét mảnh (stroke-1) giống ảnh mẫu */}
                <div className="mb-2 text-gray-400">
                  <IconComponent size={48} strokeWidth={1} />
                </div>

                {/* Tên khoản phí */}
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                  {item.label}
                </h3>

                {/* Giá tiền */}
                <span className="text-sm font-semibold text-gray-700">
                  {formatMoney(item.price)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TransparentPricing;
