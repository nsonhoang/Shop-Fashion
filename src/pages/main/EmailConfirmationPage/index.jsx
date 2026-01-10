import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { CheckCircle, AlertTriangle, Loader2, LogIn } from "lucide-react"; // Đổi icon XCircle thành AlertTriangle cho đỡ sợ
import { Button } from "@/components/ui/button";

export default function EmailConfirmationPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'invalid'
  const [message, setMessage] = useState("Đang kiểm tra liên kết...");

  useEffect(() => {
    const checkConfirmation = async () => {
      // 1. Lấy thông tin lỗi từ URL (nếu có)
      const fragment = window.location.hash;
      const urlParams = new URLSearchParams(fragment.replace("#", "?"));
      const errorDescription = urlParams.get("error_description");
      const errorCode = urlParams.get("error_code");

      // --- TRƯỜNG HỢP LINK CŨ HOẶC HẾT HẠN ---
      // Supabase thường trả về otp_expired hoặc error_description chứa từ 'expired'
      if (errorDescription || errorCode) {
        setStatus("invalid"); // Đặt trạng thái riêng là invalid

        // Nếu lỗi do link hết hạn hoặc đã dùng
        if (
          errorDescription?.includes("expired") ||
          errorDescription?.includes("invalid")
        ) {
          setMessage("Liên kết này đã hết hạn hoặc bạn đã xác thực trước đó.");
        } else {
          setMessage(decodeURIComponent(errorDescription).replaceAll("+", " "));
        }
        return;
      }

      // 2. Kiểm tra Session (Nếu link ngon -> Supabase tự login)
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        setStatus("invalid");
        setMessage(error.message);
      } else if (session) {
        // --- TRƯỜNG HỢP THÀNH CÔNG ---
        setStatus("success");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        // Không có lỗi trên URL nhưng cũng không có session (Link rỗng/bậy bạ)
        setStatus("invalid");
        setMessage("Không tìm thấy thông tin xác thực.");
      }
    };

    checkConfirmation();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center animate-in fade-in zoom-in-95 duration-500">
        {/* --- LOADING --- */}
        {status === "loading" && (
          <div className="flex flex-col items-center py-6">
            <Loader2 className="w-12 h-12 text-gray-400 animate-spin mb-4" />
            <p className="text-gray-500">{message}</p>
          </div>
        )}

        {/* --- SUCCESS (Lần đầu bấm) --- */}
        {status === "success" && (
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-green-100 p-4 shadow-sm mb-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Xác thực thành công!
            </h1>
            <p className="text-gray-600 mb-6">
              Tài khoản đã kích hoạt. Đang chuyển vào trang chủ...
            </p>
          </div>
        )}

        {/* --- INVALID (Bấm lại link cũ / Link hết hạn) --- */}
        {status === "invalid" && (
          <div className="flex flex-col items-center">
            {/* Dùng icon Cảnh báo màu vàng cam thay vì Lỗi đỏ */}
            <div className="rounded-full bg-orange-100 p-4 shadow-sm mb-6">
              <AlertTriangle className="w-16 h-16 text-orange-500" />
            </div>

            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Liên kết không khả dụng
            </h1>

            <p className="text-gray-600 mb-6 text-sm">
              {message} <br />
              Có thể tài khoản của bạn <b>đã được xác thực rồi</b>.
            </p>

            {/* Nút này mở Dialog Login hoặc chuyển về trang Login */}
            <Button
              onClick={() => {
                // Nếu bạn dùng trang Login riêng thì navigate('/login')
                // Nếu dùng Dialog ở trang chủ thì navigate('/') rồi user tự bấm Login
                navigate("/");
              }}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              <LogIn className="w-4 h-4 mr-2" /> Thử Đăng nhập ngay
            </Button>

            {/* Nếu họ thực sự chưa nhận được link mới */}
            <p className="mt-4 text-xs text-gray-400">
              Vẫn không đăng nhập được? Hãy dùng chức năng "Gửi lại email" ở
              khung đăng nhập.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
