import React from "react";
// Import icon từ lucide-react (bộ icon chuẩn của shadcn/ui)
// Nếu bạn chưa cài: npm install lucide-react
import {
  Leaf,
  Recycle,
  Droplets,
  Sun,
  Wind,
  HeartHandshake,
} from "lucide-react";

const INITIATIVES = [
  {
    id: 1,
    icon: <Recycle className="w-8 h-8" />,
    title: "Vòng tuần hoàn",
    desc: "90% bao bì đóng gói được làm từ vật liệu tái chế và có khả năng phân hủy sinh học hoàn toàn.",
  },
  {
    id: 2,
    icon: <Droplets className="w-8 h-8" />,
    title: "Tiết kiệm nước",
    desc: "Quy trình nhuộm khô giúp giảm 50% lượng nước tiêu thụ so với phương pháp truyền thống.",
  },
  {
    id: 3,
    icon: <Sun className="w-8 h-8" />,
    title: "Năng lượng sạch",
    desc: "Các nhà máy của chúng tôi vận hành 100% bằng năng lượng mặt trời và năng lượng gió.",
  },
  {
    id: 4,
    icon: <Leaf className="w-8 h-8" />,
    title: "Nguyên liệu hữu cơ",
    desc: "Sử dụng bông Organic Cotton đạt chuẩn GOTS, không thuốc trừ sâu, an toàn cho da.",
  },
];

const EnvironmentSection = () => {
  return (
    <section id="environment" className="py-24 bg-stone-50">
      <div className="container mx-auto px-4">
        {/* --- PHẦN 1: HEADER GIỚI THIỆU --- */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            Sáng kiến vì Trái Đất
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Thời trang không tổn hại thiên nhiên
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Chúng tôi tin rằng cái đẹp không nên đánh đổi bằng sự hủy hoại môi
            trường. Mỗi bước đi của chúng tôi đều hướng tới mục tiêu{" "}
            <span className="text-emerald-700 font-semibold">
              Net Zero vào năm 2030
            </span>
            .
          </p>
        </div>

        {/* --- PHẦN 2: GRID CÁC SÁNG KIẾN --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {INITIATIVES.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* --- PHẦN 3: BANNER HÌNH ẢNH & SỐ LIỆU (FEATURE) --- */}
        <div className="relative rounded-3xl overflow-hidden h-[500px] group">
          {/* Ảnh nền */}
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/054/880/166/small/thriving-tree-in-lush-green-environment-nature-conservation-and-protection-concept-free-photo.jpeg"
            alt="Environment Background"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Lớp phủ màu tối */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Nội dung đè lên ảnh */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6">
            <Wind className="w-16 h-16 mb-6 text-emerald-300 opacity-80" />
            <h3 className="text-3xl md:text-5xl font-bold mb-4">
              Giảm 12,000 tấn CO2
            </h3>
            <p className="text-lg md:text-xl max-w-2xl text-emerald-50 mb-8">
              Đó là con số chúng tôi đã đạt được trong năm qua nhờ việc tối ưu
              hóa vận chuyển và sử dụng vật liệu tái chế.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentSection;
