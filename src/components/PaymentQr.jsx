import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  CheckCircle,
  Copy,
  XCircle,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";

const CONFIG = {
  BANK_ID: "ICB", // <--- Mã chuẩn của VietinBank
  ACCOUNT_NO: "103886276330", // <--- Số tài khoản ngân hàng

  SEPAY_API_KEY: import.meta.env.VITE_SEPAY_API_KEY,
};

const PaymentQR = ({ orderId, amount }) => {
  const navigate = useNavigate();
  const [isPaid, setIsPaid] = useState(false);

  // 1. THÊM ĐẾM NGƯỢC (Ví dụ: 10 phút = 600 giây)
  const [timeLeft, setTimeLeft] = useState(600);
  const [isExpired, setIsExpired] = useState(false);

  const transferContent = `SEVQR DH${orderId}`;
  const qrUrl = `https://qr.sepay.vn/img?acc=${CONFIG.ACCOUNT_NO}&bank=${CONFIG.BANK_ID}&amount=${amount}&des=${transferContent}`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Đã copy!");
  };

  // Hàm format giây thành phút:giây (VD: 09:59)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Xử lý đếm ngược
  useEffect(() => {
    if (isPaid || isExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true); // Hết giờ -> Báo lỗi
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaid, isExpired]);

  // Xử lý kiểm tra thanh toán (Polling)
  useEffect(() => {
    // Nếu đã thanh toán HOẶC hết giờ thì không check nữa
    if (isPaid || isExpired) return;

    const checkPayment = async () => {
      try {
        const res = await fetch("/api-sepay/transactions/list?limit=20", {
          headers: {
            Authorization: `Bearer ${CONFIG.SEPAY_API_KEY}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        const transactions = data.transactions || [];
        console.log("transactions:", transactions);
        const found = transactions.find((t) => {
          // 1. Lấy nội dung từ Bank
          // Chuyển thành chữ hoa & Xóa hết dấu cách, dấu gạch ngang, dấu chấm
          // Ví dụ: "SEVQR DH 123-456" -> thành "SEVQRDH123456"
          const cleanBankContent = t.transaction_content
            .toUpperCase()
            .replace(/[- ._]/g, "");

          // 2. Lấy mã mong đợi của mình
          // Cũng xóa sạch tương tự để đồng bộ
          const cleanMyContent = transferContent
            .toUpperCase()
            .replace(/[- ._]/g, "");

          // 3. So sánh chuỗi đã làm sạch & Số tiền
          return (
            cleanBankContent.includes(cleanMyContent) &&
            parseFloat(t.amount_in) >= parseFloat(amount)
          );
        });

        if (found) {
          setIsPaid(true);
          try {
            await supabase
              .from("payments")
              .update({
                status: "COMPLETED",
              })
              .eq("order_id", orderId);
          } catch (error) {
            console.error("Lỗi cập nhật đơn hàng:", error);
          }

          toast.success("Thanh toán thành công!");
          setTimeout(() => navigate("/order-history"), 2000);
        }
      } catch (error) {
        console.error("Lỗi check:", error);
      }
    };

    const intervalId = setInterval(checkPayment, 2000);
    return () => clearInterval(intervalId);
  }, [orderId, amount, isPaid, isExpired, transferContent, navigate]);

  // --- 1. GIAO DIỆN THÀNH CÔNG ---
  if (isPaid) {
    return (
      <div className="flex flex-col items-center p-8 bg-green-50 border border-green-200 rounded-xl">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-xl font-bold text-green-700">
          Thanh toán thành công!
        </h2>
      </div>
    );
  }

  // --- 2. GIAO DIỆN THẤT BẠI (HẾT GIỜ) ---
  if (isExpired) {
    return (
      <div className="flex flex-col items-center p-8 bg-red-50 border border-red-200 rounded-xl text-center max-w-sm mx-auto">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-red-700">
          Hết thời gian thanh toán
        </h2>
        <p className="text-gray-600 mt-2 text-sm">
          Đơn hàng đã bị hủy do quá thời gian chờ. Vui lòng đặt lại đơn hàng
          mới.
        </p>

        <div className="flex gap-3 mt-6 w-full">
          <button
            onClick={() => navigate("/")} // Về trang chủ
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 text-sm font-medium"
          >
            Về trang chủ
          </button>
          <button
            onClick={() => window.location.reload()} // Tải lại trang để thử lại
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Thử lại
          </button>
        </div>
      </div>
    );
  }

  // --- 3. GIAO DIỆN ĐANG CHỜ (BÌNH THƯỜNG) ---
  return (
    <div className="max-w-sm mx-auto bg-white border rounded-xl shadow-lg overflow-hidden relative">
      {/* Nút Hủy / Quay lại */}
      <button
        onClick={() => navigate("/cart")} // Quay về giỏ hàng
        className="absolute top-4 left-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white z-10"
        title="Hủy thanh toán"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="bg-orange-500 p-4 text-center">
        <h3 className="text-white font-bold text-lg">Quét mã thanh toán</h3>
        <p className="text-orange-100 text-sm">
          Đơn hàng sẽ hết hạn sau: <b>{formatTime(timeLeft)}</b>
        </p>
      </div>

      <div className="p-6 flex flex-col items-center">
        <img
          src={qrUrl}
          alt="QR Code"
          className="w-full h-auto rounded-lg border shadow-sm"
        />

        <div className="w-full mt-6 space-y-4">
          <div className="flex justify-between items-center border-b border-dashed pb-3">
            <span className="text-gray-500 text-sm">Tổng tiền</span>
            <span className="font-bold text-2xl text-orange-600">
              {new Intl.NumberFormat("vi-VN").format(amount)} đ
            </span>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 mb-1">Nội dung CK</p>
              <p className="font-mono font-bold text-blue-700 text-lg">
                {transferContent}
              </p>
            </div>
            <button
              onClick={() => handleCopy(transferContent)}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <Copy className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-orange-600 bg-orange-50 w-full py-3 rounded-lg border border-orange-100">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Đang chờ thanh toán ({formatTime(timeLeft)})</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentQR;
