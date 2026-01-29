import React, { useEffect, useState } from "react";
import { Eye, Loader2 } from "lucide-react";
import { formatMoney } from "@/utils/formatMoney";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase"; // Đảm bảo đường dẫn import đúng

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm lấy dữ liệu từ Supabase
  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select(
            `
            order_id,
            created_at,
            total_amount,
            status,
            profiles (
              full_name,
              email
            )
          `,
          )
          .order("created_at", { ascending: false }) // Sắp xếp mới nhất trước
          .limit(10); // Lấy 10 đơn

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error("Lỗi lấy danh sách đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  const getStatusBadge = (status) => {
    // Chuyển status về chữ thường để map với config
    const normalizedStatus = status?.toLowerCase() || "pending";

    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Chờ xác nhận",
      },
      processing: { color: "bg-blue-100 text-blue-800", label: "Đang xử lý" },
      shipped: { color: "bg-purple-100 text-purple-800", label: "Đang giao" }, // Sửa 'shipping' thành 'shipped' nếu DB lưu quá khứ phân từ
      shipping: { color: "bg-purple-100 text-purple-800", label: "Đang giao" },
      delivered: { color: "bg-green-100 text-green-800", label: "Đã giao" },
      cancelled: { color: "bg-red-100 text-red-800", label: "Đã hủy" },
      returned: { color: "bg-orange-100 text-orange-800", label: "Trả hàng" },
    };

    const config = statusConfig[normalizedStatus] || statusConfig.pending;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Đơn hàng gần đây
        </h3>
        <Link
          to="/admin/orders"
          className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-700"
        >
          <Eye size={16} className="mr-1" />
          Xem tất cả
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="text-left text-sm text-gray-600 border-b">
              <th className="pb-3 font-medium">Mã đơn</th>
              <th className="pb-3 font-medium">Khách hàng</th>
              <th className="pb-3 font-medium">Ngày đặt</th>
              <th className="pb-3 font-medium">Số tiền</th>
              <th className="pb-3 font-medium">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  Chưa có đơn hàng nào.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.order_id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 text-sm font-medium font-mono">
                    #{order.order_id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="py-3 text-sm">
                    <div className="font-medium text-gray-900">
                      {order.profiles?.full_name || "Khách vãng lai"}
                    </div>
                    {/* Nếu muốn hiện email thì bỏ comment dòng dưới */}
                    {/* <div className="text-xs text-gray-500">{order.profiles?.email}</div> */}
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="py-3 text-sm font-medium text-blue-600">
                    {formatMoney(order.total_amount)}
                  </td>
                  <td className="py-3">{getStatusBadge(order.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
