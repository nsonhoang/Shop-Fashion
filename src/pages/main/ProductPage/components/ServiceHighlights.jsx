import React from "react";
import { Truck, Package, Gift } from "lucide-react";

const ServiceHighlights = () => {
  // Dữ liệu tĩnh (đễ dễ quản lý và sửa đổi nội dung)
  const highlights = [
    {
      id: 1,
      icon: <Truck className="w-8 h-8 text-gray-900" strokeWidth={1.5} />,
      title: "Miễn phí vận chuyển",
      description: "Áp dụng cho mọi đơn hàng giá trị trên 500.000đ.",
      linkText: "Xem thêm.",
    },
    {
      id: 2,
      icon: <Package className="w-8 h-8 text-gray-900" strokeWidth={1.5} />,
      title: "Đổi trả dễ dàng",
      description: "Hỗ trợ đổi trả sản phẩm trong vòng 30 ngày.",
      linkText: "Chi tiết đổi trả.",
    },
    {
      id: 3,
      icon: <Gift className="w-8 h-8 text-gray-900" strokeWidth={1.5} />,
      title: "Gửi quà tặng người thân",
      description: "Miễn phí gói quà và viết thiệp khi thanh toán.",
      linkText: null, // Mục này không có link
    },
  ];

  return (
    <div className="w-full py-6 ">
      <div className="flex flex-col gap-6">
        {highlights.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            {/* Cột Icon */}
            <div className="flex-shrink-0 mt-1">{item.icon}</div>

            {/* Cột Nội dung */}
            <div className="flex flex-col">
              <h3 className="text-base font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm text-gray-700 font-medium mt-1 leading-relaxed">
                {item.description}{" "}
                {item.linkText && (
                  <a
                    href="#"
                    className="underline hover:text-gray-900 transition-colors"
                  >
                    {item.linkText}
                  </a>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHighlights;
