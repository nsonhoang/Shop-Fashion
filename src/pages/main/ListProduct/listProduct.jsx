import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function ListProductPage() {
  // 1. Dùng useSearchParams làm "Single Source of Truth"
  const [searchParams, setSearchParams] = useSearchParams();

  // 2. Lấy dữ liệu từ URL (Nếu không có thì set mặc định)
  const currentGender = searchParams.get("gender") || "men";
  const currentCategory = searchParams.get("category") || "all";
  const currentPage = parseInt(searchParams.get("page") || "1"); // Ép kiểu về số

  // --- MOCK DATA ---
  const categories = ["all", "shirt", "pants", "jacket", "sweater"];
  const products = Array.from({ length: 200 }, (_, i) => {
    const type = categories[(i % (categories.length - 1)) + 1];
    return {
      id: i + 1,
      name: `Product ${i + 1}`,
      category: type,
      oldPrice: 98,
      price: 68,
    };
  });

  const itemsPerPage = 40;

  // 3. Xử lý Lọc dữ liệu dựa trên URL
  const filteredProducts =
    currentCategory === "all"
      ? products
      : products.filter((p) => p.category === currentCategory);

  // 4. Tính toán phân trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const visible = filteredProducts.slice(start, start + itemsPerPage);

  // --- HANDLERS (Cập nhật URL) ---

  // Hàm chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    // Copy params cũ để không mất category/gender
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());

    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Hàm đổi danh mục
  const handleCategoryChange = (newCategory) => {
    const newParams = new URLSearchParams(searchParams);

    if (newCategory === "all") {
      newParams.delete("category"); // Xóa param cho gọn URL
    } else {
      newParams.set("category", newCategory);
    }

    // QUAN TRỌNG: Khi đổi danh mục, phải reset về trang 1
    newParams.set("page", "1");

    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- CONFIG UI ---
  const categoryLabels = {
    all: "Tất cả",
    shirt: "Áo",
    pants: "Quần",
    jacket: "Áo khoác",
    sweater: "Sweater",
  };

  const categoryColors = {
    all: "bg-gray-300",
    shirt: "bg-black",
    pants: "bg-gray-400",
    jacket: "bg-blue-700",
    sweater: "bg-amber-700",
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 ">
      <main className="flex-1">
        <h1 className="text-xl md:text-2xl font-semibold mb-4">
          {currentGender === "men"
            ? "Men’s Clothing & Apparel – New Arrivals"
            : "Women’s Clothing & Apparel – New Arrivals"}
        </h1>

        {/* --- FILTER DROPDOWN --- */}
        <div className="flex items-center justify-end mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Chọn loại sản phẩm"
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border hover:shadow-sm transition text-sm"
              >
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full ${
                    categoryColors[currentCategory] || "bg-gray-300"
                  }`}
                />
                <span className="font-medium text-sm">
                  {categoryLabels[currentCategory] || "Tất cả"}
                </span>
                <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={6}
              className="min-w-[12rem]"
            >
              <DropdownMenuRadioGroup
                value={currentCategory}
                onValueChange={handleCategoryChange} // Gọi hàm update URL
              >
                <DropdownMenuRadioItem value="all">
                  Tất cả
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="shirt">Áo</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pants">
                  Quần
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="jacket">
                  Áo khoác
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="sweater">
                  Sweater
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {visible.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-md p-2 shadow-sm hover:shadow-md transition-all"
            >
              <Link
                to={`/product/${p.id}`}
                className="block"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <div className="relative bg-gray-100 aspect-[3/4] mb-2 rounded overflow-hidden">
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded">
                    30% OFF
                  </span>
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                    IMG
                  </div>
                </div>

                <p className="text-[13px] font-medium truncate group-hover:underline">
                  {p.name}
                </p>

                <p className="text-[12px] text-gray-500">
                  <span className="line-through mr-1">${p.oldPrice}</span>
                  <span className="text-black font-semibold">${p.price}</span>
                </p>
              </Link>

              <div className="flex gap-1 mt-2">
                <span className="w-3 h-3 bg-black rounded-full" />
                <span className="w-3 h-3 bg-gray-400 rounded-full" />
                <span className="w-3 h-3 bg-amber-700 rounded-full" />
              </div>

              <button
                onClick={() => console.log("Add to cart:", p.id)}
                className="mt-3 w-full text-xs py-1.5 rounded bg-black text-white hover:bg-gray-800 transition"
              >
                Mua hàng
              </button>
            </div>
          ))}
        </div>

        {/* --- PAGINATION (Dựa trên URL) --- */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border ${
                currentPage === 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Prev
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const p = idx + 1;
                const isActive = p === currentPage;
                return (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    aria-current={isActive ? "page" : undefined}
                    className={`w-8 h-8 rounded-md flex items-center justify-center text-sm border ${
                      isActive
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border ${
                currentPage === totalPages
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
