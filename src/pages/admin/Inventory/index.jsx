import { useEffect, useState } from "react";
import {
  Search,
  Package,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Edit,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

// Import components của bạn
import { AdminHeader } from "@/layouts/admin/component/header";
import DialogAddInventory from "./components/DialogAddInventory";
import { getVariants } from "@/services/productService";
import { createInventory, getInventories } from "@/services/inventoryService";

// --- LOGIC HELPER ---
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
      color: "secondary",
      icon: AlertTriangle,
    };
  return {
    label: "Còn hàng",
    value: "IN_STOCK",
    color: "default",
    icon: CheckCircle2,
  };
};

const getStockPercentage = (available, reserved) => {
  if (available === 0) return 0;
  const sellable = available - reserved;
  return Math.max(0, Math.min((sellable / available) * 100, 100));
};

// --- COMPONENT CHÍNH ---
const InventoryAdminPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // State quản lý Dialog (Gộp chung logic Add/Edit vào 1 state open)
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState(null); // null = Add, object = Edit

  const [variantList, setVariantList] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inventories = await getInventories();
        setInventoryList(inventories || []);

        const variants = await getVariants();
        setVariantList(variants || []);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu", error.message);
      }
    };
    fetchInventory();
  }, []);

  // Filter Logic (Fix lỗi null check cho an toàn)
  const filteredInventory = inventoryList.filter((item) => {
    const productName = item.product_variants?.products?.name || "";
    const sku = item.product_variants?.sku || "";
    return (
      productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sku.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Stats Logic
  const totalItems = inventoryList.length;
  const outOfStockItems = inventoryList.filter(
    (i) => i.quantity_available - i.quantity_reserved <= 0
  ).length;
  const lowStockItems = inventoryList.filter((i) => {
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
  ];

  // --- HANDLERS ---

  // 1. Mở dialog Thêm mới
  const handleOpenAdd = () => {
    setSelectedInventoryItem(null); // Reset về null để Dialog hiểu là Add
    setOpenDialog(true);
  };

  // 2. Mở dialog Sửa
  const handleOpenEdit = (item) => {
    console.log("Editing item:", item);
    // Map data từ bảng vào form
    setSelectedInventoryItem({
      inventory_id: item.inventory_id,
      variant_id: item.product_variants.variant_id, // Lấy đúng ID variant
      quantity_available: item.quantity_available,
      quantity_reserved: item.quantity_reserved,
    });
    setOpenDialog(true);
  };

  // 3. Hàm xử lý chung cho cả Thêm và Sửa (Gọn gàng hơn)
  const handleSaveInventory = async (data) => {
    console.log("Submitting data:", data);
    try {
      if (selectedInventoryItem) {
        // --- LOGIC UPDATE (SỬA) ---
        // Gọi API update ở đây (ví dụ: await updateInventory(data))
        // console.log("Gọi API update...");
        // Sau khi update xong, update state inventoryList:
        // setInventoryList(prev => prev.map(item => item.inventory_id === data.inventory_id ? newData : item));
        alert("Chức năng Update đang chờ API");
      } else {
        // --- LOGIC CREATE (THÊM MỚI) ---
        const newInventory = await createInventory(data);
        // Add vào list hiển thị ngay
        setInventoryList((prev) => [...prev, newInventory]);
      }

      setOpenDialog(false); // Đóng Dialog khi thành công
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu", error.message);
      alert(
        "Có lỗi xảy ra khi lưu dữ liệu kho hàng, có thể sản phẩm đã được thêm nên nên cập nhật số lượng"
      );
    }
  };

  return (
    <div>
      <AdminHeader title="Quản lý Kho Hàng" />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <Button onClick={handleOpenAdd}>
            <Plus className="mr-2 h-4 w-4" /> Nhập kho
          </Button>

          <Button variant="outline">Xuất Excel</Button>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Hình ảnh</TableHead>
                  <TableHead>SKU / Tên sản phẩm</TableHead>
                  <TableHead>Thông tin</TableHead>
                  <TableHead>Tình trạng kho</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Giá bán</TableHead>
                  <TableHead className="text-center w-[80px]">
                    Hành động
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => {
                    // Safety check để tránh crash nếu data thiếu
                    const variant = item.product_variants || {};
                    const product = variant.products || {};

                    const sellable =
                      (item.quantity_available || 0) -
                      (item.quantity_reserved || 0);
                    const statusInfo = getStockStatus(
                      item.quantity_available || 0,
                      item.quantity_reserved || 0
                    );

                    return (
                      <TableRow key={item.inventory_id}>
                        <TableCell>
                          <img
                            src={variant.image_url || "https://placehold.co/50"}
                            alt={product.name || "Product"}
                            className="w-10 h-10 rounded object-cover border"
                          />
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-bold text-xs text-muted-foreground">
                              {variant.sku || "N/A"}
                            </span>
                            <span className="font-medium text-sm">
                              {product.name || "Unknown Product"}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="text-xs text-muted-foreground">
                            <div>
                              Size:{" "}
                              <b className="text-foreground">{variant.size}</b>
                            </div>
                            <div>
                              Màu:{" "}
                              <b className="text-foreground">{variant.color}</b>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="w-[250px]">
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs">
                              <span className="font-semibold text-primary">
                                Khả dụng: {sellable}
                              </span>
                              <span className="text-muted-foreground">
                                Tổng: {item.quantity_available}
                              </span>
                            </div>
                            <Progress
                              value={getStockPercentage(
                                item.quantity_available || 0,
                                item.quantity_reserved || 0
                              )}
                              className="h-1.5"
                            />
                            {item.quantity_reserved > 0 && (
                              <span className="text-[10px] text-orange-600 font-medium">
                                Đang giữ: {item.quantity_reserved}
                              </span>
                            )}
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge variant={statusInfo.color}>
                            {statusInfo.label}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right font-medium text-sm">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(variant.price_adjustment || 0)}
                        </TableCell>

                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenEdit(item)}
                          >
                            <Edit className="h-4 w-4 text-muted-foreground hover:text-primary" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Không tìm thấy sản phẩm nào trong kho.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* --- DIALOG COMPONENT (Chỉ cần 1 cái duy nhất) --- */}
      {openDialog && (
        <DialogAddInventory
          open={openDialog}
          onOpenChange={setOpenDialog}
          onSubmit={handleSaveInventory} // Dùng chung hàm save
          variants={variantList}
          initialData={selectedInventoryItem} // Truyền data để Dialog biết là Edit hay Add
        />
      )}
    </div>
  );
};

export default InventoryAdminPage;
