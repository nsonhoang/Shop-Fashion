import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Truck,
  Package,
  Clock,
  RotateCcw,
  AlertCircle,
  XCircle,
  MapPin,
  CreditCard,
  User,
  Phone,
  Loader2,
} from "lucide-react";
import ItemOrderHistory from "./ItemOrderHistory";
import { formatMoney } from "@/utils/formatMoney";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateOrderStatus } from "@/services/orderService";

// --- CONFIG TRẠNG THÁI ---
const getStatusConfig = (status) => {
  switch (status) {
    case "PENDING":
      return {
        color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        icon: <Clock className="w-3.5 h-3.5" />,
        text: "Chờ xác nhận",
      };
    case "PROCESSING":
      return {
        color: "text-indigo-600 bg-indigo-50 border-indigo-200",
        icon: <Package className="w-3.5 h-3.5" />,
        text: "Đang xử lý",
      };
    case "SHIPPED":
      return {
        color: "text-blue-600 bg-blue-50 border-blue-200",
        icon: <Truck className="w-3.5 h-3.5" />,
        text: "Đang giao hàng",
      };
    case "DELIVERED":
      return {
        color: "text-green-600 bg-green-50 border-green-200",
        icon: <CheckCircle className="w-3.5 h-3.5" />,
        text: "Giao thành công",
      };
    case "CANCELLED":
      return {
        color: "text-red-600 bg-red-50 border-red-200",
        icon: <XCircle className="w-3.5 h-3.5" />,
        text: "Đã hủy",
      };
    case "RETURNED":
      return {
        color: "text-orange-600 bg-orange-50 border-orange-200",
        icon: <RotateCcw className="w-3.5 h-3.5" />,
        text: "Trả hàng",
      };
    default:
      return {
        color: "text-gray-500 bg-gray-50 border-gray-200",
        icon: <AlertCircle className="w-3.5 h-3.5" />,
        text: "Không xác định",
      };
  }
};

const ListOrderHistory = ({ orders }) => {
  const [orderList, setOrderList] = useState(orders || []);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    setOrderList(orders || []);
  }, [orders]);

  const handleCancelClick = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;
    setLoadingId(orderId);
    try {
      await updateOrderStatus(orderId, "CANCELLED");
      setOrderList((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId
            ? { ...order, status: "CANCELLED" }
            : order,
        ),
      );
      toast.success("Hủy đơn hàng thành công");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi hủy đơn hàng");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full mx-auto p-4 space-y-6 font-sans">
      {orderList.map((order) => {
        const statusConfig = getStatusConfig(order.status);
        const orderDate = new Date(order.created_at).toLocaleDateString(
          "vi-VN",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          },
        );

        // --- XỬ LÝ DỮ LIỆU ---
        const paymentLabel =
          order.payments?.method === "COD"
            ? "Thanh toán khi nhận hàng (COD)"
            : order.payments?.method;

        const isPaid =
          order.payments?.status === "SUCCESS" ||
          order.payments?.status === "COMPLETED";

        // 1. Lấy dữ liệu shipment an toàn
        const shipment = order.shipments || {};

        // 2. Format ngày giao dự kiến
        const estimatedDate = shipment.estimated_delivery
          ? new Date(shipment.estimated_delivery).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "Đang cập nhật";

        // 3. Lấy mã vận đơn
        const trackingNumber = shipment.tracking_number;

        const canCancel = order.status === "PENDING";

        return (
          <div
            key={order.order_id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex flex-wrap justify-between items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 uppercase">
                    Mã đơn:
                  </span>
                  <span className="font-mono font-medium text-gray-900">
                    #{order.order_id.slice(0, 8).toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Đặt lúc: {orderDate}
                </div>
              </div>
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}
              >
                {statusConfig.icon}
                {statusConfig.text}
              </div>
            </div>

            {/* Body */}
            <ItemOrderHistory items={order.order_items} />

            {/* Info Section */}
            <div className="px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 bg-gray-50/50">
              {/* Cột 1: Địa chỉ & Người nhận */}
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Địa chỉ nhận hàng
                    </p>
                    <p className="text-gray-600 line-clamp-2">
                      {order.addresses?.street}, {order.addresses?.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-gray-600">
                    {order.profiles?.full_name}
                  </span>
                  <span className="text-gray-300">|</span>
                  <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                  <span className="text-gray-600">
                    {order.profiles?.phone_number}
                  </span>
                </div>
              </div>

              {/* Cột 2: Thanh toán & Vận chuyển */}
              <div className="space-y-3 text-sm md:text-right">
                {/* Thông tin thanh toán */}
                <div className="flex md:justify-end items-start gap-2">
                  <div className="md:order-2">
                    <CreditCard className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Thanh toán</p>
                    <p className="text-gray-600">{paymentLabel}</p>
                    <p
                      className={`text-xs font-semibold mt-0.5 ${
                        isPaid ? "text-green-600" : "text-orange-500"
                      }`}
                    >
                      {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                    </p>
                  </div>
                </div>

                {/* Thông tin vận chuyển */}
                <div className="flex md:justify-end items-start gap-2 pt-2 border-t border-gray-200 md:border-0 md:pt-0">
                  <div className="md:order-2">
                    <Truck className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Vận chuyển</p>

                    <div className="text-gray-600 flex items-center md:justify-end gap-1">
                      <span className="text-xs text-gray-400">
                        Dự kiến giao:
                      </span>
                      <span>{estimatedDate}</span>
                    </div>

                    {/* Chỉ hiện Tracking nếu có dữ liệu */}
                    {trackingNumber && (
                      <div className="mt-1">
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 font-mono inline-block">
                          {trackingNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="w-full sm:w-auto">
                {canCancel && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    onClick={() => handleCancelClick(order.order_id)}
                    disabled={loadingId === order.order_id}
                  >
                    {loadingId === order.order_id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang
                        hủy...
                      </>
                    ) : (
                      "Hủy đơn hàng"
                    )}
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-sm text-gray-600">Tổng cộng:</span>
                <span className="text-xl font-bold text-red-600">
                  {formatMoney(order.total_amount)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListOrderHistory;
