import React, { useEffect, useState } from "react";
import { Eye, Loader2, Package, Filter } from "lucide-react";
import { formatMoney } from "@/utils/formatMoney";
import { Link } from "react-router-dom";
import { getOrdersByStatus } from "@/services/orderService";

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("this_month");

  // Hàm tính toán ngày bắt đầu và kết thúc
  const getDateRange = (type) => {
    const now = new Date();
    let startDate, endDate;

    if (type === "this_month") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date();
    } else if (type === "last_month") {
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    } else {
      return null; // Lấy tất cả
    }

    return {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
  };

  useEffect(() => {
    const fetchTopProducts = async () => {
      setLoading(true);
      try {
        const range = getDateRange(filterType);

        // 1. Gọi Service lấy đơn hàng đã giao thành công
        // Lưu ý: Đảm bảo hàm getOrdersByStatus của bạn đã hỗ trợ tham số startDate, endDate như mình hướng dẫn ở trên
        const orders = await getOrdersByStatus(
          "DELIVERED",
          range?.start,
          range?.end,
        );

        // 2. Tính toán tổng hợp (Aggregation)
        const productStats = {};

        if (orders && orders.length > 0) {
          orders.forEach((order) => {
            // Kiểm tra nếu đơn hàng có items
            if (!order.order_items) return;

            order.order_items.forEach((item) => {
              // Kiểm tra cấu trúc dữ liệu để tránh crash
              if (!item.product_variants?.products) return;

              const variant = item.product_variants;
              const product = variant.products;
              const pid = product.product_id;

              // Logic tính giá: Ưu tiên giá lúc mua (nếu có lưu), không thì lấy giá biến thể
              const price =
                Number(item.price_at_purchase) ||
                Number(variant.price_adjustment) ||
                0;
              const revenue = price * item.quantity;

              // Khởi tạo object thống kê cho sản phẩm này nếu chưa có
              if (!productStats[pid]) {
                productStats[pid] = {
                  id: pid,
                  name: product.name,
                  category: "Thời trang", // Hoặc lấy từ product.category_id nếu bạn có bảng categories
                  image: product.image_url, // Lấy ảnh từ variant hoặc product gốc
                  sales: 0,
                  revenue: 0,
                };
              }

              // Cộng dồn số liệu
              productStats[pid].sales += item.quantity;
              productStats[pid].revenue += revenue;
            });
          });
        }

        // 3. Chuyển object thành array -> Sắp xếp giảm dần theo sales -> Lấy Top 5
        const sortedProducts = Object.values(productStats)
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 5);

        setProducts(sortedProducts);
      } catch (error) {
        console.error("Lỗi tính toán top sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, [filterType]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Sản Phẩm</h3>

        {/* Bộ lọc */}
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-400" />
          <select
            className="text-sm border-none bg-transparent font-medium text-gray-600 focus:ring-0 cursor-pointer outline-none"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="this_month">Tháng này</option>
            <option value="last_month">Tháng trước</option>
            <option value="all">Toàn thời gian</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="space-y-4 flex-1 overflow-y-auto pr-1">
          {products.length === 0 ? (
            <div className="text-center text-gray-500 py-8 text-sm flex flex-col items-center">
              <Package className="w-10 h-10 text-gray-300 mb-2" />
              <p>Chưa có dữ liệu bán hàng trong khoảng thời gian này.</p>
            </div>
          ) : (
            products.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {/* Badge số thứ tự (1, 2, 3 có màu riêng) */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0
                        ? "bg-yellow-100 text-yellow-700"
                        : index === 1
                          ? "bg-gray-200 text-gray-700"
                          : index === 2
                            ? "bg-orange-100 text-orange-700"
                            : "bg-transparent text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Ảnh sản phẩm */}
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden border border-gray-200">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/40x40?text=No+Img"; // Fallback nếu ảnh lỗi
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Package size={16} />
                      </div>
                    )}
                  </div>

                  {/* Tên & Danh mục */}
                  <div className="min-w-0">
                    <p
                      className="font-medium text-sm text-gray-900 truncate max-w-[120px]"
                      title={product.name}
                    >
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {product.category}
                    </p>
                  </div>
                </div>

                {/* Thống kê bán & doanh thu */}
                <div className="text-right flex-shrink-0">
                  <p className="font-medium text-sm text-gray-900">
                    {product.sales}{" "}
                    <span className="text-xs text-gray-500 font-normal">
                      đã bán
                    </span>
                  </p>
                  <p className="text-xs text-blue-600 font-medium">
                    {formatMoney(product.revenue)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Footer Link */}
      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
        <Link
          to="/admin/products"
          className="text-blue-600 text-sm font-medium hover:text-blue-700 inline-flex items-center"
        >
          <Eye size={14} className="mr-1" />
          Xem chi tiết kho hàng
        </Link>
      </div>
    </div>
  );
};

export default TopProducts;
