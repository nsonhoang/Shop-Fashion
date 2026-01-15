// components/Loading.jsx
export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
      }}
    >
      Loading...
    </div>
  );
}
import { Loader2 } from "lucide-react";

// Phiên bản 1: Icon xoay đơn giản
export const LoadingSpinner = ({ className }) => {
  return <Loader2 className={`animate-spin text-primary ${className}`} />;
};

// Phiên bản 2: Màn hình phủ (Overlay) dùng cho Table hoặc Form
export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-[1px] rounded-lg">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="text-sm font-medium text-slate-600">
          Đang xử lý...
        </span>
      </div>
    </div>
  );
}
