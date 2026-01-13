import React, { useState } from "react";
import { AdminHeader } from "@/layouts/admin/component/header";
// Import các icon từ lucide-react (hoặc thư viện icon bạn dùng)
import {
  Search,
  Package,
  AlertTriangle,
  XCircle,
  CheckCircle2,
} from "lucide-react";
// Import các component UI (Shadcn UI)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// --- MOCK DATA (Cấu trúc mới) ---
export const MOCK_INVENTORY = [
  {
    inventory_id: "inv_001",
    quantity_available: 200,
    quantity_reserved: 5,
    updated_at: "2025-01-12T08:00:00Z",
    variant: {
      variant_id: "v_001",
      product_id: "p_001",
      name: "Áo Thun Basic Cotton",
      sku: "TSHIRT-WHT-L",
      size: "L",
      color: "White",
      price: 150000,
      image_url:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60",
      is_active: true,
    },
  },
  {
    inventory_id: "inv_002",
    quantity_available: 15,
    quantity_reserved: 12,
    // -> Sellable: 3
    updated_at: "2025-01-12T10:30:00Z",
    variant: {
      variant_id: "v_002",
      product_id: "p_002",
      name: "Quần Jean Slim Fit",
      sku: "JEAN-BLU-32",
      size: "32",
      color: "Navy Blue",
      price: 450000,
      image_url:
        "https://images.unsplash.com/photo-1542272617-08f0863200ed?auto=format&fit=crop&w=500&q=60",
      is_active: true,
    },
  },
  {
    inventory_id: "inv_003",
    quantity_available: 0,
    quantity_reserved: 0,
    updated_at: "2025-01-10T15:45:00Z",
    variant: {
      variant_id: "v_003",
      product_id: "p_003",
      name: "Giày Sneaker Sport",
      sku: "SNK-RED-42",
      size: "42",
      color: "Red",
      price: 1200000,
      image_url:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60",
      is_active: true,
    },
  },
  {
    inventory_id: "inv_004",
    quantity_available: 50,
    quantity_reserved: 0,
    updated_at: "2025-01-11T09:00:00Z",
    variant: {
      variant_id: "v_004",
      product_id: "p_004",
      name: "Áo Khoác Bomber Limited",
      sku: "BOMBER-BLK-M",
      size: "M",
      color: "Black",
      price: 850000,
      image_url:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=60",
      is_active: true,
    },
  },
  {
    inventory_id: "inv_005",
    quantity_available: 100,
    quantity_reserved: 98,
    // -> Sellable: 2
    updated_at: "2025-01-12T11:00:00Z",
    variant: {
      variant_id: "v_005",
      product_id: "p_005",
      name: "Đầm Dạ Hội Silk",
      sku: "DRESS-SILK-S",
      size: "S",
      color: "Pink",
      price: 2500000,
      image_url:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=60",
      is_active: true,
    },
  },
];

// --- HELPER FUNCTIONS ---

// 1. Tính toán trạng thái kho
const getStockStatus = (available, reserved) => {
  const sellable = available - reserved;
  if (sellable <= 0)
    return {
      label: "Hết hàng",
      value: "OUT_OF_STOCK",
      color: "destructive",
      icon: XCircle,
    };
  if (sellable < 10)
    return {
      label: "Sắp hết",
      value: "LOW_STOCK",
      color: "warning",
      icon: AlertTriangle,
    }; // Bạn cần define màu warning trong theme hoặc dùng class text-yellow-500
  return {
    label: "Còn hàng",
    value: "IN_STOCK",
    color: "success",
    icon: CheckCircle2,
  }; // define màu success hoặc dùng text-green-500
};

// 2. Tính phần trăm hiển thị (Dựa trên Sellable / Total Available)
const getStockPercentage = (available, reserved) => {
  if (available === 0) return 0;
  const sellable = available - reserved;
  return Math.max(0, Math.min((sellable / available) * 100, 100));
};

const InventoryAdminPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Logic: Phải chọc vào item.variant
  const filteredInventory = MOCK_INVENTORY.filter(
    (item) =>
      item.variant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.variant.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats Logic: Tính toán động
  const totalItems = MOCK_INVENTORY.length;
  const outOfStockItems = MOCK_INVENTORY.filter(
    (i) => i.quantity_available - i.quantity_reserved <= 0
  ).length;
  const lowStockItems = MOCK_INVENTORY.filter((i) => {
    const sellable = i.quantity_available - i.quantity_reserved;
    return sellable > 0 && sellable < 10;
  }).length;

  const stats = [
    {
      title: "Tổng sản phẩm",
      value: totalItems,
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Sắp hết hàng",
      value: lowStockItems,
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
    {
      title: "Đã hết hàng",
      value: outOfStockItems,
      icon: XCircle,
      color: "text-red-600",
    },
    {
      title: "Giá trị kho",
      value: "Calculating...",
      icon: Package,
      color: "text-green-600",
    }, // Có thể tính tổng tiền nếu cần
  ];

  return (
    <div>
      <AdminHeader title="Quản lý Kho Hàng" />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo tên hoặc SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button>Nhập kho</Button>
          <Button variant="outline">Xuất Excel</Button>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Hình ảnh</TableHead>
                  <TableHead>SKU / Tên sản phẩm</TableHead>
                  <TableHead>Phân loại</TableHead>
                  <TableHead>Tình trạng kho (Khả dụng / Tổng)</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Giá bán</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => {
                  const sellable =
                    item.quantity_available - item.quantity_reserved;
                  const statusInfo = getStockStatus(
                    item.quantity_available,
                    item.quantity_reserved
                  );

                  return (
                    <TableRow key={item.inventory_id}>
                      <TableCell>
                        <img
                          src={item.variant.image_url}
                          alt={item.variant.name}
                          className="w-12 h-12 rounded object-cover border"
                        />
                      </TableCell>

                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-xs text-muted-foreground">
                            {item.variant.sku}
                          </span>
                          <span className="font-medium">
                            {item.variant.name}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm">
                          Size:{" "}
                          <span className="font-semibold">
                            {item.variant.size}
                          </span>{" "}
                          | Màu:{" "}
                          <span className="font-semibold">
                            {item.variant.color}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="w-[250px]">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-xs">
                            <span>
                              Khả dụng: <b>{sellable}</b>
                            </span>
                            <span className="text-muted-foreground">
                              Tổng: {item.quantity_available}
                            </span>
                          </div>
                          {/* Progress bar thể hiện % hàng còn bán được so với tổng kho */}
                          <Progress
                            value={getStockPercentage(
                              item.quantity_available,
                              item.quantity_reserved
                            )}
                            className="h-2"
                            // Bạn có thể custom màu progress bar dựa trên statusInfo.value
                          />
                          <span className="text-[10px] text-muted-foreground">
                            (Đang giữ: {item.quantity_reserved})
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            statusInfo.value === "IN_STOCK"
                              ? "default"
                              : statusInfo.value === "LOW_STOCK"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {statusInfo.label}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right font-medium">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.variant.price)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryAdminPage;
