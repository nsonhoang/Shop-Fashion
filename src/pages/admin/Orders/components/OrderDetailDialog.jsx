import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  MapPin,
  Calendar,
  CreditCard,
  Package,
  Truck,
  Phone,
  Mail,
} from "lucide-react";

// --- HELPERS ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount || 0);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Map màu cho Order Status
const orderStatusColors = {
  completed: "bg-green-100 text-green-800 border-green-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  delivered: "bg-purple-100 text-purple-800 border-purple-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

// Map màu cho Payment Status
const paymentStatusColors = {
  paid: "text-green-600 bg-green-50 border-green-100",
  pending: "text-yellow-600 bg-yellow-50 border-yellow-100",
  failed: "text-red-600 bg-red-50 border-red-100",
};

export default function OrderDetailDialog({ open, onOpenChange, order }) {
  if (!order) return null;

  // Chuẩn hóa status về chữ thường để map màu
  const normalizedStatus = order.status?.toLowerCase() || "pending";
  const paymentStatus = order.payments?.status?.toLowerCase() || "pending";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto">
        {/* --- HEADER --- */}
        <DialogHeader className="mb-2">
          <div className="flex items-center justify-between pr-8">
            <div className="flex flex-col gap-1">
              <DialogTitle className="text-xl flex items-center gap-2">
                Đơn hàng #{order.order_id?.slice(0, 8).toUpperCase()}
              </DialogTitle>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(order.created_at)}
              </div>
            </div>

            <Badge
              className={`capitalize px-3 py-1 ${
                orderStatusColors[normalizedStatus] || "bg-gray-100"
              }`}
              variant="outline"
            >
              {normalizedStatus}
            </Badge>
          </div>
        </DialogHeader>

        <Separator />

        <div className="space-y-6 py-4">
          {/* --- INFO GRID (3 CỘT) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Khách hàng */}
            <div className="border rounded-lg p-4 space-y-3 bg-slate-50/50">
              <h4 className="font-semibold flex items-center gap-2 text-sm text-gray-700">
                <User className="w-4 h-4" /> Khách hàng
              </h4>
              <Separator className="bg-slate-200" />
              <div className="text-sm space-y-2">
                <p className="font-medium">
                  {order.profiles?.full_name || "Khách vãng lai"}
                </p>
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Mail className="w-3 h-3" />
                  <span
                    className="truncate max-w-[150px]"
                    title={order.profiles?.email}
                  >
                    {order.profiles?.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Phone className="w-3 h-3" />
                  <span>{order.profiles?.phone_number || "Không có SĐT"}</span>
                </div>
              </div>
            </div>

            {/* 2. Giao hàng */}
            <div className="border rounded-lg p-4 space-y-3 bg-slate-50/50">
              <h4 className="font-semibold flex items-center gap-2 text-sm text-gray-700">
                <MapPin className="w-4 h-4" /> Giao đến
              </h4>
              <Separator className="bg-slate-200" />
              <div className="text-sm space-y-1">
                <p className="font-medium text-gray-900">
                  {order.addresses?.street || "Chưa có đường"}
                </p>
                <p className="text-muted-foreground">
                  {order.addresses?.city || "Chưa có thành phố"}
                </p>
                {/* Check nếu có shipment info */}
                {order.shipments && (
                  <div className="mt-2 pt-2 border-t border-dashed border-gray-300">
                    <p className="text-xs text-blue-600 font-medium flex items-center gap-1">
                      <Truck className="w-3 h-3" /> Đang giao hàng
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Thanh toán */}
            <div className="border rounded-lg p-4 space-y-3 bg-slate-50/50">
              <h4 className="font-semibold flex items-center gap-2 text-sm text-gray-700">
                <CreditCard className="w-4 h-4" /> Thanh toán
              </h4>
              <Separator className="bg-slate-200" />
              <div className="text-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-xs">
                    Phương thức:
                  </span>
                  <span className="font-medium">
                    {order.payments?.method || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-xs">
                    Trạng thái:
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-[10px] h-5 px-1.5 ${paymentStatusColors[paymentStatus] || ""}`}
                  >
                    {paymentStatus.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-muted-foreground text-xs">
                    Tổng tiền:
                  </span>
                  <span className="font-bold text-primary">
                    {formatCurrency(
                      order.payments?.amount || order.total_amount,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* --- DANH SÁCH SẢN PHẨM --- */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2 text-sm">
              <Package className="w-4 h-4" /> Sản phẩm (
              {order.order_items?.length || 0})
            </h4>
            <div className="border rounded-lg divide-y overflow-hidden">
              {order.order_items?.map((item) => {
                // Safety check object lồng nhau
                const variant = item.product_variants || {};
                const product = variant.products || {};

                return (
                  <div
                    key={item.order_item_id}
                    className="p-3 flex items-center gap-4 hover:bg-slate-50 transition-colors"
                  >
                    {/* Ảnh sản phẩm */}
                    <div className="h-14 w-14 rounded border bg-white overflow-hidden shrink-0 relative">
                      <img
                        src={variant.image_url || "https://placehold.co/100"}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Thông tin chi tiết */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate text-gray-900">
                        {product.name || "Sản phẩm không tên"}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 h-5 font-normal text-gray-500 bg-gray-100 hover:bg-gray-200"
                        >
                          {variant.color}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 h-5 font-normal text-gray-500 bg-gray-100 hover:bg-gray-200"
                        >
                          Size: {variant.size}
                        </Badge>
                        <span className="text-[10px] text-gray-400 flex items-center">
                          SKU: {variant.sku}
                        </span>
                      </div>
                    </div>

                    {/* Giá & Số lượng */}
                    <div className="text-right">
                      <p className="font-medium text-sm">
                        {formatCurrency(item.price_at_purchase)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        x{item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- TỔNG KẾT --- */}
          <div className="flex flex-col items-end gap-2 pt-2 border-t mt-4">
            <div className="w-full max-w-[250px] space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tạm tính:</span>
                <span>{formatCurrency(order.total_amount)}</span>
              </div>
              {/* Nếu JSON có phí ship thì thêm vào đây, hiện tại JSON không có nên bỏ qua hoặc hardcode 0đ */}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phí vận chuyển:</span>
                <span>0 đ</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold text-primary">
                <span>Tổng cộng:</span>
                <span>{formatCurrency(order.total_amount)}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
