import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, MoreHorizontal, RotateCcw, Banknote } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminHeader } from "@/layouts/admin/component/header";
import {
  cancelOrder,
  confirmDelivery,
  getOrders,
  updateOrderStatus,
  updatePaymentStatus, // Đảm bảo đã import hàm này từ service
} from "@/services/orderService";
import { toast } from "sonner";
import OrderDetailDialog from "./components/OrderDetailDialog";

// 1. CẤU HÌNH MÀU SẮC TRẠNG THÁI
const statusColors = {
  completed: "bg-green-100 text-green-800 border-green-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  returned: "bg-orange-100 text-orange-800 border-orange-200",
  refunded: "bg-purple-100 text-purple-800 border-purple-200", // Màu tím cho hoàn tiền
};

// Helper: Format tiền tệ
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// Helper: Format ngày tháng
const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const OrdersAdminPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Load danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const ordersData = await getOrders();
        // Sắp xếp đơn mới nhất lên đầu
        const sortedOrders = (ordersData || []).sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Lỗi tải đơn hàng:", error);
        toast.error("Không thể tải danh sách đơn hàng");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  // Logic lọc (Search + Filter)
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchQuery.toLowerCase();
    const orderIdMatch = order.order_id.toLowerCase().includes(searchLower);
    const customerNameMatch = order.profiles?.full_name
      ?.toLowerCase()
      .includes(searchLower);
    const matchesSearch = orderIdMatch || customerNameMatch;

    const currentStatus = order.status?.toLowerCase() || "";
    const matchesStatus =
      statusFilter === "all" || currentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // --- HÀM XỬ LÝ CẬP NHẬT TRẠNG THÁI ---
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      // TRƯỜNG HỢP 1: HOÀN TIỀN (REFUNDED) -> Gọi updatePaymentStatus
      if (newStatus === "REFUND_MONEY") {
        const confirmRefund = window.confirm(
          "Xác nhận đã nhận hàng hoàn và muốn hoàn tiền cho khách?",
        );
        if (!confirmRefund) return;

        // Gọi API: Chỉ truyền ID và Status (đúng với hàm bạn viết cho bảng payments riêng)
        await updatePaymentStatus(orderId, "REFUNDED");

        // Update UI (Giả lập cập nhật Payment Status trong state)
        setOrders((prev) =>
          prev.map((order) =>
            order.order_id === orderId
              ? {
                  ...order,
                  status: order.status, // Order Status giữ nguyên (RETURNED)
                  payments: {
                    ...order.payments,
                    status: "REFUNDED", // Payment Status đổi thành REFUNDED
                  },
                }
              : order,
          ),
        );
        toast.success("Đã hoàn tiền thành công!");
      }

      // TRƯỜNG HỢP 2: GIAO THÀNH CÔNG (DELIVERED)
      else if (newStatus === "DELIVERED") {
        await confirmDelivery(orderId);
        setOrders((prev) =>
          prev.map((order) =>
            order.order_id === orderId
              ? {
                  ...order,
                  status: "DELIVERED",
                  payments: { ...order.payments, status: "COMPLETED" },
                }
              : order,
          ),
        );
        toast.success("Cập nhật giao hàng thành công!");
      }

      // TRƯỜNG HỢP 3: HỦY ĐƠN (CANCELLED)
      else if (newStatus === "CANCELLED") {
        if (
          !confirm(
            "Bạn chắc chắn muốn hủy đơn này? Hành động không thể hoàn tác.",
          )
        )
          return;
        await cancelOrder(orderId);
        setOrders((prev) =>
          prev.map((order) =>
            order.order_id === orderId
              ? {
                  ...order,
                  status: "CANCELLED",
                  payments: { ...order.payments, status: "FAILED" },
                }
              : order,
          ),
        );
        toast.success("Đã hủy đơn hàng");
      }

      // TRƯỜNG HỢP 4: CÁC TRẠNG THÁI KHÁC
      else {
        await updateOrderStatus(orderId, newStatus);
        setOrders((prev) =>
          prev.map((order) =>
            order.order_id === orderId
              ? { ...order, status: newStatus }
              : order,
          ),
        );
        toast.success(`Cập nhật trạng thái: ${newStatus}`);
      }
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      toast.error("Cập nhật thất bại: " + error.message);
    }
  };

  return (
    <div>
      <AdminHeader title="Quản lý Đơn hàng" />
      <div className="p-6 space-y-6">
        {/* Thanh công cụ: Search & Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-1 w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo Mã đơn hoặc Tên khách..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="pending">Chờ xác nhận</SelectItem>
              <SelectItem value="processing">Đang xử lý</SelectItem>
              <SelectItem value="shipped">Đang giao</SelectItem>
              <SelectItem value="delivered">Đã giao</SelectItem>
              <SelectItem value="returned">Khách trả hàng</SelectItem>
              <SelectItem value="cancelled">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bảng dữ liệu */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead className="text-center">SL</TableHead>
                  <TableHead className="text-right">Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex justify-center items-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></span>
                        Đang tải dữ liệu...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    // Tính tổng số lượng item
                    const totalItems = (order.order_items || []).reduce(
                      (sum, item) => sum + item.quantity,
                      0,
                    );
                    const normalizedStatus = order.status?.toLowerCase();

                    // --- LOGIC HIỂN THỊ QUAN TRỌNG ---
                    // Kiểm tra Payment Status xem đã hoàn tiền chưa
                    const isRefunded = order.payments?.status === "REFUNDED";

                    return (
                      <TableRow key={order.order_id}>
                        <TableCell className="font-mono text-xs font-medium">
                          #{order.order_id.slice(0, 8).toUpperCase()}
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">
                              {order.profiles?.full_name || "Khách vãng lai"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {order.profiles?.email || ""}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="text-center text-sm">
                          {totalItems}
                        </TableCell>

                        <TableCell className="text-right font-medium text-sm">
                          {formatCurrency(order.total_amount)}
                        </TableCell>

                        {/* BADGE TRẠNG THÁI */}
                        <TableCell>
                          <Badge
                            className={`capitalize border px-2 py-0.5 shadow-sm ${
                              // Nếu đã hoàn tiền -> Màu tím
                              // Nếu chưa -> Màu theo status đơn hàng
                              isRefunded
                                ? statusColors["refunded"]
                                : statusColors[normalizedStatus] ||
                                  "bg-gray-100 text-gray-800"
                            }`}
                            variant="secondary"
                          >
                            {/* Logic hiển thị text */}
                            {isRefunded ? (
                              "Đã hoàn tiền"
                            ) : (
                              <>
                                {normalizedStatus === "pending" &&
                                  "Chờ xác nhận"}
                                {normalizedStatus === "processing" &&
                                  "Đang xử lý"}
                                {normalizedStatus === "shipped" && "Đang giao"}
                                {normalizedStatus === "delivered" && "Đã giao"}
                                {normalizedStatus === "cancelled" && "Đã hủy"}
                                {normalizedStatus === "returned" && "Trả hàng"}
                              </>
                            )}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-xs text-muted-foreground">
                          {formatDate(order.created_at)}
                        </TableCell>

                        {/* ACTIONS MENU */}
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                              <DropdownMenuItem
                                onClick={() => handleViewDetails(order)}
                              >
                                <Eye className="h-4 w-4 mr-2" /> Xem chi tiết
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              {/* 1. Pending -> Processing */}
                              {normalizedStatus === "pending" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus(
                                      order.order_id,
                                      "PROCESSING",
                                    )
                                  }
                                >
                                  Duyệt đơn (Đóng gói)
                                </DropdownMenuItem>
                              )}

                              {/* 2. Processing -> Shipped */}
                              {normalizedStatus === "processing" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus(
                                      order.order_id,
                                      "SHIPPED",
                                    )
                                  }
                                >
                                  Giao cho vận chuyển
                                </DropdownMenuItem>
                              )}

                              {/* 3. Shipped -> Delivered */}
                              {normalizedStatus === "shipped" && (
                                <DropdownMenuItem
                                  className="text-green-600 font-medium"
                                  onClick={() =>
                                    handleUpdateStatus(
                                      order.order_id,
                                      "DELIVERED",
                                    )
                                  }
                                >
                                  Xác nhận giao thành công
                                </DropdownMenuItem>
                              )}

                              {/* 4. Delivered -> Returned */}
                              {normalizedStatus === "delivered" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus(
                                      order.order_id,
                                      "RETURNED",
                                    )
                                  }
                                >
                                  <RotateCcw className="h-4 w-4 mr-2" /> Khách
                                  yêu cầu trả hàng
                                </DropdownMenuItem>
                              )}

                              {/* 5. Returned -> Refunded (Quan trọng) */}
                              {/* Chỉ hiện khi đơn là Returned VÀ chưa Hoàn tiền */}
                              {normalizedStatus === "returned" &&
                                !isRefunded && (
                                  <DropdownMenuItem
                                    className="text-purple-600 font-medium"
                                    onClick={() =>
                                      handleUpdateStatus(
                                        order.order_id,
                                        "REFUND_MONEY",
                                      )
                                    }
                                  >
                                    <Banknote className="h-4 w-4 mr-2" /> Xác
                                    nhận hoàn tiền
                                  </DropdownMenuItem>
                                )}

                              <DropdownMenuSeparator />

                              {/* Nút Hủy */}
                              {["pending", "processing", "shipped"].includes(
                                normalizedStatus,
                              ) && (
                                <DropdownMenuItem
                                  className="text-red-600 focus:text-red-700"
                                  onClick={() =>
                                    handleUpdateStatus(
                                      order.order_id,
                                      "CANCELLED",
                                    )
                                  }
                                >
                                  Hủy đơn hàng
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-12 text-muted-foreground"
                    >
                      Không tìm thấy đơn hàng nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Dialog chi tiết */}
      <OrderDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrdersAdminPage;
