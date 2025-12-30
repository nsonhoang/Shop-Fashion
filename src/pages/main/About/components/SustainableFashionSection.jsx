import React from "react";

const SustainableFashionSection = () => {
  return (
    <section
      id="sustainable-fashion"
      className="w-full py-20 lg:py-28 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* --- CỘT TRÁI: BIỂU ĐỒ SO SÁNH GIÁ (Vẽ bằng CSS) --- */}
          <div className="flex flex-col items-center justify-end h-[400px] lg:h-[500px] w-full px-4 lg:px-12">
            {/* Container của 2 cột */}
            <div className="flex items-end justify-center gap-12 w-full h-full pb-8 border-b border-gray-200 lg:border-none">
              {/* CỘT 1: Sản phẩm của chúng tôi ($30) */}
              <div className="flex flex-col items-center w-24 lg:w-32 group">
                <span className="mb-4 text-lg font-bold text-gray-900">
                  $30
                </span>
                {/* Thanh MÀU BE (Giá bán/Markup thấp) */}
                <div className="w-full bg-[#E5E0D8] h-[180px] transition-all duration-500 group-hover:bg-[#dcd6cc]"></div>
                {/* Thanh MÀU NÂU (Chi phí sản xuất) */}
                <div className="w-full bg-[#AC8B66] h-[50px]"></div>
                <p className="mt-4 text-sm font-bold text-gray-900 text-center">
                  Áo Thun <br /> Của Chúng Tôi
                </p>
              </div>

              {/* CỘT 2: Bán lẻ truyền thống ($55) */}
              <div className="flex flex-col items-center w-24 lg:w-32 group">
                <span className="mb-4 text-lg font-bold text-gray-900">
                  $55
                </span>
                {/* Thanh MÀU BE (Markup rất cao) */}
                <div className="w-full bg-[#E5E0D8] h-[330px] transition-all duration-500 group-hover:bg-[#dcd6cc]"></div>
                {/* Thanh MÀU XÁM ĐẬM (Chi phí sản xuất tương đương) */}
                <div className="w-full bg-[#6B6964] h-[50px]"></div>
                <p className="mt-4 text-sm font-bold text-gray-900 text-center">
                  Bán Lẻ <br /> Truyền Thống
                </p>
              </div>
            </div>
          </div>

          {/* --- CỘT PHẢI: NỘI DUNG TEXT --- */}
          <div className="flex flex-col justify-center max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-6">
              Minh bạch về giá
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Minh bạch <br /> Tuyệt đối.
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Chúng tôi tin rằng khách hàng có quyền được biết chi phí thực sự
              để làm nên bộ trang phục họ đang mặc.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Chúng tôi công khai mọi chi phí đằng sau mỗi sản phẩm — từ nguyên
              liệu, nhân công cho đến vận chuyển — sau đó mang chúng đến tay
              bạn, loại bỏ hoàn toàn mức giá đắt đỏ vô lý của mô hình bán lẻ
              truyền thống.
            </p>

            {/* Chú thích màu sắc (Legend) - Thêm vào để người dùng hiểu biểu đồ */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#AC8B66]"></div>
                <span className="text-sm text-gray-500">Chi phí thực</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Dùng màu xám đại diện cho cả 2 bên sản xuất */}
                <div className="w-4 h-4 bg-[#E5E0D8]"></div>
                <span className="text-sm text-gray-500">Giá bán ra</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainableFashionSection;
