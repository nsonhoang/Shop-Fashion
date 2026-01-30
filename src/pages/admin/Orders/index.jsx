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
import { Search, Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
} from "@/services/orderService";
import OrderDetailDialog from "./components/OrderDetailDialog";

// Map màu sắc cho trạng thái (Key phải viết thường để khớp logic bên dưới)
const statusColors = {
  completed: "bg-green-100 text-green-800 border-green-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  delivered: "bg-purple-100 text-purple-800 border-purple-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

// Helper format tiền tệ VND
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// Helper format ngày tháng
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const ordersData = await getOrders();
        setOrders(ordersData || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  console.log("Danh sách đơn hàng:", orders);
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };
  // Logic lọc dữ liệu
  const filteredOrders = orders.filter((order) => {
    // 1. Lọc theo Search (Tìm ID hoặc Tên khách)
    const searchLower = searchQuery.toLowerCase();
    const orderIdMatch = order.order_id.toLowerCase().includes(searchLower);
    const customerNameMatch = order.profiles?.full_name
      ?.toLowerCase()
      .includes(searchLower);
    const matchesSearch = orderIdMatch || customerNameMatch;

    // 2. Lọc theo Status
    // Lưu ý: API trả về "PENDING", cần toLowerCase() để so sánh
    const currentStatus = order.status?.toLowerCase() || "";
    const matchesStatus =
      statusFilter === "all" || currentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      // --- TRƯỜNG HỢP 1: GIAO THÀNH CÔNG (DELIVERED + PAYMENT COMPLETED) ---
      if (newStatus === "DELIVERED") {
        await confirmDelivery(orderId);

        // Update UI
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
      }

      // --- TRƯỜNG HỢP 2: HỦY ĐƠN (CANCELLED + PAYMENT FAILED) ---
      else if (newStatus === "CANCELLED") {
        if (!confirm("Bạn chắc chắn muốn hủy đơn này?")) return;
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
      }

      // --- TRƯỜNG HỢP 3: CÁC TRẠNG THÁI KHÁC (PROCESSING, SHIPPED) ---
      else {
        await updateOrderStatus(orderId, newStatus);

        setOrders((prev) =>
          prev.map((order) =>
            order.order_id === orderId
              ? { ...order, status: newStatus }
              : order,
          ),
        );
      }
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái đơn hàng:", error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div>
      <AdminHeader title="Quản lý Đơn hàng" />
      <div className="p-6 space-y-6">
        {/* Action Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
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
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="pending">Pending (Đang chờ)</SelectItem>
              <SelectItem value="processing">
                Processing (Đang xử lý)
              </SelectItem>
              <SelectItem value="delivered">Delivered (Đã giao)</SelectItem>
              <SelectItem value="completed">Completed (Hoàn thành)</SelectItem>
              <SelectItem value="cancelled">Cancelled (Đã hủy)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table Card */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead className="text-center">Số lượng</TableHead>
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
                      Đang tải dữ liệu...
                    </TableCell>
                  </TableRow>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    // Tính tổng số lượng item trong đơn
                    const totalItems = (order.order_items || []).reduce(
                      (sum, item) => sum + item.quantity,
                      0,
                    );

                    // Chuẩn hóa status để lấy màu
                    const normalizedStatus = order.status?.toLowerCase();

                    return (
                      <TableRow key={order.order_id}>
                        <TableCell className="font-medium text-xs">
                          {/* Cắt ngắn UUID cho gọn */}#
                          {order.order_id.slice(0, 8)}...
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {order.profiles?.full_name || "Khách vãng lai"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {order.profiles?.email || "No email"}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="text-center">
                          {totalItems}
                        </TableCell>

                        <TableCell className="text-right font-medium">
                          {formatCurrency(order.total_amount)}
                        </TableCell>

                        <TableCell>
                          <Badge
                            className={`capitalize ${
                              statusColors[normalizedStatus] ||
                              "bg-gray-100 text-gray-800"
                            }`}
                            variant="secondary"
                          >
                            {normalizedStatus}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-xs text-muted-foreground">
                          {formatDate(order.created_at)}
                        </TableCell>

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleViewDetails(order)}
                              >
                                <Eye className="h-4 w-4 mr-2" /> Xem chi tiết
                              </DropdownMenuItem>

                              {/* 1. Pending -> Processing (Duyệt đơn) */}
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

                              {/* 2. Processing -> Shipped (Giao cho ship) - MỚI */}
                              {normalizedStatus === "processing" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus(
                                      order.order_id,
                                      "SHIPPED",
                                    )
                                  }
                                >
                                  Đã gửi hàng đi (Shipped)
                                </DropdownMenuItem>
                              )}

                              {/* 3. Shipped -> Delivered (Ship báo thành công) */}
                              {/* Ở bước này mới chốt tiền (Payment Completed) */}
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
                                  Khách đã nhận & Trả tiền
                                </DropdownMenuItem>
                              )}

                              {/* Nút Hủy (Hiện khi chưa Giao thành công hoặc chưa Hủy) */}
                              {["pending", "processing", "shipped"].includes(
                                normalizedStatus,
                              ) && (
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
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
                    <TableCell colSpan={7} className="text-center py-8">
                      Không tìm thấy đơn hàng nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {/*dialog xem chi tiết  */}
      <OrderDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrdersAdminPage;
