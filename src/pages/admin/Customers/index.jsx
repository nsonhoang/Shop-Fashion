import React, { useEffect, useState } from "react";
import { AdminHeader } from "@/layouts/admin/component/header";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Eye,
  Mail,
  MoreHorizontal,
  Shield,
  User,
  Smartphone,
  Trash2,
  Check, // Icon check cho menu chọn role
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomerDetailDialog } from "./components/DialogDetail";
import { formatMoney } from "@/utils/formatMoney";
import { getCustomers, updateRoleById } from "@/services/customerService";

// --- HELPERS ---

// Format ngày tháng
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// Lấy 2 chữ cái đầu làm Avatar fallback
const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

// --- COMPONENT CHÍNH ---
const CustomersAdminPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customers, setCustomers] = useState([]);

  // 1. Fetch dữ liệu khi load trang
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khách hàng:", error.message);
      }
    };
    fetchData();
  }, []);

  // 2. Filter danh sách
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 3. Hàm xử lý cập nhật Role
  const handleUpdateRole = async (userId, newRole) => {
    try {
      // Gọi API
      await updateRoleById(userId, newRole);

      // Cập nhật State ngay lập tức (Optimistic UI)
      setCustomers((prevCustomers) =>
        prevCustomers.map((cust) => {
          if (cust.id === userId) {
            // Tạo bản sao mảng roles để sửa
            const updatedUserRoles = [...(cust.user_roles || [])];
            if (updatedUserRoles.length > 0) {
              updatedUserRoles[0] = {
                ...updatedUserRoles[0],
                role_id: newRole,
              };
            }
            return { ...cust, user_roles: updatedUserRoles };
          }
          return cust;
        }),
      );
      console.log("Cập nhật vai trò thành công");
    } catch (error) {
      console.error("Lỗi khi cập nhật vai trò:", error.message);
      alert("Cập nhật thất bại!");
    }
  };

  const handleViewDetail = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  // 4. Hàm render Badge hiển thị (Chỉ trả về UI Badge)
  const renderRoleBadge = (role) => {
    switch (role) {
      case 1: // Admin
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200 cursor-pointer transition-colors">
            <Shield className="w-3 h-3 mr-1" /> Admin
          </Badge>
        );

      default: // Customer (Thường là role 2 hoặc null)
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200 cursor-pointer transition-colors"
          >
            Customer
          </Badge>
        );
    }
  };

  return (
    <div>
      <AdminHeader title="Quản lý Người dùng" />
      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo tên hoặc email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thông tin người dùng</TableHead>
                  <TableHead>Liên hệ</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead className="text-right">Tổng chi tiêu</TableHead>
                  <TableHead>Ngày tham gia</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => {
                    // Lấy role hiện tại (mặc định là 2 nếu không có)
                    const currentRoleId = customer.user_roles?.[0]?.role_id;

                    return (
                      <TableRow key={customer.id}>
                        {/* Cột 1: Thông tin User */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border">
                              <AvatarImage
                                src={customer.avatar_url}
                                alt={customer.full_name}
                              />
                              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                {getInitials(customer.full_name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                {customer.full_name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {customer.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Cột 2: Phone */}
                        <TableCell>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Smartphone className="w-3 h-3 mr-1" />
                            {customer.phone_number || "---"}
                          </div>
                        </TableCell>

                        {/* Cột 3: Role (Có Dropdown Update) */}
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none">
                              {renderRoleBadge(currentRoleId)}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              {/* Option: Admin (ID: 1) */}
                              <DropdownMenuItem
                                onClick={() => handleUpdateRole(customer.id, 1)}
                              >
                                <div className="flex items-center justify-between w-full min-w-[120px]">
                                  <span className="font-medium text-purple-700">
                                    Admin
                                  </span>
                                  {currentRoleId === 1 && (
                                    <Check className="h-4 w-4 ml-2 text-green-600" />
                                  )}
                                </div>
                              </DropdownMenuItem>

                              {/* Option: Customer (ID: 2) */}
                              <DropdownMenuItem
                                onClick={() => handleUpdateRole(customer.id, 2)}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>Customer</span>
                                  {/* Nếu ko phải 1 hoặc 0 thì coi là Customer */}
                                  {currentRoleId !== 1 &&
                                    currentRoleId !== 0 && (
                                      <Check className="h-4 w-4 ml-2 text-green-600" />
                                    )}
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>

                        {/* Cột 4: Tổng chi tiêu */}
                        <TableCell className="text-right font-medium">
                          {formatMoney(customer.total_spent)}
                        </TableCell>

                        {/* Cột 5: Ngày tham gia */}
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(customer.created_at)}
                        </TableCell>

                        {/* Cột 6: Actions */}
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleViewDetail(customer)}
                              >
                                <Eye className="h-4 w-4 mr-2" /> Xem chi tiết
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" /> Gửi Email
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Xóa người dùng
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Không tìm thấy kết quả nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Dialog chi tiết */}
      <CustomerDetailDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        customer={selectedUser}
      />
    </div>
  );
};

export default CustomersAdminPage;
