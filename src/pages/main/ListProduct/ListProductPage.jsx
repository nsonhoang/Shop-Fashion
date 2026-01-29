import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getListProductByParams } from "@/services/productService"; // Đảm bảo import đúng đường dẫn service
import FilterDropdown from "./components/FilterDropdown";
import ProductCard from "./components/ProductCard";
import PaginationControls from "./components/PaginationControls";

export default function ListProductPage() {
  // 1. URL Params là "nguồn sự thật"
  const [searchParams, setSearchParams] = useSearchParams();

  // 2. State lưu dữ liệu từ API
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0); // Tổng số lượng sản phẩm tìm thấy
  const [loading, setLoading] = useState(false);

  // Cấu hình
  const ITEMS_PER_PAGE = 30; // Server-side pagination: 30 item mỗi lần gọi

  // 3. Lấy giá trị từ URL
  const currentGender = searchParams.get("gender") || "";
  const currentCategory = searchParams.get("category") || "all";
  const currentSearch = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");

  // 4. Gọi API khi URL thay đổi
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Gọi hàm service (đã sửa ở bước trước)
        const { data, count } = await getListProductByParams({
          gender: currentGender,
          category: currentCategory,
          search: currentSearch,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        });

        setProducts(data || []);
        setTotalCount(count || 0);
      } catch (error) {
        console.error("Lỗi tải trang:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentGender, currentCategory, currentSearch, currentPage]);

  // 5. Tính tổng số trang dựa trên dữ liệu thật
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // --- HANDLERS (Cập nhật URL) ---

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (newCategory) => {
    const newParams = new URLSearchParams(searchParams);
    if (newCategory === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", newCategory);
    }
    newParams.set("page", "1"); // Reset về trang 1 khi đổi danh mục
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <main className="flex-1">
        {/* Tiêu đề */}
        <h1 className="text-xl md:text-2xl font-semibold mb-4 capitalize">
          {currentGender} Clothing & Apparel – New Arrivals
        </h1>

        {/* --- Toolbar: Search & Filter --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <FilterDropdown
            currentCategory={currentCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* --- Nội dung chính --- */}
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <p className="text-gray-500 animate-pulse">Đang tải sản phẩm...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-2">Không tìm thấy sản phẩm nào.</p>
            {(currentSearch || currentCategory !== "all") && (
              <button
                onClick={() => setSearchParams({ gender: currentGender })} // Reset hết về mặc định
                className="text-blue-600 hover:underline text-sm"
              >
                Xóa bộ lọc & tìm kiếm
              </button>
            )}
          </div>
        ) : (
          /* Grid Sản Phẩm */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        )}

        {/* --- Phân trang --- */}
        {!loading && totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}
