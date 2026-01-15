import { AdminHeader } from "@/layouts/admin/component/header";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";
import FilterBar from "./components/FilterBar";
import { createProduct, getProducts } from "@/services/productService";
import CustomAlert from "@/components/CustomAlert";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [alertState, setAlertState] = useState(null); // { type, title, message }

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    sort: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const ListProducts = await getProducts();
        setProducts(ListProducts);
      } catch (error) {
        setAlertState({
          type: "error",
          title: "Lỗi tải dữ liệu",
          message: "Không thể lấy danh sách danh mục. Vui lòng thử lại.",
        });
        console.error("Lỗi khi lấy danh sách sản phẩm:", error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleCreate = async (product) => {
    // setProducts((prev) => [...prev, product]);
    // setOpenForm(false);

    console.log("Create product", product);
    try {
      const createdProduct = await createProduct(product);
      setProducts((prev) => [...prev, createdProduct]);
      setOpenForm(false);
      setAlertState({
        type: "success",
        title: "Thành công!",
        message: `Đã thêm danh mục "${createdProduct.name}" vào hệ thống.`,
      });
    } catch (error) {
      setAlertState({
        type: "error",
        title: "Thất bại",
        message: "Có lỗi xảy ra khi tạo danh mục. Vui lòng thử lại.",
      });
      console.error("Lỗi khi tạo sản phẩm:", error.message);
    } finally {
      setTimeout(() => setAlertState(null), 3000);
    }
  };

  // const handleUpdate = (updatedProduct) => { hàm nay đọc tên kh hiểu
  //   setProducts((prev) =>
  //     prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
  //   );
  // };

  // =========================
  // FILTER LOGIC
  // =========================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (filters.search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
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

  if (selectedProduct) {
    return (
      <ProductDetail
        //  truyền id xuống
        productId={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        // onUpdate={handleUpdate} không cần sẽ gọi thẳng ở component con vì dữ liệu đã kh truyền ở đây mà xuống component con call api in ra
      />
    );
  }

  return (
    <>
      <AdminHeader title="Product Management" />

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
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <Button onClick={() => setOpenForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Filter Bar */}
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* Product Table */}
        <Card>
          <CardContent className="p-0">
            <ProductTable
              products={filteredProducts}
              onManage={setSelectedProduct}
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
