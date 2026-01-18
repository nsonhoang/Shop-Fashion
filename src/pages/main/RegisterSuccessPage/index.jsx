import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Mail, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button"; // Đảm bảo bạn đã có Button của shadcn

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center animate-in fade-in zoom-in-95 duration-500">
        {/* ICON SUCCESS */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-4 shadow-sm">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* TIÊU ĐỀ */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Đăng ký thành công!
        </h1>
        <p className="text-gray-500 mb-8">
          Chào mừng bạn đến với Fashion Store. Tài khoản của bạn đã được khởi
          tạo.
        </p>

        {/* KHUNG NHẮC CHECK EMAIL (Quan trọng với Supabase) */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 text-left flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-sm">
            <h3 className="font-semibold text-blue-800 mb-1">Xác thực Email</h3>
            <p className="text-blue-700 leading-relaxed">
              Chúng tôi đã gửi một liên kết xác nhận đến email của bạn. Vui lòng
              kiểm tra hộp thư (cả mục Spam) và bấm vào link để kích hoạt tài
              khoản trước khi đăng nhập.
            </p>
          </div>
        </div>

        {/* CÁC NÚT ĐIỀU HƯỚNG */}
        {/* Nút về trang đăng nhập (Nếu bạn dùng trang riêng) hoặc mở Dialog */}
        {/* Ở đây mình để Link về trang chủ, user sẽ tự bấm nút Login trên Header */}
        {/* <div className="space-y-3">
          <Link to="/" className="block">
            <Button className="w-full py-6 text-lg bg-black hover:bg-gray-800 text-white shadow-md transition-all hover:scale-[1.02]">
              Về trang chủ để Đăng nhập
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div> */}

        <div className="mt-8 text-xs text-gray-400">
          Bạn không nhận được email?{" "}
          <span className="underline cursor-pointer hover:text-gray-600">
            Gửi lại
          </span>
        </div>
      </div>
    </div>
  );
}
