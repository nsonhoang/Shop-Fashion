import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  CreditCard,
  Shield,
  User,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";

// 1. Helper Format Tiền tệ
const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value || 0,
  );

// 2. Helper Format Ngày tháng
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// 3. Helper lấy chữ cái đầu tên
const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

export function CustomerDetailDialog({ customer, open, onOpenChange }) {
  // Nếu chưa chọn khách hàng (null) thì không render gì cả
  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] bg-white">
        <DialogHeader>
          <DialogTitle>Hồ sơ người dùng</DialogTitle>
          <DialogDescription>
            Chi tiết thông tin cá nhân và lịch sử hoạt động hệ thống.
          </DialogDescription>
        </DialogHeader>

        {/* --- PHẦN 1: HEADER (AVATAR + TÊN + ROLE) --- */}
        <div className="flex flex-col md:flex-row items-center gap-6 py-6">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={customer.avatar_url} alt={customer.full_name} />
              <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                {getInitials(customer.full_name)}
              </AvatarFallback>
            </Avatar>
            {/* Dot trạng thái online (giả lập) */}
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></span>
          </div>

          <div className="text-center md:text-left space-y-2 flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {customer.full_name}
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              {/* Badge Role */}
              {customer.role === "ADMIN" && (
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200 px-3 py-1">
                  <Shield className="w-3.5 h-3.5 mr-1.5" /> Quản trị viên
                </Badge>
              )}
              {customer.role === "STAFF" && (
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 px-3 py-1">
                  <User className="w-3.5 h-3.5 mr-1.5" /> Nhân viên
                </Badge>
              )}
              {customer.role === "CUSTOMER" && (
                <Badge variant="outline" className="px-3 py-1 text-gray-600">
                  Khách hàng
                </Badge>
              )}

              {/* ID User (ẩn bớt cho gọn) */}
              <span className="text-xs text-muted-foreground font-mono bg-gray-100 px-2 py-1 rounded">
                ID: {customer.id.split("-")[0]}...
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* --- PHẦN 2: NỘI DUNG CHI TIẾT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
          {/* CỘT TRÁI: THÔNG TIN LIÊN HỆ */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              Thông tin liên hệ
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Email</p>
                  <p className="text-sm text-gray-900 font-medium break-all">
                    {customer.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-green-50 rounded-lg text-green-600 group-hover:bg-green-100 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Số điện thoại
                  </p>
                  <p className="text-sm text-gray-900 font-medium">
                    {customer.phone_number || "Chưa cập nhật"}
                  </p>
                </div>
              </div>

              {/* Địa chỉ (Xử lý Mock Data Address Object) */}
              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-orange-50 rounded-lg text-orange-600 group-hover:bg-orange-100 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                    Địa chỉ mặc định
                    {customer.address?.is_default && (
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                    )}
                  </p>
                  {customer.address ? (
                    <div className="text-sm text-gray-900">
                      <p className="font-medium">{customer.address.street}</p>
                      <p className="text-muted-foreground">
                        {customer.address.city}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      Chưa có địa chỉ giao hàng
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: THÔNG TIN TÀI CHÍNH & HOẠT ĐỘNG */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              Hoạt động & Tài chính
            </h3>

            {/* Thẻ thống kê nhỏ */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4">
              {/* Tổng chi tiêu */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Tổng chi tiêu</span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(customer.total_spent)}
                </span>
              </div>

              <Separator className="bg-gray-200" />

              {/* Ngày tham gia */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Tham gia ngày</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {formatDate(customer.created_at)}
                </span>
              </div>

              {/* Trạng thái đơn hàng (Ví dụ thêm) */}
              {/* {customer.role === "CUSTOMER" && (
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-100">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Người dùng này thường mua các sản phẩm thời trang nam.
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
