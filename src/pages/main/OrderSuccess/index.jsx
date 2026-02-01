import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  ShoppingBag,
  ArrowRight,
  Home,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";

function OrderSuccessPage() {
  const { orderId } = useParams(); // Lấy mã đơn hàng từ URL
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Cập nhật kích thước màn hình cho hiệu ứng Confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Hiệu ứng pháo giấy (chạy 1 lần rồi tắt sau 5s hoặc 400 mảnh) */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false} // Không lặp lại vô tận
        numberOfPieces={500} // Số lượng pháo
        gravity={0.15}
      />

      <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-8 text-center relative z-10 animate-in fade-in zoom-in duration-500">
        {/* Icon Success */}
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 p-4 rounded-full ring-8 ring-green-50">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Đặt hàng thành công!
        </h1>
        <p className="text-gray-500 mb-8">
          Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đang được xử lý.
        </p>

        {/* Thông tin đơn hàng */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Mã đơn hàng</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-mono font-bold text-gray-900 tracking-wider">
              {orderId || "UNKNOWN"}
            </span>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            Vui lòng kiểm tra lịch sử đơn hàng để có thể thanh toán hoặc hủy đơn
            hàng.
          </div>
        </div>

        {/* Các nút hành động */}
        <div className="flex flex-col gap-3">
          <Button
            className="w-full h-12 text-base bg-black hover:bg-gray-800 transition-all gap-2"
            onClick={() => navigate("/products")} // Sửa link theo router của bạn
          >
            <ShoppingBag className="w-4 h-4" />
            Tiếp tục mua sắm
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="w-full h-11 gap-2"
              onClick={() => navigate("/order-history")} // Sửa link theo router của bạn
            >
              <FileText className="w-4 h-4" />
              Đơn mua
            </Button>

            <Button
              variant="outline"
              className="w-full h-11 gap-2"
              onClick={() => navigate("/")}
            >
              <Home className="w-4 h-4" />
              Trang chủ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
