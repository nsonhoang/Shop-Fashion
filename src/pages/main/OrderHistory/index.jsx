import { useEffect, useState, useMemo } from "react";
import ListOrderHistory from "./components/ListOrderHistory";
import { useAuth } from "@/contexts/AuthContext";
import { getOrderByUserId } from "@/services/orderService";
import { toast } from "sonner";

// 1. Định nghĩa danh sách các trạng thái để tạo nút bấm
const STATUS_FILTERS = [
  { label: "Tất cả", value: "ALL" },
  { label: "Chờ", value: "PENDING" }, // Sửa value khớp với DB của bạn
  { label: "Đang xử lý", value: "PROCESSING" },
  { label: "Đang giao", value: "SHIPPED" },
  { label: "Hoàn thành", value: "DELIVERED" },
  { label: "Đã hủy", value: "CANCELLED" },
  { label: "Đã trả hàng", value: "RETURNED" },
];

function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  // 2. Thêm state để lưu trạng thái lọc hiện tại (Mặc định là ALL)
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrderByUserId(user.id);
        // Sắp xếp đơn mới nhất lên đầu (tuỳ chọn)
        const sortedOrders = ordersData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Không thể tải lịch sử đơn hàng.");
      }
    };

    if (user?.id) fetchOrders();
  }, [user.id]);

  // 3. Logic lọc dữ liệu (Dùng useMemo để tối ưu hiệu năng)
  const filteredOrders = useMemo(() => {
    if (filterStatus === "ALL") return orders;
    return orders.filter((order) => order.status === filterStatus);
  }, [orders, filterStatus]);

  return (
    <div>
      <div className="title mt-10">
        <h1 className="text-3xl md:text-4xl text-[#0f172a] mb-1 font-bold">
          Lịch sử mua hàng
        </h1>
        <p className="font-sans text-gray-500 text-base font-normal">
          Xem lại và theo dõi trạng thái các đơn hàng của bạn.
        </p>
      </div>

      {/* 4. Giao diện bộ lọc (Tabs) */}
      <div className="flex flex-wrap gap-2 my-6 pb-2 border-b overflow-x-auto scrollbar-hide">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status.value}
            onClick={() => setFilterStatus(status.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
              ${
                filterStatus === status.value
                  ? "bg-slate-900 text-white shadow-md" // Style khi được chọn
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200" // Style mặc định
              }
            `}
          >
            {status.label}
            {/* Hiển thị số lượng đơn hàng tương ứng (Option) */}
            <span className="ml-2 text-xs opacity-80">
              (
              {status.value === "ALL"
                ? orders.length
                : orders.filter((o) => o.status === status.value).length}
              )
            </span>
          </button>
        ))}
      </div>

      {/* 5. Truyền danh sách ĐÃ LỌC xuống component hiển thị */}
      <div className="min-h-[300px]">
        {filteredOrders.length > 0 ? (
          <ListOrderHistory orders={filteredOrders} />
        ) : (
          <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
            <p>Không tìm thấy đơn hàng nào ở trạng thái này.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
