import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import PaymentQR from "@/components/PaymentQr";
import { Button } from "@/components/ui/button";
import { getPaymentById } from "@/services/paymentService";

function PaymentPage() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  // 1. Khởi tạo State
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        setLoading(true);
        // Gọi API lấy thông tin
        // Giả sử API trả về object: { payment_id, order_id, amount, status, ... }
        const data = await getPaymentById(paymentId);

        if (!data) {
          setError("Không tìm thấy thông tin thanh toán");
        } else {
          setPaymentData(data);
        }
      } catch (error) {
        console.error("Lỗi:", error);
        setError("Có lỗi xảy ra khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    if (paymentId) fetchPayment();
  }, [paymentId]);

  // --- TRƯỜNG HỢP 1: ĐANG TẢI ---
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-gray-500">Đang tải thông tin thanh toán...</p>
      </div>
    );
  }

  // --- TRƯỜNG HỢP 2: CÓ LỖI ---
  if (error || !paymentData) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg font-medium text-red-600">
          {error || "Lỗi không xác định"}
        </p>
        <Button onClick={() => navigate("/")}>Về trang chủ</Button>
      </div>
    );
  }

  // --- TRƯỜNG HỢP 3: ĐÃ THANH TOÁN RỒI ---
  // (Nếu khách F5 lại trang này mà đơn đã xong)
  if (paymentData.status === "COMPLETED" || paymentData.status === "SUCCESS") {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4 bg-green-50">
        <CheckCircle className="h-16 w-16 text-green-600" />
        <h1 className="text-2xl font-bold text-green-700">
          Đơn này đã được thanh toán!
        </h1>
        <p className="text-gray-600">Cảm ơn bạn đã mua hàng.</p>
        <Button onClick={() => navigate("/orders")}>
          Xem lịch sử đơn hàng
        </Button>
      </div>
    );
  }

  // --- TRƯỜNG HỢP 4: HIỂN THỊ MÃ QR (PENDING) ---
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Cổng Thanh Toán</h1>
          <p className="text-sm text-gray-500 mt-1">
            Mã giao dịch:{" "}
            <span className="font-mono">{paymentData.payment_id}</span>
          </p>
        </div>

        {/* Nhúng Component PaymentQR */}
        {/* Lưu ý: Truyền đúng tên trường dữ liệu từ API trả về */}
        <PaymentQR
          orderId={paymentData.order_id} // Dùng ID đơn hàng để tạo nội dung CK (DH...)
          amount={paymentData.amount} // Số tiền cần thanh toán
        />

        {/* Nút quay lại */}
        <div className="text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:text-gray-800 underline"
          >
            Quay lại trang trước
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
