import React from "react";

// Định nghĩa dữ liệu cho 3 khối nội dung
const featuresData = [
  {
    id: 1,
    // SVG Icon chiếc hộp
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-800"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
    title: "Complimentary Shipping",
    description: "Enjoy free shipping on U.S. orders over $100.",
  },
  {
    id: 2,
    // SVG Icon móc treo tái chế (vẽ gần giống nhất có thể)
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-800"
      >
        <path d="M12 3a3 3 0 0 0-3 3v2c0 1.1.9 2 2 2h6a2 2 0 0 1 2 2v3"></path>
        <path d="M19 15h-5"></path>
        <path d="M14 18l-3-3 3-3"></path>
        <path d="M5 15h5"></path>
        <path d="M10 12l3 3-3 3"></path>
        <path d="M5 15v-3a2 2 0 0 1 2-2h1"></path>
      </svg>
    ),
    title: "Consciously Crafted",
    description: "Designed with you and the planet in mind.",
  },
  {
    id: 3,
    // SVG Icon địa điểm
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-800"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
    title: "Come Say Hi",
    description: "We have 11 stores across the U.S.",
  },
];

const FeaturesSection = () => {
  return (
    // Container chính, thêm padding trên dưới và màu nền trắng
    <div className="py-16 px-4 bg-white">
      {/* Grid layout: 1 cột trên mobile, 3 cột trên màn hình lớn (md trở lên) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {/* Lặp qua dữ liệu để tạo từng khối */}
        {featuresData.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            {/* Khu vực chứa Icon */}
            <div className="mb-5 p-2">{item.icon}</div>

            {/* Tiêu đề */}
            <h3 className="text-base font-semibold text-gray-900 mb-3 tracking-wide">
              {item.title}
            </h3>

            {/* Mô tả */}
            {/* max-w-xs giúp giới hạn chiều rộng text để nó xuống dòng đẹp như ảnh */}
            <p className="text-gray-600 text-base leading-relaxed  mx-auto tracking-wide ">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
