import { AdminHeader } from "@/layouts/admin/component/header";
import React from "react";
import StatCard from "./components/StatCard";
import RecentOrders from "./components/RecentOrders";
import TopProducts from "./components/TopProducts";
import QuickActions from "./components/QuickActions";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  BarChart,
} from "lucide-react";

const Dashboard = () => {
  // Mock data
  const stats = {
    totalRevenue: 25480000,
    totalOrders: 156,
    totalProducts: 89,
    totalCustomers: 342,
    revenueChange: "+12.5%",
    ordersChange: "+8.2%",
    productsChange: "+5.3%",
    customersChange: "+15.7%",
  };

  const recentOrders = [
    {
      id: "ORD001",
      customer: "Nguyễn Văn A",
      date: "2024-01-15",
      amount: 1250000,
      status: "delivered",
    },
    {
      id: "ORD002",
      customer: "Trần Thị B",
      date: "2024-01-14",
      amount: 850000,
      status: "shipping",
    },
    {
      id: "ORD003",
      customer: "Lê Văn C",
      date: "2024-01-14",
      amount: 2100000,
      status: "pending",
    },
    {
      id: "ORD004",
      customer: "Phạm Thị D",
      date: "2024-01-13",
      amount: 560000,
      status: "delivered",
    },
    {
      id: "ORD005",
      customer: "Hoàng Văn E",
      date: "2024-01-13",
      amount: 980000,
      status: "cancelled",
    },
  ];

  const topProducts = [
    {
      id: "P001",
      name: "Áo thun nam",
      category: "Áo",
      sales: 45,
      revenue: 22500000,
    },
    {
      id: "P002",
      name: "Váy dài",
      category: "Đầm/Váy",
      sales: 38,
      revenue: 19000000,
    },
    {
      id: "P003",
      name: "Quần jean",
      category: "Quần",
      sales: 32,
      revenue: 16000000,
    },
    {
      id: "P004",
      name: "Áo khoác",
      category: "Áo khoác",
      sales: 28,
      revenue: 14000000,
    },
    {
      id: "P005",
      name: "Giày thể thao",
      category: "Phụ kiện",
      sales: 25,
      revenue: 12500000,
    },
  ];

  return (
    <div>
      <AdminHeader title="Dashboard" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Tổng doanh thu"
          value={stats.totalRevenue}
          icon={DollarSign}
          change={stats.revenueChange}
          changeType="positive"
          isCurrency={true}
        />
        <StatCard
          title="Tổng đơn hàng"
          value={stats.totalOrders}
          icon={ShoppingCart}
          change={stats.ordersChange}
          changeType="positive"
        />
        <StatCard
          title="Sản phẩm"
          value={stats.totalProducts}
          icon={Package}
          change={stats.productsChange}
          changeType="positive"
        />
        <StatCard
          title="Khách hàng"
          value={stats.totalCustomers}
          icon={Users}
          change={stats.customersChange}
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RecentOrders orders={recentOrders} />
        <TopProducts products={topProducts} />
      </div>

      <QuickActions />
    </div>
  );
};

export default Dashboard;
