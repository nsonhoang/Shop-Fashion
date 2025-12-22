import React from "react";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

// 1. Định nghĩa các kiểu style cho từng biến thể
const alertVariants = {
  success: {
    container: "bg-green-50 border-green-200 text-green-800",
    iconColor: "text-green-600",
    Icon: CheckCircle2,
  },
  error: {
    container: "bg-red-50 border-red-200 text-red-800",
    iconColor: "text-red-600",
    Icon: AlertCircle,
  },
  warning: {
    container: "bg-yellow-50 border-yellow-200 text-yellow-800",
    iconColor: "text-yellow-600",
    Icon: AlertTriangle,
  },
  info: {
    container: "bg-blue-50 border-blue-200 text-blue-800",
    iconColor: "text-blue-600",
    Icon: Info,
  },
};

const CustomAlert = ({
  type = "info", // Mặc định là 'info' nếu không truyền
  title,
  children, // Nội dung chi tiết của thông báo
  onClose, // Hàm xử lý khi đóng (nếu có sẽ hiện nút X)
  className = "", // Class tùy chỉnh thêm từ bên ngoài
}) => {
  // Lấy style và icon tương ứng với type
  const { container, iconColor, Icon } =
    alertVariants[type] || alertVariants.info;

  return (
    <div
      role="alert" // Quan trọng cho Accessibility
      className={`
        "relative w-full rounded-lg border p-4 flex items-start gap-3 transition-all",
        ${container}, // Áp dụng màu nền và màu chữ
        ${className} // Áp dụng class tùy chỉnh thêm
      `}
    >
      {/* Cột 1: Icon chính */}
      <div className="flex-shrink-0">
        <Icon className={`h-5 w-5 mt-0.5 ${iconColor}`} />
      </div>

      {/* Cột 2: Nội dung */}
      <div className="flex-1 md:pr-6">
        {title && <h3 className="text-sm font-semibold">{title}</h3>}
        <div className="text-sm mt-1 opacity-90 leading-relaxed">
          {children}
        </div>
      </div>

      {/* Cột 3: Nút đóng (Chỉ hiện nếu có prop onClose) */}
      {onClose && (
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1 rounded-md hover:bg-black/5 transition-colors ${iconColor}`}
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default CustomAlert;
