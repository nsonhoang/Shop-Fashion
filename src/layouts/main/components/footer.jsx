import React from "react";

const Footer = () => {
  // Dữ liệu đã được Việt hóa
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
    // GIỮ NGUYÊN KỸ THUẬT TRÀN VIỀN (Break out)
    <footer className="w-screen relative left-1/2 -translate-x-1/2 bg-[#f5f5f5] text-gray-600 py-12 font-sans mt-20">
      {/* Container giới hạn nội dung ở giữa */}
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Phần trên: Grid Links + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {/* Render các cột links */}
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-gray-900 mb-4 text-base uppercase md:normal-case">
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="hover:text-gray-900 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Cột Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-gray-900 mb-4 text-base block md:hidden">
              Đăng ký nhận tin
            </h3>
            <div className="flex items-center border border-gray-300 bg-white">
              <input
                type="email"
                placeholder="Nhập địa chỉ email"
                className="w-full py-3 px-4 text-sm text-gray-700 outline-none bg-transparent"
              />
              <button className="p-3 bg-[#1c1c1c] hover:bg-black text-white transition-colors h-full w-12 flex items-center justify-center">
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

        {/* Phần dưới: Legal Links + Copyright */}
        <div className="flex flex-col items-center border-t border-gray-200 pt-8">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 text-xs text-gray-500 text-center">
            {bottomLinks.map((item, index) => (
              <a
                key={index}
                href="#"
                className="hover:text-gray-900 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-2">
            &copy; 2023 Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
