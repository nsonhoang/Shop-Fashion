import { supabase } from "@/lib/supabase";

export const getDashboardStats = async () => {
  try {
    const now = new Date();
    // Ngày đầu tháng này
    const thisMonthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
    ).toISOString();
    // Ngày đầu tháng trước
    const lastMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
    ).toISOString();
    // Ngày cuối tháng trước
    const lastMonthEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
    ).toISOString();

    // --- 1. LẤY DOANH THU (REVENUE) ---
    // Lấy doanh thu trọn đời (Total)
    const { data: allRevenueData } = await supabase
      .from("orders")
      .select("total_amount")
      .eq("status", "DELIVERED"); // Chỉ tính đơn đã giao

    // Lấy doanh thu tháng trước (để tính % thay đổi)
    const { data: lastMonthRevenueData } = await supabase
      .from("orders")
      .select("total_amount")
      .eq("status", "DELIVERED")
      .gte("created_at", lastMonthStart)
      .lte("created_at", lastMonthEnd);

    // Lấy doanh thu tháng này
    const { data: thisMonthRevenueData } = await supabase
      .from("orders")
      .select("total_amount")
      .eq("status", "DELIVERED")
      .gte("created_at", thisMonthStart);

    const totalRevenue =
      allRevenueData?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
    const thisMonthRevenue =
      thisMonthRevenueData?.reduce(
        (sum, order) => sum + order.total_amount,
        0,
      ) || 0;
    const lastMonthRevenue =
      lastMonthRevenueData?.reduce(
        (sum, order) => sum + order.total_amount,
        0,
      ) || 0;

    // --- 2. LẤY TỔNG ĐƠN HÀNG (ORDERS) ---
    const { count: totalOrders } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true }); // head: true giúp đếm nhanh mà ko tải data

    // Đếm đơn tháng này vs tháng trước để tính trend
    const { count: thisMonthOrders } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .gte("created_at", thisMonthStart);

    const { count: lastMonthOrders } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .gte("created_at", lastMonthStart)
      .lte("created_at", lastMonthEnd);

    // --- 3. LẤY TỔNG SẢN PHẨM (PRODUCTS) ---
    const { count: totalProducts } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    // --- 4. LẤY TỔNG KHÁCH HÀNG (CUSTOMERS/PROFILES) ---
    const { count: totalCustomers } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    // --- HÀM TÍNH % TĂNG TRƯỞNG ---
    const calculateGrowth = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      totalCustomers,
      revenueChange: calculateGrowth(thisMonthRevenue, lastMonthRevenue),
      ordersChange: calculateGrowth(thisMonthOrders, lastMonthOrders),
      // Sản phẩm & Khách hàng tạm thời random hoặc để 0 nếu không cần track theo tháng
      productsChange: 0,
      customersChange: 0,
    };
  } catch (error) {
    console.error("Lỗi lấy thống kê dashboard:", error);
    return null;
  }
};
