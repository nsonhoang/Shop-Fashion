import { AdminHeader } from "@/layouts/admin/component/header";
import React, { useState } from "react";

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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomerDetailDialog } from "./components/DialogDetail";

// --- 1. MOCK DATA CHUẨN ERD ---

// SELECT profiles.*, addresses.street, addresses.city
// FROM profiles
// LEFT JOIN addresses ON profiles.id = addresses.user_id
// WHERE addresses.is_default = true; -- Chỉ lấy địa chỉ mặc định
const mockUsers = [
  {
    // Bảng PROFILES
    id: "550e8400-e29b-41d4-a716-446655440000",
    email: "nguyenvana@gmail.com",
    full_name: "Nguyễn Văn A",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    phone_number: "0901234567",
    created_at: "2024-05-15T08:30:00Z",

    // Join từ bảng USER_ROLES -> lấy name
    role: "CUSTOMER",

    // Aggregate từ bảng ORDERS
    total_spent: 15600000,

    // Join từ bảng ADDRESSES (Lọc lấy is_default = true)
    address: {
      address_id: "addr-1111-2222-3333-4444", // Chuẩn Primary Key
      street: "123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1",
      city: "Hồ Chí Minh",
      is_default: true, // Chuẩn field Boolean trong ERD
    },
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440001",
    email: "admin@store.com",
    full_name: "Trần Quản Trị",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    phone_number: "0912345678",
    created_at: "2024-01-01T00:00:00Z",
    role: "ADMIN",
    total_spent: 0,

    // Trường hợp chưa có bản ghi nào trong bảng ADDRESSES
    address: null,
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440002",
    email: "staff.kho@store.com",
    full_name: "Phạm Văn Kho",
    avatar_url: null,
    phone_number: "0988777666",
    created_at: "2024-06-20T10:00:00Z",
    role: "STAFF",
    total_spent: 0,

    // Nhân viên kho
    address: {
      address_id: "addr-5555-6666-7777-8888",
      street: "Kho số 5, KCN Tân Bình",
      city: "Hồ Chí Minh",
      is_default: true,
    },
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440003",
    email: "lethic@yahoo.com",
    full_name: "Lê Thị C",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sudo",
    phone_number: "0933444555",
    created_at: "2024-12-10T14:00:00Z",
    role: "CUSTOMER",
    total_spent: 2500000,

    // Khách hàng ở tỉnh
    address: {
      address_id: "addr-9999-0000-aaaa-bbbb",
      street: "456 Lê Duẩn, Quận Thanh Khê",
      city: "Đà Nẵng",
      is_default: true,
    },
  },
];

// --- 2. CÁC HÀM TIỆN ÍCH ---

// Format tiền tệ
const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value
  );

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

// --- 3. COMPONENT CHÍNH ---
const CustomersAdminPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Filter dựa trên full_name hoặc email
  const filteredCustomers = mockUsers.filter(
    (customer) =>
      customer.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetail = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  // Hàm render Badge cho Role (Thay thế Status cũ)
  const renderRoleBadge = (role) => {
    switch (role) {
      case "ADMIN":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200">
            <Shield className="w-3 h-3 mr-1" /> Admin
          </Badge>
        );
      case "STAFF":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
            <User className="w-3 h-3 mr-1" /> Staff
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200"
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
                  filteredCustomers.map((customer) => (
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

                      {/* Cột 2: Phone (Mới) */}
                      <TableCell>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Smartphone className="w-3 h-3 mr-1" />
                          {customer.phone_number}
                        </div>
                      </TableCell>

                      {/* Cột 3: Role (Thay thế Status) */}
                      <TableCell>{renderRoleBadge(customer.role)}</TableCell>

                      {/* Cột 4: Tổng chi tiêu */}
                      <TableCell className="text-right font-medium">
                        {formatCurrency(customer.total_spent)}
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
                              <Trash2 className=" text-red-600 h-4 w-4 mr-2" />
                              Xóa người dùng
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
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
      <CustomerDetailDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        customer={selectedUser}
      />
    </div>
  );
};

export default CustomersAdminPage;
