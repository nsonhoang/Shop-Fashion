import { AdminHeader } from "@/layouts/admin/component/header";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react"; // Import thêm Loader2

import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";
import FilterBar from "./components/FilterBar";
import Pagination from "@/components/Pagination"; // [MỚI] Import Pagination
import CustomAlert from "@/components/CustomAlert";
import { createProduct, getProducts } from "@/services/productService";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [alertState, setAlertState] = useState(null);
  const [loading, setLoading] = useState(false); // [MỚI] Loading state

  // [MỚI] STATE PHÂN TRANG
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Mỗi trang 10 dòng
  const [totalProducts, setTotalProducts] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    sort: "",
  });

  // [SỬA] Hàm fetch dữ liệu nhận theo trang
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Gọi service với tham số phân trang
      // Lưu ý: getProducts phải trả về { data, total } như đã bàn ở phần trước
      const { data, total } = await getProducts(currentPage, itemsPerPage);

      setProducts(data || []);
      setTotalProducts(total || 0);
    } catch (error) {
      setAlertState({
        type: "error",
        title: "Lỗi tải dữ liệu",
        message: "Không thể lấy danh sách sản phẩm. Vui lòng thử lại.",
      });
      console.error("Lỗi khi lấy danh sách sản phẩm:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // [SỬA] useEffect chạy lại khi currentPage thay đổi
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleCreate = async (product) => {
    console.log("Create product", product);
    try {
      setLoading(true); // Hiệu ứng loading khi tạo
      const createdProduct = await createProduct(product);

      // Cách 1: Load lại trang 1 để thấy sản phẩm mới
      setCurrentPage(1);
      fetchProducts();

      setOpenForm(false);
      setAlertState({
        type: "success",
        title: "Thành công!",
        message: `Đã thêm sản phẩm "${createdProduct.name}" vào hệ thống.`,
      });
    } catch (error) {
      setAlertState({
        type: "error",
        title: "Thất bại",
        message: "Có lỗi xảy ra khi tạo sản phẩm. Vui lòng thử lại.",
      });
      console.error("Lỗi khi tạo sản phẩm:", error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setAlertState(null), 3000);
    }
  };

  const handleDelete = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  }

  // =========================
  // FILTER LOGIC (CLIENT-SIDE TRÊN TRANG HIỆN TẠI)
  // Lưu ý: Nếu muốn tìm kiếm toàn bộ database, bạn cần đẩy filters xuống API getProducts
  // =========================
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (filters.search) {
      result = result.filter(
        (p) => p.name?.toLowerCase().includes(filters.search.toLowerCase()) // Thêm ?. để tránh lỗi nếu name null
      );
    }

    // Category
    if (filters.category) {
      result = result.filter((p) => p.category_id === filters.category); // Check lại tên trường (category hay category_id)
    }

    // Status
    if (filters.status === "active") {
      result = result.filter((p) => p.is_active);
    }
    if (filters.status === "inactive") {
      result = result.filter((p) => !p.is_active);
    }

    // Sort
    if (filters.sort === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (filters.sort === "za") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (filters.sort === "price-asc") {
      result.sort((a, b) => a.base_price - b.base_price);
    }
    if (filters.sort === "price-desc") {
      result.sort((a, b) => b.base_price - a.base_price);
    }

    return result;
  }, [products, filters]);

  // Tính tổng số trang
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  if (selectedProduct) {
    return (
      <ProductDetail
        productId={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return (
  <>
    <AdminHeader title="Product Management" />

<<<<<<< HEAD
    <div className="p-6 space-y-6">
=======
      <div className="p-6 space-y-6">
        {alertState && (
          <CustomAlert
            type={alertState.type}
            title={alertState.title}
            onClose={() => setAlertState(null)}
          >
            {alertState.message}
          </CustomAlert>
        )}
>>>>>>> e969dbc54a1f0a48e05b12a4c9f2b0d339983900

      {/* Header + Filter + Add button */}
      <div className="flex justify-between items-center">
        <FilterBar filters={filters} setFilters={setFilters} />

<<<<<<< HEAD
        <Button onClick={() => setOpenForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
=======
        {/* Product Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              // Hiển thị Loading khi đang fetch API
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <ProductTable
                products={filteredProducts}
                onManage={setSelectedProduct}
              />
            )}
          </CardContent>
        </Card>

        {/* [MỚI] Pagination Component */}
        {!loading && totalProducts > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}

        {/* Create Form */}
        {openForm && (
          <ProductForm
            onClose={() => setOpenForm(false)}
            onSubmit={handleCreate}
          />
        )}
>>>>>>> e969dbc54a1f0a48e05b12a4c9f2b0d339983900
      </div>

      {/* Product Table */}
      <Card>
        <CardContent className="p-0">
          <ProductTable
            products={filteredProducts}
            onManage={setSelectedProduct}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Create Form */}
      {openForm && (
        <ProductForm
          onClose={() => setOpenForm(false)}
          onSubmit={handleCreate}
        />
      )}
    </div>
  </>
);

}
