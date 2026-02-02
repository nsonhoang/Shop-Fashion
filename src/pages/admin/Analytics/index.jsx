import React, { useEffect, useState } from "react";
import { AdminHeader } from "@/layouts/admin/component/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  CreditCard,
  Loader2,
} from "lucide-react";

// --- 1. CẤU HÌNH UI & HELPER ---
const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
];

const chartConfig = {
  revenue: { label: "Doanh thu", color: "hsl(var(--primary))" },
  orders: { label: "Đơn hàng", color: "hsl(var(--secondary))" },
};

// --- 2. HÀM XỬ LÝ DỮ LIỆU ---
const processDashboardData = (orders, users, orderItems) => {
  const now = new Date();

  // A. TÍNH TOÁN KPI TỔNG QUAN
  const validOrders = orders.filter((o) => o.status !== "CANCELLED");

  // Tổng doanh thu & đơn hàng
  const totalRevenue = validOrders.reduce(
    (sum, o) => sum + (o.total_amount || 0),
    0,
  );
  const totalOrders = validOrders.length;
  const totalCustomers = users.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Giả lập % tăng trưởng (Demo)
  const calculateTrend = () => (Math.random() * 20 - 10).toFixed(1);

  // B. TÍNH TOÁN BIỂU ĐỒ (6 THÁNG GẦN NHẤT)
  const chartDataMap = {};
  // Khởi tạo 6 tháng
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getMonth() + 1}/${d.getFullYear()}`;
    const monthName = `Tháng ${d.getMonth() + 1}`;
    chartDataMap[key] = {
      month: monthName,
      revenue: 0,
      orders: 0,
      sortKey: d.getTime(),
    };
  }

  // Cộng dồn
  validOrders.forEach((order) => {
    const d = new Date(order.created_at);
    const key = `${d.getMonth() + 1}/${d.getFullYear()}`;
    if (chartDataMap[key]) {
      chartDataMap[key].revenue += order.total_amount || 0;
      chartDataMap[key].orders += 1;
    }
  });

  const revenue_chart_data = Object.values(chartDataMap).sort(
    (a, b) => a.sortKey - b.sortKey,
  );

  // C. TÍNH TOÁN DANH MỤC (PIE CHART) - QUAN TRỌNG: SỬA LOGIC LẤY DATA Ở ĐÂY
  const categoryMap = {};

  orderItems.forEach((item) => {
    // 1. Lấy tên danh mục từ cấu trúc lồng nhau (Variants -> Products -> Category)
    // Nếu không có variants hoặc products thì fallback về "Khác"
    const categoryName =
      item.product_variants?.products?.category?.name || "Khác";

    // 2. Tính doanh thu của item này (Số lượng * Giá lúc mua)
    const price = item.price_at_purchase || 0;
    const quantity = item.quantity || 1;
    const amount = quantity * price;

    if (!categoryMap[categoryName]) categoryMap[categoryName] = 0;
    categoryMap[categoryName] += amount;
  });

  // Convert sang mảng cho Recharts
  const sales_by_category = Object.keys(categoryMap)
    .map((key) => ({ name: key, value: categoryMap[key] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5

  // Tính %
  const totalCategorySales = sales_by_category.reduce(
    (sum, item) => sum + item.value,
    0,
  );
  const finalCategoryData = sales_by_category.map((item) => ({
    ...item,
    value:
      totalCategorySales > 0
        ? parseFloat(((item.value / totalCategorySales) * 100).toFixed(1))
        : 0,
  }));

  return {
    summary: {
      total_revenue: {
        value: totalRevenue,
        change: calculateTrend(),
        trend: "up",
        label: "Tổng doanh thu",
      },
      total_orders: {
        value: totalOrders,
        change: calculateTrend(),
        trend: "up",
        label: "Tổng đơn hàng",
      },
      new_customers: {
        value: totalCustomers,
        change: calculateTrend(),
        trend: "up",
        label: "Khách hàng",
      },
      average_order_value: {
        value: avgOrderValue,
        change: calculateTrend(),
        trend: "down",
        label: "Giá trị TB đơn",
      },
    },
    revenue_chart_data,
    sales_by_category:
      finalCategoryData.length > 0
        ? finalCategoryData
        : [{ name: "Chưa có dữ liệu", value: 100 }],
  };
};

const AnalyticsAdminPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Lấy đơn hàng (6 tháng gần nhất)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("order_id, total_amount, created_at, status")
          .gte("created_at", sixMonthsAgo.toISOString());
        if (ordersError) throw ordersError;

        // 2. Lấy khách hàng
        const { data: usersData, error: usersError } = await supabase
          .from("profiles")
          .select("id");
        if (usersError) console.warn("Lỗi fetch profiles:", usersError);

        // 3. Lấy Order Items (QUERY CHUẨN: Variants -> Products -> Categories)
        const { data: itemsData, error: itemsError } = await supabase
          .from("order_items")
          .select(
            `
            quantity,
            price_at_purchase,
            product_variants (
              products (
                category: categories ( name )
              )
            )
          `,
          )
          .limit(1000);

        if (itemsError) console.warn("Lỗi fetch items:", itemsError);

        // 4. Xử lý dữ liệu
        const processed = processDashboardData(
          ordersData || [],
          usersData || [],
          itemsData || [],
        );

        setData(processed);
      } catch (error) {
        console.error("Lỗi tải dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Đang tính toán số liệu...</span>
      </div>
    );
  }

  if (!data) return <div className="p-6">Không có dữ liệu</div>;

  // Map dữ liệu để render UI
  const statsList = [
    {
      key: "revenue",
      title: data.summary.total_revenue.label,
      value: formatCurrency(data.summary.total_revenue.value),
      change: `${data.summary.total_revenue.change}%`,
      trend: parseFloat(data.summary.total_revenue.change) >= 0 ? "up" : "down",
      icon: DollarSign,
    },
    {
      key: "orders",
      title: data.summary.total_orders.label,
      value: data.summary.total_orders.value.toLocaleString(),
      change: `${data.summary.total_orders.change}%`,
      trend: parseFloat(data.summary.total_orders.change) >= 0 ? "up" : "down",
      icon: ShoppingCart,
    },
    {
      key: "customers",
      title: data.summary.new_customers.label,
      value: data.summary.new_customers.value.toLocaleString(),
      change: `${data.summary.new_customers.change}%`,
      trend: parseFloat(data.summary.new_customers.change) >= 0 ? "up" : "down",
      icon: Users,
    },
    {
      key: "avg_order",
      title: data.summary.average_order_value.label,
      value: formatCurrency(data.summary.average_order_value.value),
      change: `${data.summary.average_order_value.change}%`,
      trend:
        parseFloat(data.summary.average_order_value.change) >= 0
          ? "up"
          : "down",
      icon: CreditCard,
    },
  ];

  return (
    <div>
      <AdminHeader title="Thống kê tổng quan" />
      <div className="p-6 space-y-6">
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsList.map((stat) => (
            <Card key={stat.key}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div
                  className={`flex items-center text-xs mt-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(parseFloat(stat.change))}% so với tháng trước
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Biểu đồ Doanh thu (6 tháng)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <AreaChart
                  data={data.revenue_chart_data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="fillRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                      `${(value / 1000000).toFixed(1)}M`
                    }
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    fill="url(#fillRevenue)"
                    fillOpacity={0.4}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Số lượng Đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={data.revenue_chart_data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                  />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="orders"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Tỷ lệ bán theo Danh mục</CardTitle>
            </CardHeader>
            <CardContent>
              {data.sales_by_category.length > 0 ? (
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="h-[300px] w-full md:w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.sales_by_category}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {data.sales_by_category.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-3 w-full md:w-1/3">
                    {data.sales_by_category.map((item, index) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-2 rounded-lg border bg-slate-50"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          />
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-muted-foreground">
                          {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 text-gray-500">
                  Chưa có dữ liệu danh mục
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsAdminPage;
