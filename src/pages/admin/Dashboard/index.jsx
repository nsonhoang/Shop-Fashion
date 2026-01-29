import React, { useEffect, useState } from "react";
import { AdminHeader } from "@/layouts/admin/component/header";
import StatCard from "./components/StatCard";
import RecentOrders from "./components/RecentOrders";
import TopProducts from "./components/TopProducts";
import QuickActions from "./components/QuickActions";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  Loader2, // Import icon loading
} from "lucide-react";
import { getDashboardStats } from "@/services/dashboardService"; // Import service

const Dashboard = () => {
  // 1. Khởi tạo State để chứa dữ liệu thật
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    revenueChange: 0,
    ordersChange: 0,
    productsChange: 0,
    customersChange: 0,
  });

  const [loading, setLoading] = useState(true);

  // 2. Gọi API khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardStats();
        if (data) {
          setStats(data);
        }
      } catch (error) {
        console.error("Lỗi tải dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 3. Hàm helper: Format số % (VD: từ 12.5 thành "+12.5%")
  const formatChange = (val) => {
    if (val === undefined || val === null) return "0%";
    const sign = val > 0 ? "+" : "";
    // Làm tròn 1 chữ số thập phân
    return `${sign}${val.toFixed(1)}%`;
  };

  // 4. Hàm helper: Xác định màu sắc (Tăng: positive, Giảm: negative)
  const getChangeType = (val) => {
    if (val > 0) return "positive";
    if (val < 0) return "negative";
    return "neutral";
  };

  return (
    <div>
      <AdminHeader title="Dashboard" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          // Hiển thị Skeleton Loading nếu đang tải
          [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white h-32 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center"
            >
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            </div>
          ))
        ) : (
          <>
            <StatCard
              title="Tổng doanh thu"
              value={stats.totalRevenue}
              icon={DollarSign}
              change={formatChange(stats.revenueChange)}
              changeType={getChangeType(stats.revenueChange)}
              isCurrency={true}
            />
            <StatCard
              title="Tổng đơn hàng"
              value={stats.totalOrders}
              icon={ShoppingCart}
              change={formatChange(stats.ordersChange)}
              changeType={getChangeType(stats.ordersChange)}
            />
            <StatCard
              title="Sản phẩm"
              value={stats.totalProducts}
              icon={Package}
              change={formatChange(stats.productsChange)}
              changeType="neutral" // Sản phẩm thường ít biến động theo tháng
            />
            <StatCard
              title="Khách hàng"
              value={stats.totalCustomers}
              icon={Users}
              change={formatChange(stats.customersChange)}
              changeType="positive"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Các component con này đã được sửa ở bước trước để tự fetch data */}
        <RecentOrders />
        <TopProducts />
      </div>

      <QuickActions />
    </div>
  );
};

export default Dashboard;
