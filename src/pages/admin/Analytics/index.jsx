import React, { useEffect, useState } from "react";
import { AdminHeader } from "@/layouts/admin/component/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";

// --- 1. MOCK DATA (Cấu trúc giống API trả về) ---
const MOCK_API_RESPONSE = {
  summary: {
    total_revenue: {
      value: 254000000,
      change: 12.5,
      trend: "up",
      label: "Tổng doanh thu",
    },
    total_orders: {
      value: 1245,
      change: 8.2,
      trend: "up",
      label: "Tổng đơn hàng",
    },
    new_customers: {
      value: 350,
      change: 23.1,
      trend: "up",
      label: "Khách hàng mới",
    },
    average_order_value: {
      value: 204000,
      change: -2.4,
      trend: "down",
      label: "Giá trị trung bình",
    },
  },
  // Dữ liệu biểu đồ 6 tháng gần nhất
  revenue_chart_data: [
    { month: "Jan", revenue: 12000000, orders: 140 },
    { month: "Feb", revenue: 15500000, orders: 198 },
    { month: "Mar", revenue: 8900000, orders: 120 },
    { month: "Apr", revenue: 21000000, orders: 280 },
    { month: "May", revenue: 18400000, orders: 250 },
    { month: "Jun", revenue: 25000000, orders: 350 },
  ],
  // Dữ liệu danh mục sản phẩm
  sales_by_category: [
    { name: "Thời trang Nam", value: 45 },
    { name: "Thời trang Nữ", value: 30 },
    { name: "Trẻ em", value: 15 },
    { name: "Phụ kiện", value: 10 },
  ],
};

// --- 2. HÀM TIỆN ÍCH ---
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

const AnalyticsAdminPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Giả lập gọi API
  useEffect(() => {
    const fetchData = async () => {
      // Ở đây bạn sẽ dùng: const res = await axios.get('/api/v1/stats/dashboard');
      // setData(res.data);
      setTimeout(() => {
        setData(MOCK_API_RESPONSE);
        setLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6">Đang tải dữ liệu thống kê...</div>;
  }

  // Map dữ liệu từ API summary sang mảng để loop render thẻ Card
  const statsList = [
    {
      key: "revenue",
      title: data.summary.total_revenue.label,
      value: formatCurrency(data.summary.total_revenue.value),
      change: `${data.summary.total_revenue.change}%`,
      trend: data.summary.total_revenue.trend,
      icon: DollarSign,
    },
    {
      key: "orders",
      title: data.summary.total_orders.label,
      value: data.summary.total_orders.value.toLocaleString(),
      change: `${data.summary.total_orders.change}%`,
      trend: data.summary.total_orders.trend,
      icon: ShoppingCart,
    },
    {
      key: "customers",
      title: data.summary.new_customers.label,
      value: data.summary.new_customers.value.toLocaleString(),
      change: `${data.summary.new_customers.change}%`,
      trend: data.summary.new_customers.trend,
      icon: Users,
    },
    {
      key: "avg_order",
      title: data.summary.average_order_value.label,
      value: formatCurrency(data.summary.average_order_value.value),
      change: `${data.summary.average_order_value.change}%`,
      trend: data.summary.average_order_value.trend,
      icon: CreditCard,
    },
  ];

  return (
    <div>
      <AdminHeader title="Thống kê tổng quan" />
      <div className="p-6 space-y-6">
        {/* --- 1. KPI CARDS --- */}
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
                  className={`flex items-center text-xs mt-1 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
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

        {/* --- 2. CHARTS SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Biểu đồ Doanh thu (Area Chart) */}
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
                    tickFormatter={(value) => `${value / 1000000}M`}
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

          {/* Biểu đồ Đơn hàng (Bar Chart) */}
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

          {/* Biểu đồ Tròn (Pie Chart) - Chiếm full width ở dưới hoặc chia cột tùy ý */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Tỷ lệ bán theo Danh mục</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                {/* Chart */}
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

                {/* Legend (Chú thích) */}
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
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-muted-foreground">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsAdminPage;
