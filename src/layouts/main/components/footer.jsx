import React from "react";

const Footer = () => {
  const sections = [
    {
      title: "Về công ty",
      links: [
        "Giới thiệu",
        "Sáng kiến môi trường",
        "Nhà máy sản xuất",
        "Đa dạng & Hòa nhập (DEI)",
        "Tuyển dụng",
        "Quốc tế",
        "Khả năng truy cập",
      ],
    },
    {
      title: "Hỗ trợ",
      links: [
        "Trung tâm trợ giúp",
        "Chính sách đổi trả",
        "Thông tin vận chuyển",
        "Đặt hàng số lượng lớn",
      ],
    },
    {
      title: "Kết nối",
      links: [
        "Facebook",
        "Instagram",
        "Twitter",
        "Tiếp thị liên kết (Affiliates)",
        "Hệ thống cửa hàng",
      ],
    },
  ];

  const bottomLinks = [
    "Chính sách bảo mật",
    "Điều khoản dịch vụ",
    "Không bán thông tin cá nhân",
    "Minh bạch chuỗi cung ứng",
    "Quy tắc ứng xử nhà cung cấp",
    "Sơ đồ trang",
    "Sơ đồ sản phẩm",
  ];

  return (
    <footer className="w-screen relative left-1/2 -translate-x-1/2 bg-[#f5f5f5] text-gray-600 py-12 font-sans mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* --- PHẦN TRÊN: LINKS & NEWSLETTER --- */}
        {/* THAY ĐỔI: Thêm `text-center md:text-left` để căn giữa mobile, căn trái desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16 text-center md:text-left">
          {/* Render các cột links */}
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="font-bold text-gray-900 mb-4 text-base uppercase tracking-wider">
                {section.title}
              </h3>
              {/* Thêm `items-center md:items-start` nếu muốn căn chỉnh cả vị trí của thẻ li (tùy chọn, ở đây text-center là đủ) */}
              <ul className="space-y-3 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="hover:text-gray-900 transition-colors block py-0.5"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Cột Newsletter */}
          <div className="sm:col-span-2 md:col-span-1 lg:col-span-2 mt-8 sm:mt-0 flex flex-col ">
            <h3 className="font-bold text-gray-900 mb-4 text-base uppercase tracking-wider">
              Đăng ký nhận tin
            </h3>
            <p className="text-sm mb-4 text-gray-500 max-w-xs md:max-w-none mx-auto md:mx-0">
              Nhận thông tin mới nhất về sản phẩm và khuyến mãi.
            </p>

            {/* Input Wrapper */}
            <div className="w-full max-w-sm flex items-center border border-gray-300 bg-white focus-within:border-gray-900 transition-colors mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Nhập địa chỉ email"
                className="w-full py-3 px-4 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400 text-left"
                // Lưu ý: text-left trong input để khi gõ chữ không bị nhảy ra giữa
              />
              <button className="p-3 bg-[#1c1c1c] hover:bg-black text-white transition-colors h-full w-12 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* --- PHẦN DƯỚI: LEGAL LINKS --- */}
        {/* Phần này đã được căn giữa sẵn bằng `items-center` và `text-center` */}
        <div className="flex flex-col items-center border-t border-gray-200 pt-8">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-4 text-xs text-gray-500 text-center">
            {bottomLinks.map((item, index) => (
              <a
                key={index}
                href="#"
                className="hover:text-gray-900 transition-colors whitespace-nowrap"
              >
                {item}
              </a>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-2">
            &copy; 2023 Everlane clone. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
